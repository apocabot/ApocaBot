let storage
require('../mungu.js').then(s => storage = s)

module.exports = {setGame, setPrefix, removePrefix, xdyRoll, roll, newCharacter, characterSheet, setStats, shift, moveRoll, messageCounter}

//functions
function removePrefix(message, userData){
    query = false
	let prefixed = message.toLowerCase().split(" ");
	if (prefixed[0] === userData['PREFIX']) {
		prefixed.shift();
	} else if (prefixed[0] !== userData['PREFIX']) {
		prefixed[0] = prefixed[0].slice(1);
    };
    if(prefixed[0].endsWith('?')){
        prefixed [0] = prefixed[0].slice(0, -1)
        query = true
    }
	return [prefixed, query];
};

function setPrefix(userMessage, userId, channelId, userNickname, moves, userData){
    let setPrefixMessage = []

    userMessage.forEach(i => {
        prefixRegex = /^[^a-zA-Z\d\s]$/
        if(i.startsWith('newprefix')){
            i = i.slice(9)
            if(!prefixRegex.test(i)){
                setPrefixMessage.push('INCORRECT PREFIX INPUT (prefix must be a single non-alphanumeric character)\nEXAMPLE: !setprefix newprefix$ (will set the bot prefix to $)')
            } else if (prefixRegex.test(i)){
                userData['PREFIX'] = i
                setPrefixMessage.push(`ApocaBot prefix now set to ${i}`)
            }
        } 
    })
    if(setPrefixMessage[0]){return setPrefixMessage}
    else {return moves.setPrefix.text}
}

function setGame(userMessage, userId, channelId, userNickname, moves, userData, i, gameList){
    let gameSetMessage = ''
    gameList.forEach(async i => {
        if(userMessage[1].endsWith(i)){
            gameSetMessage = `You've selected __${i}__, you may now enter the command !menu to see the list of moves, learn how to set a custom prefix, and create character sheets.`
            await storage.del(channelId)
            userData = {}
            userData['GAME'] = i
            await storage.set(channelId, userData);
        }
    })
    if(!gameSetMessage){
        return moves.setGame.error
    } else {return gameSetMessage}
}

function xdyRoll(userMessage, userId, channelId, userNickname, moves, userData){
    
    const modRegex = /^[+-]\d+$/
    const addDieRollRegex = /^[+-]\d+d\d+$/
    const mainDieRollRegex = /^\d+d\d+$/

    let errorMessage = '';
    let mainRoll = false
    let total = [0];
    let grandTotal = [0];
    let mainDieResult = [];
    let addDieMessage = '';
    let modStatMessage = '';
    let grandTotalMessage = '';

    userMessage.forEach(i => {
        if(mainDieRollRegex.test(i)){
            mainRoll = true
            let mainDieRoll = i.split('d');
            let num = parseInt(mainDieRoll[0]);
            num = Math.abs(num)
            if (num>200){errorMessage = "Maximum die roll = 200d2000"; return};
            let faces = parseInt(mainDieRoll[1]);
            faces = Math.abs(faces)
            if (faces>2000){errorMessage = "Maximum die roll = 200d2000"; return}
            mainDieRoll = roll(num, faces);
            let mainDieTotal = mainDieRoll[0]
            total.push(mainDieTotal)
            mainDieResult = mainDieRoll[1]
        }
    })

    if(!mainRoll){
        mainRoll = true
        mainDieRoll = roll(2, 6);
        let mainDieTotal = mainDieRoll[0]
        total.push(mainDieTotal)
        mainDieResult = mainDieRoll[1]
    }

    userMessage.forEach(i => {
        if(modRegex.test(i)){
            modNumTotal = parseInt(i);
            total.push(modNumTotal);
            modNumResult = `*( ${modNumTotal} )*`
            mainDieResult.push(modNumResult)
        }
        if(addDieRollRegex.test(i)){
            let xdy = i.split('d');
            let num = parseInt(xdy[0]);
            neg = false
            if(num<0){neg = true}
            num = Math.abs(num)
            if (num>200){errorMessage = "Maximum die roll = 200d2000"; return};
            let faces = parseInt(xdy[1]);
            faces = Math.abs(faces)
            if (faces>2000){errorMessage = "Maximum die roll = 200d2000"; return}
            let addDieRoll = roll(num, faces);
            let addDieTotal = addDieRoll[0]
            let addDieResult = addDieRoll[1]
            if(neg){
                total.push(parseInt(`-${addDieTotal}`))
                addDieMessage = addDieMessage.concat(` - [${addDieResult.join(', ')} ]`)
            } else {
                total.push(addDieTotal)
                addDieMessage = addDieMessage.concat(` + [${addDieResult.join(', ')} ]`)
            }
        }
    })


    for(let [key, value] of Object.entries(moves.abilities.stats)){
        userMessage.forEach(i => {
            if(i.startsWith(value[0]) || i.startsWith(`+${value[0]}`)){
                modStat = parseInt(userData[userId][key])
                grandTotal.push(modStat)
                if(modStat>=0){
                    modStatMessage = modStatMessage.concat(` + ${modStat} ${key}`);
                } else if(modStat<0){
                    modStat = Math.abs(modStat);
                    modStatMessage = modStatMessage.concat(` - ${modStat} ${key}`);
                }
            }
        })
    }
    total = total.reduce((acc, val) => {return acc + val});
    grandTotal.push(total)
    grandTotal = grandTotal.reduce((acc, val) => {return acc + val});
    let mainDieMessage = `You rolled [${mainDieResult.join(', ')} ]`
    let totalMessage = ` = ${total}`
    if(modStatMessage){grandTotalMessage = `. That's ${grandTotal}.`}
    let message = mainDieMessage.concat(addDieMessage).concat(totalMessage).concat(modStatMessage).concat(grandTotalMessage)
    if(!mainRoll){errorMessage = moves.roll.error}
    if(errorMessage){
        return errorMessage
    } else {return message}
}

function roll(num, faces){
    let total = 0;
    let result = [];
        for(let i = 0; i < num; i++){
    let singleRoll = Math.floor(Math.random() * faces) + 1;
    result.push(' ' + singleRoll);
    total += singleRoll;
    }
    return [total, result];
}

function moveRoll(userMessage, userId, channelId, userNickname, moves, userData, i){
    let modStat = 0
    let rollText = ''
    let moveText = ''
    let showStat = ''
    let input = userMessage[1];
    input = parseInt(input);
    if(moves[i].stat === 'num'){
        if(!input){input = 0}
        modStat = input
    } else if(moves[i].stat === 'stat'){
        if(!userMessage[1]){return 'You need to add a +STAT to your command'}
        modStat = userData[userId][userMessage[1].slice(1).toUpperCase()]
    } else {
        modStat = userData[userId][moves[i].stat.toUpperCase()];
        showStat = ` ${moves[i].stat.toUpperCase()}`
    }
    if(!modStat){modStat = 0};
    let moveRoll = roll(2, 6);
    let total = moveRoll[0];
    let result = moveRoll[1];
    let addOn = 0
    if(userMessage[1] || userMessage[2]){
        function hasNumber(string) {return /\d/.test(string)}
                let statOne = hasNumber(userMessage[1]);
                let statTwo = hasNumber(userMessage[2]);
        for(let [key, value] of Object.entries(moves.abilities.stats)){
            userMessage.forEach(i => {
                if(i.startsWith(value[0]) || i.startsWith(`+${value[0]}`)){
                    modStat = parseInt(userData[userId][key])
                    showStat = ` ${key}`
                }
            })    
        }
        if(statOne){
            addOn = parseInt(userMessage[1]);
            if(addOn>=0){addOnPrint = `+${addOn}`}
            else{addOnPrint = addOn}
            result.push(` (${addOnPrint})`)
        } else if(statTwo){
            addOn = parseInt(userMessage[2]);
            if(addOn>=0){addOnPrint = `+${addOn}`}
            else{addOnPrint = addOn}
            result.push(` (${addOnPrint})`)
        }
    }
    total = total + addOn;
    let grandTotal = total + modStat;
    if (grandTotal >= 13){
        moveText = moves[i].greatSuccess
    } else if (grandTotal >= 10 && grandTotal <= 12){
		moveText = moves[i].success
	} else if (9 >= grandTotal && grandTotal >= 7){
        moveText = moves[i].mixed
    } else if (6 >= grandTotal ){
        moveText =  moves[i].fail
    }
    if (modStat >= 0){
			rollText = `You rolled [${result} ] = ${total} + ${modStat}${showStat}. That’s ${grandTotal}.`}
	else if (modStat < 0) {
			modStat = Math.abs(modStat);
			rollText = `You rolled [${result} ] = ${total} - ${modStat}${showStat}. That’s ${grandTotal}.`}
    return `${rollText}\n${moveText}`
}

function newCharacter(userMessage, userId, channelId, userNickname, moves, userData){
    userData[userId] = {}
    let person = {};
    for(let [key, value] of Object.entries(moves.abilities.stats)){
        person[key] = value[1]
    }
    userData[userId] = person;
    storage.set(channelId, userData);
    return 'CREATED A BLANK CHARACTER:\n\
Type __!character__ to view character sheet, or __!set?__ to learn\
 how to set your character stat.'
}

function characterSheet(userMessage, userId, channelId, userNickname, moves, userData){
    statPrintout = ['Here are your CHARACTER STATS:'];
    for(let [key, value] of Object.entries(userData[userId])){
        statPrintout.push(`${key}: ${value}`)
    }
    statPrintout = statPrintout.toString().split(",").join("\n")
    return statPrintout
}

function shift(userMessage, userId, channelId, userNickname, moves, userData){
    let shiftPrintout = ['CHANGES:'];
    for(let [key, value] of Object.entries(moves.abilities.stats)){
        userMessage.forEach(i => {
            if(i.startsWith(value[0])){
                i = i.slice(value[0].length)
                function hasNumber(string) {return /\d/.test(string)}
                let stat = hasNumber(i)
                if(stat){
                    i = parseInt(i)
                    let slashVal = userData[userId][key]
                    if(value[0]==='name'){
                        shiftPrintout.push(moves.shift.error); return
                    } else if(value[0]==='harm'){
                        slashVal = parseInt(slashVal.substring(0)) + i
                        if(isNaN(slashVal)){shiftPrintout.push(moves.shift.error)}
                        if(slashVal<0){slashVal=0}
                            if(slashVal < 4){
                                userData[userId][key] = `${slashVal} / 7`
                            } else if(slashVal > 3 && slashVal < 7){
                                userData[userId][key] = `${slashVal} / 7 UNSTABLE!`
                            } else if(slashVal > 6){
                                userData[userId][key] = `${slashVal} / 7 DYING!`
                            }
                            shiftPrintout.push(`${key}: ${userData[userId][key]}`)
                    } else if(value[0]==='luck'){
                        slashVal = parseInt(slashVal.substring(0)) + i
                        if(isNaN(slashVal)){shiftPrintout.push(moves.shift.error)}
                        if(slashVal<0){slashVal=0}
                            if(slashVal < 7){
                                userData[userId][key] = `${slashVal} / 7`
                            } else if(slashVal > 6){
                                userData[userId][key] = `${slashVal} / 7 DOOMED!`
                            }
                            shiftPrintout.push(`${key}: ${userData[userId][key]}`)
                    } else if(value[0]==='exp'){
                        slashVal = parseInt(slashVal.substring(0)) + i
                        if(isNaN(slashVal)){shiftPrintout.push(moves.shift.error)}
                        if(slashVal<0){slashVal=0}
                            if(slashVal < 5){
                                userData[userId][key] = `${slashVal} / 5`
                            } else if(slashVal > 4){
                                userData[userId][key] = `${slashVal} / 5 LVL UP!`
                            }
                            shiftPrintout.push(`${key}: ${userData[userId][key]}`)
                    } else{
                        userData[userId][key] = slashVal + i;
                        shiftPrintout.push(`${key}: ${userData[userId][key]}`)
                          }    
                }
            }
        })
    }
    shiftPrintout = shiftPrintout.toString().split(",").join("\n")
    if(!shiftPrintout[1]){shiftPrintout = moves.shift.error}
    return shiftPrintout
}

function setStats(userMessage, userId, channelId, userNickname, moves, userData){
    let setErrors = []
    for(let [key, value] of Object.entries(moves.abilities.stats)){
        userMessage.forEach(i => {
            if(i.startsWith(value[0])){
                if(value[0]==="name"){
                    i = i.slice(value[0].length)
                    i = i.slice(1).toUpperCase()
                    if(i==='NICKNAME'){i = userNickname};
                    if(!i){setErrors.push(moves.set.error)}
                    else{userData[userId][key] = i}
                } else if (value[0]==="harm"){
                    i = i.slice(value[0].length)
                    i = parseInt(i)
                    if(isNaN(i)){setErrors.push(moves.set.error)}
                    if(i<0){i=0}
                        if(i < 4){i = `${i} / 7`}
                        else if(i > 3 && i < 7){i = `${i} / 7 UNSTABLE!`}
                        else if (i > 6){i = `${i} / 7 DYING!`}
                    if(!i){setErrors.push(moves.set.error)}
                    else{userData[userId][key] = i}
                } else if (value[0]==="luck"){
                    i = i.slice(value[0].length)
                    i = parseInt(i)
                    if(isNaN(i)){setErrors.push(moves.set.error)}
                    if(i<0){i=0}
                        if(i < 7){i = `${i} / 7`}
                        else if (i > 6){i = `${i} / 7 DOOMED!`}
                    if(!i){setErrors.push(moves.set.error)}
                    else{userData[userId][key] = i}
                } else if (value[0]==="exp"){
                    i = i.slice(value[0].length)
                    i = parseInt(i)
                    if(isNaN(i)){setErrors.push(moves.set.error)}
                    if(i<0){i=0}
                        if(i < 5){i = `${i} / 5`}
                        else if (i > 4){i = `${i} / 5 LVL UP!`}
                    if(!i){setErrors.push(moves.set.error)}
                    else{userData[userId][key] = i}
                } else {
                    i = i.slice(value[0].length)
                    function hasNumber(string) {return /\d/.test(string)}
                    let stat = hasNumber(i)
                    i = parseInt(i)
                    if(isNaN(i)){setErrors.push(moves.set.error)}
                    if(stat){
                        userData[userId][key] = i 
                    } else{setErrors.push(moves.set.error)}
                }
            }
        })
    }
    if(setErrors[0]){return setErrors[0]}
    else{return characterSheet(userMessage, userId, channelId, userNickname, moves, userData)}
}

async function messageCounter(userData){
    if(!userData['COUNTER']){userData['COUNTER']=0} 
    userData['COUNTER']++
    if((userData['COUNTER']%50)===0){console.log(userData['COUNTER'])};
    await storage.set(userData)
}