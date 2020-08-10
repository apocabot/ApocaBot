let storage
require('../mungu.js').then(s => storage = s)

module.exports = {spikeState, addGiri, subGiri, removeGiri, printGiri, newCorp, newWeapon, newDrone, newNpc, deleteMove, moveList, customMove, newCustomMove, setGame, setPrefix, removePrefix, xdyRoll, roll, newCharacter, characterSheet, setStats, shift, moveRoll}

//functions
function removePrefix(message, userData){
    query = false
    newMoveRegex = /([nN][eE][wW][mM][oO][vV][eE])/
    if(newMoveRegex.test(message)){
        let prefixed = message.split(" ");
        if (prefixed[0] === userData['PREFIX']) {
            prefixed.shift();
            prefixed[0] = prefixed[0].toLowerCase()
        } else if (prefixed[0] !== userData['PREFIX']) {
            prefixed[0] = prefixed[0].toLowerCase().slice(1);
        };
        if(prefixed[0]){
            if(prefixed[0].endsWith('?')){
            prefixed [0] = prefixed[0].slice(0, -1)
            query = true
        }} 
        return [prefixed, query];
    } else {
    let prefixed = message.toLowerCase().split(" ");
	if (prefixed[0] === userData['PREFIX']) {
		prefixed.shift();
	} else if (prefixed[0] !== userData['PREFIX']) {
		prefixed[0] = prefixed[0].slice(1);
    };
    if(prefixed[0]){
        if(prefixed[0].endsWith('?')){
        prefixed [0] = prefixed[0].slice(0, -1)
        query = true
    }}
    return [prefixed, query];
    }
}

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
        if(userMessage[1]){
            if(userMessage[1].endsWith(i)){
            gameSetMessage = `You've selected __${i.toUpperCase()}__, now enter the command __!menu__ to see the list of moves, learn how to set a custom prefix, and create character sheets.`
            await storage.del(channelId)
            userData = {}
            userData['GAME'] = i
            await storage.set(channelId, userData);
        }}
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
    let spikeMessage = ''
    let alleviateMessage = ''

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

                if(userData[userId]['SPIKE'][1] === true){
                    if(userData[userId]['SPIKE'][0]===key){
                        userData[userId][key][1]-=1
                        modStat = 1
                        dots = ''
                        if(userData[userId][key][1]===1){dots = "•"}
                        if(userData[userId][key][1]===2){dots = "••"}
                        if(userData[userId][key][1]===3){dots = "•••"}
                        if(userData[userId][key][1]===4){dots = "••••"}
                        if(userData[userId][key][1]===5){dots = "•••••"}
                        showStat = ` ${dots}${key}`
                        grandTotal.push(modStat)
                        if(modStat>=0){
                            modStatMessage = modStatMessage.concat(` + ${modStat} ${showStat}`);
                        } else if(modStat<0){
                            modStat = Math.abs(modStat);
                            modStatMessage = modStatMessage.concat(` - ${modStat} ${showStat}`);
                        }
                        if(userData[userId][key][1]===0){
                            userData[userId]['SPIKE'][1]=false;
                            userData[userId]['SPIKE'][0]=''
                            alleviateMessage = `\n\n __Your ${key} Spike is Alleviated.__`
                        }
                    } else {
                        alleviated = userData[userId]['SPIKE'][0];
                        userData[userId][alleviated][1] = 0;
                        userData[userId]['SPIKE'][1]=false;
                        userData[userId]['SPIKE'][0]=''
                        alleviateMessage = `\n\n __Your ${alleviated} Spike is Alleviated.__`
                        modStat = -2;
                        userData[userId][key][1]+=1
                        if(userData[userId][key][1]===5){
                            userData[userId]['SPIKE'][1]=true;
                            userData[userId]['SPIKE'][0]=key
                        }
                        dots = ''
                        if(userData[userId][key][1]===1){dots = "•"}
                        if(userData[userId][key][1]===2){dots = "••"}
                        if(userData[userId][key][1]===3){dots = "•••"}
                        if(userData[userId][key][1]===4){dots = "••••"}
                        if(userData[userId][key][1]===5){dots = "•••••"}
                        showStat = ` ${dots}${key}`
                        grandTotal.push(modStat)
                        if(modStat>=0){
                            modStatMessage = modStatMessage.concat(` + ${modStat} ${showStat}`);
                        } else if(modStat<0){
                            modStat = Math.abs(modStat);
                            modStatMessage = modStatMessage.concat(` - ${modStat} ${showStat}`);
                        }
                    }
                } else {
                modStat = parseInt(userData[userId][key][0])
                userData[userId][key][1]+=1
                if(userData[userId][key][1]===5){
                    userData[userId]['SPIKE'][1]=true;
                    userData[userId]['SPIKE'][0]=key
                    spikeMessage = `\n\n __Your ${key} State is now Spiked!__`
                }
                dots = ''
                if(userData[userId][key][1]===1){dots = "•"}
                if(userData[userId][key][1]===2){dots = "••"}
                if(userData[userId][key][1]===3){dots = "•••"}
                if(userData[userId][key][1]===4){dots = "••••"}
                if(userData[userId][key][1]===5){dots = "•••••"}
                showStat = ` ${dots}${key}`
                grandTotal.push(modStat)
                if(modStat>=0){
                    modStatMessage = modStatMessage.concat(` + ${modStat} ${showStat}`);
                } else if(modStat<0){
                    modStat = Math.abs(modStat);
                    modStatMessage = modStatMessage.concat(` - ${modStat} ${showStat}`);
                    }
                }
            }
        })
    }
    total = total.reduce((acc, val) => {return acc + val});
    grandTotal.push(total)
    grandTotal = grandTotal.reduce((acc, val) => {return acc + val});
    let mainDieMessage = `You rolled [${mainDieResult.join(', ')} ]`
    let totalMessage = ` = ${total}`
    if(modStatMessage){grandTotalMessage = `. That's ${grandTotal}.${spikeMessage}${alleviateMessage}`}
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
    let giriMod = 0
    let showGiri = ''
    let spikeMessage = ''
    let alleviateMessage = ''
    let input = userMessage[1];
    if(userData[userId]['GIRI']){
        for(let [name, giriCount] of Object.entries(userData[userId]['GIRI'])){
            userMessage.forEach(i => {
        if(i===`+${name}` || i === `${name}`){
            giriMod = giriCount
            showGiri = ` + ${giriMod} Giri`
            }
        })
    }}
    giriMod = parseInt(giriMod);
    if(moves[i].stat === 'num'){
        if(!input){input = 0}
        modStat = parseInt(input)
    } else if(moves[i].stat === 'stat'){
        if(!userMessage[1]){return 'You need to add a +STATE to your command'}
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
                    if(userData[userId]['SPIKE'][1] === true){
                        if(userData[userId]['SPIKE'][0]===key){
                            userData[userId][key][1]-=1
                            modStat = 1
                            dots = ''
                            if(userData[userId][key][1]===1){dots = "•"}
                            if(userData[userId][key][1]===2){dots = "••"}
                            if(userData[userId][key][1]===3){dots = "•••"}
                            if(userData[userId][key][1]===4){dots = "••••"}
                            if(userData[userId][key][1]===5){dots = "•••••"}
                            showStat = ` ${dots}${key}`
                            if(userData[userId][key][1]===0){
                                userData[userId]['SPIKE'][1]=false;
                                userData[userId]['SPIKE'][0]=''
                                alleviateMessage = `\n\n __Your ${key} Spike is Alleviated.__`
                            }
                        } else {
                            alleviated = userData[userId]['SPIKE'][0];
                            userData[userId][alleviated][1] = 0;
                            userData[userId]['SPIKE'][1]=false;
                            userData[userId]['SPIKE'][0]=''
                            alleviateMessage = `\n\n __Your ${alleviated} Spike is Alleviated.__`
                            modStat = -2;
                            userData[userId][key][1]+=1
                            if(userData[userId][key][1]===5){
                                userData[userId]['SPIKE'][1]=true;
                                userData[userId]['SPIKE'][0]=key
                            }
                            dots = ''
                            if(userData[userId][key][1]===1){dots = "•"}
                            if(userData[userId][key][1]===2){dots = "••"}
                            if(userData[userId][key][1]===3){dots = "•••"}
                            if(userData[userId][key][1]===4){dots = "••••"}
                            if(userData[userId][key][1]===5){dots = "•••••"}
                            showStat = ` ${dots}${key}`
                        }
                    } else {
                    modStat = parseInt(userData[userId][key][0])
                    userData[userId][key][1]+=1
                    if(userData[userId][key][1]===5){
                        userData[userId]['SPIKE'][1]=true;
                        userData[userId]['SPIKE'][0]=key
                        spikeMessage = `\n\n __Your ${key} State is now Spiked!__`
                    }
                    dots = ''
                    if(userData[userId][key][1]===1){dots = "•"}
                    if(userData[userId][key][1]===2){dots = "••"}
                    if(userData[userId][key][1]===3){dots = "•••"}
                    if(userData[userId][key][1]===4){dots = "••••"}
                    if(userData[userId][key][1]===5){dots = "•••••"}
                    showStat = ` ${dots}${key}`
                    }
                }
            })    
        }
        if(statOne){
            addOn = parseInt(userMessage[1]);
            if(moves[i].stat === 'num'){addOn = 0;}
            else if(addOn>=0){addOnPrint = `+${addOn}`; result.push(` (${addOnPrint})`)}
            else{addOnPrint = addOn; result.push(` (${addOnPrint})`)}
            
        }   
        if(statTwo){
            addOn = parseInt(userMessage[2]);
            if(addOn>=0){addOnPrint = `+${addOn}`}
            else{addOnPrint = addOn}
            result.push(` (${addOnPrint})`)
        }
    }
    total = total + addOn;
    let grandTotal = total + modStat + giriMod;
    if (grandTotal >= 10){
		moveText = moves[i].success
	} else if (9 >= grandTotal && grandTotal >= 7){
        moveText = moves[i].mixed
    } else if (6 >= grandTotal ){
        moveText =  moves[i].fail
    }
    if (modStat >= 0){
			rollText = `You rolled [${result} ] = ${total} + ${modStat}${showStat}${showGiri}. That’s ${grandTotal}.`}
	else if (modStat < 0) {
			modStat = Math.abs(modStat);
			rollText = `You rolled [${result} ] = ${total} - ${modStat}${showStat}${showGiri}. That’s ${grandTotal}.`}
    return `__${moves[i].name}__\n${rollText}\n\n${moveText}${spikeMessage}${alleviateMessage}`
}

function newCharacter(userMessage, userId, channelId, userNickname, moves, userData){
    if(!userData['PREP']){userData['PREP'] = 0}
    userData[userId] = {}
    let person = {};
    for(let [key, value] of Object.entries(moves.abilities.stats)){
        if(key==="MAD" || key==="PEACEFUL" || key==="SAD" || key==="JOYFUL" || key==="SCARED" || key==="POWERFUL"){
            person[key] = [value[1], value[2]]}
        else{person[key] = value[1]}
    }
    person.PREP = (userData['PREP'])
    person.SPIKE = ['', false]
    userData[userId] = person;
    storage.set(channelId, userData);
    return 'CREATED A BLANK CHARACTER: Type __!set?__ to learn\
 how to set your character stats.\n' + characterSheet(userMessage, userId, channelId, userNickname, moves, userData)
}

function characterSheet(userMessage, userId, channelId, userNickname, moves, userData){
    statPrintout = ['Here are your CHARACTER STATS:'];
    delete userData[userId]['PREP']
    for(let [key, value] of Object.entries(userData[userId])){
        if(key != "GIRI" && key != "SPIKE"){
            if(key === "MAD" || key === "PEACEFUL" || key === "SAD" || key === "JOYFUL" || key === "SCARED" || key === "POWERFUL"){
                dots = ''
                if(value[1]===1){dots = "•"}
                if(value[1]===2){dots = "••"}
                if(value[1]===3){dots = "•••"}
                if(value[1]===4){dots = "••••"}
                if(value[1]===5){dots = "•••••"}
                statPrintout.push(`${dots}${key}: ${value[0]}`)
            } else {statPrintout.push(`${key}: ${value}`)}    
        }
    }
    statPrintout.push(`PREP: ${userData['PREP']}`)
    statPrintout = statPrintout.toString().split(",").join("\n")
    return statPrintout
}

function shift(userMessage, userId, channelId, userNickname, moves, userData){
    if(!userMessage[1]){return moves.shift.text}
    let shiftPrintout = ['CHANGES:'];

    userMessage.forEach(i => {
        if(i.startsWith('prep')){
            i = i.slice(4)
            i = parseInt(i)
            if(isNaN(i)){
                errorMessage.push('INCORRECT PREP INPUT\nEXAMPLE: !shift prep+1')
            } else {
                let oldStat = userData['PREP']
                userData['PREP'] = userData['PREP'] + i;
                shiftPrintout.push(`PREP: ${oldStat} \u00A0\u00A0=>\u00A0\u00A0 ${userData['PREP']}`)}
        }

    })

    for(let [key, value] of Object.entries(moves.abilities.stats)){
        userMessage.forEach(i => {
            if(i.startsWith(value[0])){
                i = i.slice(value[0].length)
                function hasNumber(string) {return /\d/.test(string)}
                let stat = hasNumber(i)
                if(stat){
                    i = parseInt(i)
                    if(value[0]==='name'){
                        shiftPrintout.push(moves.shift.error); return
                    } else if(value[0]==='harm'){
                        let slashVal = userData[userId][key]
                        let oldStat = userData[userId][key]
                        slashVal = parseInt(slashVal.substring(0)) + i
                        if(isNaN(slashVal)){shiftPrintout.push(moves.shift.error)}
                        if(slashVal<0){slashVal=0}
                            if(slashVal < 1){
                                userData[userId][key] = `${slashVal} / 5`
                            } else if(slashVal === 1){
                                userData[userId][key] = `${slashVal} / 5 Light Wound`
                            } else if(slashVal > 1 && slashVal < 4){
                                userData[userId][key] = `${slashVal} / 5 Moderate Wound`
                            } else if(slashVal > 3 && slashVal < 6){
                                userData[userId][key] = `${slashVal} / 5 Critical Wound!`
                            } else if(slashVal > 5){
                                userData[userId][key] = `${slashVal} / 5 YOU ARE DEAD!`
                            }
                            shiftPrintout.push(`${key}: ${oldStat} \u00A0\u00A0=>\u00A0\u00A0 ${userData[userId][key]}`)
                    } else if(value[0]==='xp'){
                        let slashVal = userData[userId][key]
                        let oldStat = userData[userId][key]
                        slashVal = parseInt(slashVal.substring(0)) + i
                        if(isNaN(slashVal)){shiftPrintout.push(moves.shift.error)}
                        if(slashVal<0){slashVal=0}
                            if(slashVal < 5){
                                userData[userId][key] = `${slashVal} / 5`
                            } else if(slashVal > 4){
                                userData[userId][key] = `${slashVal} / 5 ADVANCE!`
                            }
                            shiftPrintout.push(`${key}: ${oldStat} \u00A0\u00A0=>\u00A0\u00A0 ${userData[userId][key]}`)
                    } else{
                        let slashVal = userData[userId][key][0]
                        let oldStat = userData[userId][key][0]
                        userData[userId][key][0] = slashVal + i;
                        shiftPrintout.push(`${key}: ${oldStat} \u00A0\u00A0=>\u00A0\u00A0 ${userData[userId][key][0]}`)
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
    if(!userMessage[1]){return moves.set.text}
    let setErrors = []

    userMessage.forEach(i => {
        if(i.startsWith('prep')){
            i = i.slice(4)
            i = parseInt(i)
            if(isNaN(i)){
                setErrors.push('INCORRECT PREP INPUT\nEXAMPLE: !set prep+1')
            } else {userData['PREP'] = i}
        }
    })

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
                        if(i < 1){i = `${i} / 5`}
                        else if(i === 1){i = `${i} / 5 Light Wound`}
                        else if(i > 1 && i < 4){i = `${i} / 5 Moderate Wound`}
                        else if (i > 3 && i < 6){i = `${i} / 5 Critical Wound!`}
                        else if (i > 5){i = `${i} / 5 YOU ARE DEAD!`}
                    if(!i){setErrors.push(moves.set.error)}
                    else{userData[userId][key] = i}
                } else if (value[0]==="xp"){
                    i = i.slice(value[0].length)
                    i = parseInt(i)
                    if(isNaN(i)){setErrors.push(moves.set.error)}
                    if(i<0){i=0}
                        if(i < 5){i = `${i} / 5`}
                        else if (i > 4){i = `${i} / 5 ADVANCE!`}
                    if(!i){setErrors.push(moves.set.error)}
                    else{userData[userId][key] = i}
                } else {
                    i = i.slice(value[0].length)
                    function hasNumber(string) {return /\d/.test(string)}
                    let stat = hasNumber(i)
                    i = parseInt(i)
                    if(isNaN(i)){setErrors.push(moves.set.error)}
                    if(stat){
                        userData[userId][key][0] = i 
                    } else{setErrors.push(moves.set.error)}
                }
            }
        })
    }
    setErrors = setErrors.toString().split(",").join("\n")
    if(setErrors){return setErrors}
    else{return characterSheet(userMessage, userId, channelId, userNickname, moves, userData)}
}

function spikeState(userMessage, userId, channelId, userNickname, moves, userData){
    if(!userMessage[1]){return moves.spikeState.text}
    let shiftPrintout = ['CHANGES:'];
    let changeCheck = false

    for(let [key, value] of Object.entries(moves.abilities.stats)){
        userMessage.forEach(i => {
            if(i.startsWith(value[0])){
                i = i.slice(value[0].length)
                function hasNumber(string) {return /\d/.test(string)}
                let stat = hasNumber(i)
                i = parseInt(i)
                if(stat){
                    if(key === "MAD" || key === "PEACEFUL" || key === "SAD" || key === "JOYFUL" || key === "SCARED" || key === "POWERFUL"){
                        oldStat = userData[userId][key][1]
                        userData[userId][key][1] = userData[userId][key][1] + i
                        if(userData[userId][key][1]<0){userData[userId][key][1]=0}
                        if(userData[userId][key][1]>5){userData[userId][key][1]=5}
                        shiftPrintout.push(`${key}: ${oldStat} \u00A0\u00A0=>\u00A0\u00A0 ${userData[userId][key][1]}`)
                        changeCheck = true
                    }
                }
            }
        })
    }
    if (!changeCheck){return moves.spikeState.text}
    else{return shiftPrintout}
}

function addGiri(userMessage, userId, channelId, userNickname, moves, userData){
    if(!userMessage[1]){return moves.addGiri.text}
    if(!userData[userId]['GIRI']){userData[userId]['GIRI'] = {}}

    let person = userData[userId]
    let giriObj = person['GIRI']
    let giriCount = 0
    if(giriObj[userMessage[1]]) {
        giriCount = userData[userId]['GIRI'][userMessage[1]]
    }
    giriCount++
    if (giriCount == 4) {
        giriCount = 0
        message = `You hit Giri+4 with ${userMessage[1].charAt(0).toUpperCase() + userMessage[1].slice(1)}.\n\nMark experience and your Giri with ${userMessage[1].charAt(0).toUpperCase() + userMessage[1].slice(1)} is now __Giri+${giriCount}__.`
    } else {
        if(giriCount>=0){message = `Added 1 Giri with ${userMessage[1].charAt(0).toUpperCase() + userMessage[1].slice(1)}.\n\nYou now have __Giri+${giriCount}__ with ${userMessage[1].charAt(0).toUpperCase() + userMessage[1].slice(1)}.`}
        else {message = `Added 1 to your Giri with ${userMessage[1].charAt(0).toUpperCase() + userMessage[1].slice(1)}.\n\nYou now have __Giri${giriCount}__ with ${userMessage[1].charAt(0).toUpperCase() + userMessage[1].slice(1)}.`}
    }

    userData[userId]['GIRI'][userMessage[1]] = giriCount
    if (message) {return message }
}

function subGiri(userMessage, userId, channelId, userNickname, moves, userData){
    if(!userMessage[1]){return moves.subGiri.text}
    if(!userData[userId]['GIRI']){userData[userId]['GIRI'] = {}}

    let person = userData[userId]
    let giriObj = person['GIRI']
    let giriCount = 0
    if(giriObj[userMessage[1]]) {
        giriCount = userData[userId]['GIRI'][userMessage[1]]
    }
    giriCount--;
    userData[userId]['GIRI'][userMessage[1]] = giriCount
    if(giriCount>=0){
    return `Subtracted 1 Giri from ${userMessage[1].charAt(0).toUpperCase() + userMessage[1].slice(1)}.\n\nYou now have __Giri+${giriCount}__ with ${userMessage[1].charAt(0).toUpperCase() + userMessage[1].slice(1)}.`}
    else {return `Subtracted 1 Giri from ${userMessage[1].charAt(0).toUpperCase() + userMessage[1].slice(1)}.\n\nYou now have __Giri${giriCount}__ with ${userMessage[1].charAt(0).toUpperCase() + userMessage[1].slice(1)}.`}
}

function removeGiri(userMessage, userId, channelId, userNickname, moves, userData){
    if(!userMessage[1]){return moves.removeGiri.text}
    if(!userData[userId]['GIRI']){userData[userId]['GIRI'] = {}}

    if(userData[userId]['GIRI'][userMessage[1]]) {
        delete userData[userId]['GIRI'][userMessage[1]]
        return `${userMessage[1].charAt(0).toUpperCase() + userMessage[1].slice(1)} was removed from your Giri.`
    } else {return `${userMessage[1].charAt(0).toUpperCase() + userMessage[1].slice(1)} is not on your Giri.`}
}

function printGiri(userMessage, userId, channelId, userNickname, moves, userData){
    let statPrintout = ['Your Giri with:\n']
    if(!userData[userId]['GIRI']){return 'You don\'t have any Giri with anyone yet.\nEnter __!giri?__ to learn how to set Giri.'}

            for(let [name, giriCount] of Object.entries(userData[userId]['GIRI'])){
                if(giriCount>=0){statPrintout.push(`• ${name.charAt(0).toUpperCase() + name.slice(1)} Giri+${giriCount}`)}
                else {statPrintout.push(`• ${name.charAt(0).toUpperCase() + name.slice(1)} Giri${giriCount}`)}
            }
    statPrintout = statPrintout.toString().split(",").join("\n")
    return statPrintout
}

function newCustomMove(userMessage, userId, channelId, userNickname, moves, userData){
    if(!userMessage[1]){return moves.newMove.text}

    let checks = {
        name: "There's something wrong with the __name+__ entry.",
        command: "There's something wrong with the __command+__ entry.",
        roll: "There's something wrong with the __roll+__ entry.",
        text: "There's something wrong with the __text+__ entry.",
        success:  "There's something wrong with the __success+__ entry.",
        mixed: "There's something wrong with the __mixed+__ entry.",
        fail: "There's something wrong with the __fail+__ entry."
    }
    let customMoveError = []
    let customMoveMessage = []
    const nameRegex = /^[nN][aA][mM][eE]\+["”][\s\S]+$/
    const commandRegex = /^[cC][oO][mM][mM][aA][nN][dD]\+["”][a-zA-Z]+$/
    const rollRegex = /^[rR][oO][lL][lL]\+["”]\d+d\d+\s\+(mad|peace|sad|joy|scared|power|MAD|PEACE|SAD|JOY|SCARED|POWER)$/
    const textRegex =  /^[tT][eE][xX][tT]\+["”][\s\S]+$/
    const successRegex = /^[sS][uU][cC][cC][eE][sS][sS]\+["”][\s\S]+$/
    const mixedRegex = /^[mM][iI][xX][eE][dD]\+["”][\s\S]+$/
    const failRegex = /^[fF][aA][iI][lL]\+["”][\s\S]+$/
    userMessage[0] = userMessage[0].slice(8)
    let moveName; let moveCommand; let moveRoll; let moveText;
    let moveSuccess; let moveMixed; let moveFail; let camelName

    userMessage = userMessage.join(' ')
    if(userMessage.includes('"')){userMessage = userMessage.split('" ')}
    if(userMessage.includes('”')){userMessage = userMessage.split('” ')}
    userMessage[0] = userMessage[0].slice(1)
    if(userMessage[6]){userMessage[6] = userMessage[6].slice(0, -1)}
    
    userMessage.forEach(i => {
        if(nameRegex.test(i)){
            checks.name = ''
            i = i.slice(6).toUpperCase()
            moveName = i
        } else if (commandRegex.test(i)){
            checks.command = ''
            i = i.slice(9).toLowerCase()
            moveCommand = i
        } else if (rollRegex.test(i)){
            checks.roll = ''
            i = i.slice(6).toLowerCase()
            moveRoll = i
        } else if (textRegex.test(i)){
            checks.text = ''
            i = i.slice(6)
            moveText = i
        } else if (successRegex.test(i)){
            checks.success = ''
            i = i.slice(9)
            moveSuccess = `**On a 10+**, ${i}`
        } else if (mixedRegex.test(i)){
            checks.mixed = ''
            i = i.slice(7)
            moveMixed = `**On a 7-9**, ${i}`
        } else if (failRegex.test(i)){
            checks.fail = ''
            i = i.slice(6)
            moveFail = `**On a 6-**, ${i}`
        }
    })
    
    for(let [key, value] of Object.entries(checks)){
        if(value){
            customMoveError.push(value)
        }
    }

    if(customMoveError[0]){
        customMoveError = customMoveError.toString().split(",").join("\n")
        return `${customMoveError}\n\n**Check !newmove? for help and try again.**`
    } else {
        customMoveMessage.push(`__Name__: ${moveName}`)
        customMoveMessage.push(`__Command__: ${moveCommand}`)
        customMoveMessage.push(`__Roll__: ${moveRoll}`)
        customMoveMessage.push(`__Text__: ${moveText}`)
        customMoveMessage.push(`__Success__: ${moveSuccess}`)
        customMoveMessage.push(`__Mixed__: ${moveMixed}`)
        customMoveMessage.push(`__Fail__: ${moveFail}`)
    
        function toCamelCase(sentenceCase) {
            var out = "";
            sentenceCase.split(" ").forEach(function (el, idx) {
                var add = el.toLowerCase();
                out += (idx === 0 ? add : add[0].toUpperCase() + add.slice(1));
            });
            return out;
        }
        camelName = toCamelCase(moveName)

        if(!userData['CUSTOM']){
            userData['CUSTOM'] = {}
        }
        if(userData['CUSTOM'][camelName]){
            userData['CUSTOM'][camelName] = {}
        }

        for(i in userData['CUSTOM']){
            if(userData['CUSTOM'][i]['command'] === moveCommand){
                return "There is already a Custom Move with that command.\nCheck the __!movelist__\
 and choose an unused command word."
            }
        }
    
        let newMove = {
            name: moveName,
            command: moveCommand,
            roll: moveRoll,
            text: moveText,
            success: moveSuccess,
            mixed: moveMixed,
            fail: moveFail
            }

        userData['CUSTOM'][camelName] = newMove
        customMoveMessage = customMoveMessage.join("^").split("^").join("\n")
        return `NEW CUSTOM MOVE:\n\n${customMoveMessage}\n\nTo use, type: __!move ${moveCommand}__`
    }
}

function customMove(userMessage, userId, channelId, userNickname, moves, userData){

    if(!userMessage[1]){
        return `To use a Custom Move, enter __!move__ followed by the one-word\
 command for the move.\n\nIf you'd like to see a list of your Custom Moves, enter\
 __!movelist__.`
    }
    
    else if(userMessage[1]){
        if(userMessage[1].endsWith("?")){
            userMessage[1] = userMessage[1].slice(0, -1)
            moveCheck = false
            let customName
            let customCommand
            let customText
            let customRoll
            let customSuccess
            let customMixed
            let customFail
            for(camelName in userData['CUSTOM']){
                    userMessage.forEach(i => {
                        if(userData['CUSTOM'][camelName]['command'] === i){
                            moveCheck = true
                            customName = userData['CUSTOM'][camelName]['name']
                            customCommand = userData['CUSTOM'][camelName]['command']
                            customText = userData['CUSTOM'][camelName]['text']
                            customRoll = userData['CUSTOM'][camelName]['roll']
                            customSuccess = userData['CUSTOM'][camelName]['success']
                            customMixed = userData['CUSTOM'][camelName]['mixed']
                            customFail = userData['CUSTOM'][camelName]['fail']
                            return
                        }
                    })
            }
            if(!moveCheck){return "Something went wrong! To look up a custom move, enter the command\
 !move followed by the custom command for your move with a ? on the end.\n\
EXAMPLE: !move runaway?  OR  !move flyhigh?\n\
Enter __!movelist__ to see a list of all custom moves and commands."}
            else {
                return `HERE IS YOUR CUSTOM MOVE:\n\n__Name__: ${customName}\n__Command__: ${customCommand}\n\
__Roll__: ${customRoll}\n__Text__: ${customText}\n__Success__: ${customSuccess}\n__Mixed__: ${customMixed}\n\
__Fail__: ${customFail}\n\nTo edit this move, create a __!newmove__ with the same name.\n\
To delete this move, enter __!deletemove name+"${customName}"__`
            }

        } else {
    moveCheck = false
    let customName
    let customText
    let customRoll
    let customSuccess
    let customMixed
    let customFail
    for(camelName in userData['CUSTOM']){
            userMessage.forEach(i => {
                if(userData['CUSTOM'][camelName]['command'] === i){
                    moveCheck = true
                    customName = userData['CUSTOM'][camelName]['name']
                    customText = userData['CUSTOM'][camelName]['text']
                    customRoll = userData['CUSTOM'][camelName]['roll']
                    customSuccess = userData['CUSTOM'][camelName]['success']
                    customMixed = userData['CUSTOM'][camelName]['mixed']
                    customFail = userData['CUSTOM'][camelName]['fail']
                    return
                }
            })
    }

    if(!moveCheck){return "Something went wrong! To use a custom move, enter the command\
 !move followed by the custom command for your move. Enter __!movelist__ to see a list\
 of all custom moves and commands."}
    else if (moveCheck){   
    userMessage = customRoll.split(' ')
    rollMessage = xdyRoll(userMessage, userId, channelId, userNickname, moves, userData)
    return `__${customName}__\n${customText}\n\n${rollMessage}\n\n • ${customSuccess}\n • ${customMixed}\n • ${customFail}`
            }
        }
    }
}

function moveList(userMessage, userId, channelId, userNickname, moves, userData){

    let customListMessage = []

    for(i in userData['CUSTOM']){
        customListMessage.push(`__Name__: ${userData['CUSTOM'][i]['name']}`)
        customListMessage.push(`__Command__: !move ${userData['CUSTOM'][i]['command']}\n`)
    }
    
    if(!customListMessage[0]){return "You don't have any custom moves saved.\nType __!newmove?__ to learn more."}
    else {
        customListMessage = customListMessage.toString().split(",").join("\n")
        return `LIST OF CUSTOM MOVES:\n\n${customListMessage}`
    }
}

function deleteMove(userMessage, userId, channelId, userNickname, moves, userData){
    if(!userMessage[1]){return moves.deleteMove.text}

    let nameCheck = "Something went wrong! Either there is not Custom Move by that name,\
 or something is wrong with your syntax.\nEnter __!deletemove?__ for help."
    const nameRegex = /^"[\s\S]+"$/
    let deleteCamelName
    userMessage = userMessage.slice(1).join(' ')
    if(nameRegex.test(userMessage)){
            userMessage = userMessage.slice(1)
            userMessage = userMessage.slice(0, -1)
            for(moveCamelName in userData['CUSTOM']){
                function toCamelCase(sentenceCase) {
                    var out = "";
                    sentenceCase.split(" ").forEach(function (el, idx) {
                        var add = el.toLowerCase();
                        out += (idx === 0 ? add : add[0].toUpperCase() + add.slice(1));
                    });
                    return out;
                }
                deleteCamelName = toCamelCase(userMessage)

                if(moveCamelName === deleteCamelName){
                    delete userData['CUSTOM'][moveCamelName]
                    nameCheck = ''
                }
    }
    }

    if(nameCheck){return nameCheck}
    else{return `You deleted the Custom Move: ${deleteCamelName.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); })}`}

}

function newNpc(userMessage, userId, channelId, userNickname, moves, userData){
    let randomNpc

    var randomName = moves.npcGenerator.name[Math.floor(Math.random()*moves.npcGenerator.name.length)];
    var randomGender = moves.npcGenerator.gender[Math.floor(Math.random()*moves.npcGenerator.gender.length)];
    var randomSkin = moves.npcGenerator.skin[Math.floor(Math.random()*moves.npcGenerator.skin.length)];
    var randomEyes = moves.npcGenerator.eyes[Math.floor(Math.random()*moves.npcGenerator.eyes.length)];
    var randomFace = moves.npcGenerator.face[Math.floor(Math.random()*moves.npcGenerator.face.length)];
    var randomBody = moves.npcGenerator.body[Math.floor(Math.random()*moves.npcGenerator.body.length)];
    var randomWear = moves.npcGenerator.wear[Math.floor(Math.random()*moves.npcGenerator.wear.length)];
    var randomCyberwear = moves.npcGenerator.cyberwear[Math.floor(Math.random()*moves.npcGenerator.cyberwear.length)];

    randomName = randomName.charAt(0).toUpperCase() + randomName.slice(1)
    randomGender = randomGender.charAt(0).toUpperCase() + randomGender.slice(1)
    randomSkin = randomSkin.charAt(0).toUpperCase() + randomSkin.slice(1)
    randomEyes = randomEyes.charAt(0).toUpperCase() + randomEyes.slice(1)
    randomFace = randomFace.charAt(0).toUpperCase() + randomFace.slice(1)
    randomBody = randomBody.charAt(0).toUpperCase() + randomBody.slice(1)
    randomWear = randomWear.charAt(0).toUpperCase() + randomWear.slice(1)
    randomCyberwear = randomCyberwear.charAt(0).toUpperCase() + randomCyberwear.slice(1)

    randomNpc = `HERE'S YOUR NEW NPC:\n\n\
__Name__: ${randomName}\n\
__Gender__: ${randomGender}\n\
__Skin__: ${randomSkin}\n\
__Eyes__: ${randomEyes}\n\
__Face__: ${randomFace}\n\
__Body__: ${randomBody}\n\
__Wear__: ${randomWear}\n\
__Cyberwear__: ${randomCyberwear}`

    return randomNpc
}

function newDrone(userMessage, userId, channelId, userNickname, moves, userData){
    
    let randomDrone = []
    let size
    let droneName = ''
    let armedMessage = ''

    if(userMessage[1] === "tiny"){
        randomDrone.push(`${moves.droneGenerator.sensors[Math.floor(Math.random()*moves.droneGenerator.sensors.length)]}`)
        randomDrone.push("tiny, fragile, stealthy")
        size = "Tiny"
        droneName = moves.droneGenerator.tinyName[Math.floor(Math.random()*moves.droneGenerator.tinyName.length)]
    } else if (userMessage[1] === "small"){
        randomDrone.push(`${moves.droneGenerator.smallStrengths[Math.floor(Math.random()*moves.droneGenerator.smallStrengths.length)]}`)
        randomDrone.push(`${moves.droneGenerator.sensors[Math.floor(Math.random()*moves.droneGenerator.sensors.length)]}`)
        randomDrone.push(`${moves.droneGenerator.weaknesses[Math.floor(Math.random()*moves.droneGenerator.weaknesses.length)]}`)
        let randomPick = (Math.floor(Math.random()*3)) + 1
        if (randomPick === 1){
            randomDrone.push(`${moves.droneGenerator.smallStrengths[Math.floor(Math.random()*moves.droneGenerator.smallStrengths.length)]}`)
        } else if (randomPick === 2){
            randomDrone.push(`${moves.droneGenerator.sensors[Math.floor(Math.random()*moves.droneGenerator.sensors.length)]}`)
        } else if (randomPick === 3){
            randomDrone.push(`${moves.droneGenerator.weaknesses[Math.floor(Math.random()*moves.droneGenerator.weaknesses.length)]}`)
        }
        size = "Small"
        armedMessage = '\n\nIf •*armed*, roll __!weapon__ to find out what it\'s packing.\n(small drones: max 2-harm, no autofire, close or less)'
        droneName = moves.droneGenerator.smallName[Math.floor(Math.random()*moves.droneGenerator.smallName.length)]
    } else if (userMessage[1] === "medium"){
        randomDrone.push(`${moves.droneGenerator.mediumStrengths[Math.floor(Math.random()*moves.droneGenerator.mediumStrengths.length)]}`)
        randomDrone.push(`${moves.droneGenerator.sensors[Math.floor(Math.random()*moves.droneGenerator.sensors.length)]}`)
        randomDrone.push(`${moves.droneGenerator.weaknesses[Math.floor(Math.random()*moves.droneGenerator.weaknesses.length)]}`)
        let randomPick = (Math.floor(Math.random()*3)) + 1
        if (randomPick === 1){
            randomDrone.push(`${moves.droneGenerator.mediumStrengths[Math.floor(Math.random()*moves.droneGenerator.mediumStrengths.length)]}`)
        } else if (randomPick === 2){
            randomDrone.push(`${moves.droneGenerator.sensors[Math.floor(Math.random()*moves.droneGenerator.sensors.length)]}`)
        } else if (randomPick === 3){
            randomDrone.push(`${moves.droneGenerator.weaknesses[Math.floor(Math.random()*moves.droneGenerator.weaknesses.length)]}`)
        }
        let randomPickTwo = (Math.floor(Math.random()*3)) + 1
        if (randomPickTwo === 1){
            randomDrone.push(`${moves.droneGenerator.mediumStrengths[Math.floor(Math.random()*moves.droneGenerator.mediumStrengths.length)]}`)
        } else if (randomPickTwo === 2){
            randomDrone.push(`${moves.droneGenerator.sensors[Math.floor(Math.random()*moves.droneGenerator.sensors.length)]}`)
        } else if (randomPickTwo === 3){
            randomDrone.push(`${moves.droneGenerator.weaknesses[Math.floor(Math.random()*moves.droneGenerator.weaknesses.length)]}`)
        }
        size = "Medium"
        armedMessage = '\n\nIf •*armed*, roll __!weapon__ to find out what it\'s packing.\n(medium drones: max 3-harm, near or less)'
        droneName = moves.droneGenerator.mediumName[Math.floor(Math.random()*moves.droneGenerator.mediumName.length)]
    } else if(userMessage[1] === "large"){
        randomDrone.push(`${moves.droneGenerator.largeStrengths[Math.floor(Math.random()*moves.droneGenerator.largeStrengths.length)]}`)
        randomDrone.push(`${moves.droneGenerator.largeStrengths[Math.floor(Math.random()*moves.droneGenerator.largeStrengths.length)]}`)
        randomDrone.push(`${moves.droneGenerator.sensors[Math.floor(Math.random()*moves.droneGenerator.sensors.length)]}`)
        randomDrone.push(`${moves.droneGenerator.weaknesses[Math.floor(Math.random()*moves.droneGenerator.weaknesses.length)]}`)
        let randomPick = (Math.floor(Math.random()*3)) + 1
        if (randomPick === 1){
            randomDrone.push(`${moves.droneGenerator.largeStrengths[Math.floor(Math.random()*moves.droneGenerator.largeStrengths.length)]}`)
        } else if (randomPick === 2){
            randomDrone.push(`${moves.droneGenerator.sensors[Math.floor(Math.random()*moves.droneGenerator.sensors.length)]}`)
        } else if (randomPick === 3){
            randomDrone.push(`${moves.droneGenerator.weaknesses[Math.floor(Math.random()*moves.droneGenerator.weaknesses.length)]}`)
        }
        let randomPickTwo = (Math.floor(Math.random()*3)) + 1
        if (randomPickTwo === 1){
            randomDrone.push(`${moves.droneGenerator.largeStrengths[Math.floor(Math.random()*moves.droneGenerator.largeStrengths.length)]}`)
        } else if (randomPickTwo === 2){
            randomDrone.push(`${moves.droneGenerator.sensors[Math.floor(Math.random()*moves.droneGenerator.sensors.length)]}`)
        } else if (randomPickTwo === 3){
            randomDrone.push(`${moves.droneGenerator.weaknesses[Math.floor(Math.random()*moves.droneGenerator.weaknesses.length)]}`)
        }
        randomDrone.push("obvious")
        size = "Large"
        armedMessage = '\n\nIf •*armed*, roll __!weapon__ to find out what it\'s packing.\n(large drones: max 4-harm)'
        droneName = moves.droneGenerator.largeName[Math.floor(Math.random()*moves.droneGenerator.largeName.length)]
    } else {return `Something went wrong (don't forget to include a size).\n\n${moves.droneGenerator.text}`}

    randomDroneCapitalized = []
    randomDrone.forEach(i => {
        i = i.charAt(0).toUpperCase() + i.slice(1)
        randomDroneCapitalized.push(i)
    })

    randomDroneCapitalized = randomDroneCapitalized.join("\n• ")
    return `HERE'S YOUR NEW DRONE:\n\n__${droneName} ${size} Drone__:\n• ${randomDroneCapitalized}${armedMessage}`
}

function newWeapon(userMessage, userId, channelId, userNickname, moves, userData){
    return  `__Random Weapon__:\n\n${moves.weaponGenerator.weapons[Math.floor(Math.random()*moves.weaponGenerator.weapons.length)]}`
}

function newCorp(userMessage, userId, channelId, userNickname, moves, userData){
    randomCorp = [] 
    randomCorp.push(moves.corpGenerator.name[Math.floor(Math.random()*moves.corpGenerator.name.length)])
    randomCorp.push(moves.corpGenerator.trade[Math.floor(Math.random()*moves.corpGenerator.trade.length)])
    randomCorp.push(moves.corpGenerator.suffix[Math.floor(Math.random()*moves.corpGenerator.suffix.length)])
    randomCorp = randomCorp.join(" ")
    return `HERE'S YOUR CORPORATION:\n\n${randomCorp}`
}