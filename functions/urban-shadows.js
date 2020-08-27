let storage
require('../mungu.js').then(s => storage = s)

module.exports = {deleteMove, moveList, customMove, newCustomMove, setGame, setPrefix, removePrefix, xdyRoll, roll, newCharacter, characterSheet, setStats, shift, moveRoll, markCorruptionOrFaction, clearCorruptionOrFaction, debts, owedToMe, owedToThem}

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
    } else if(moves[i].stat === 'faction'){
        if(!userMessage[1] || !isFaction(userMessage[1])){
            return 'You need to add a +FACTION to your command'
        }
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
    let grandTotal = total + modStat;
    if (grandTotal >= 10){
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
    return `__${moves[i].name}__\n${rollText}\n\n${moveText}`
}

function newCharacter(userMessage, userId, channelId, userNickname, moves, userData){
    userData[userId] = {}
    let person = {};
    for(let [key, value] of Object.entries(moves.abilities.stats)){
        person[key] = value[1]
    }
    userData[userId] = person;
    storage.set(channelId, userData);
    return 'CREATED A BLANK CHARACTER: Type __!set?__ to learn\
 how to set your character stats.\n' + characterSheet(userMessage, userId, channelId, userNickname, moves, userData)
}

function characterSheet(userMessage, userId, channelId, userNickname, moves, userData){
    statPrintout = ['Here are your CHARACTER STATS:'];
    for(let [key, value] of Object.entries(userData[userId])){
        if(key != 'factions') {
            if(/MORTALITY|NIGHT|POWER|WILD/.test(key)){
                const marked = userData[userId]['factions'] && userData[userId]['factions'].includes(key.toLowerCase())
                statPrintout.push(`(${marked?'•':' '}) ${key}: ${value}`)
            } else if(key === 'CORRUPTION') {
                const maxValue = 5;
                statPrintout.push(`${key}: ${value} / ${maxValue}`)
            } else if(key !== 'OWEDTOME' && key !== 'OWEDTOTHEM'){
                statPrintout.push(`${key}: ${value}`)
            }
        }
    }
    statPrintout = statPrintout.toString().split(",").join("\n")
    return statPrintout
}

function shift(userMessage, userId, channelId, userNickname, moves, userData){
    if(!userMessage[1]){return moves.shift.text}
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
                    let oldStat = userData[userId][key]
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
                                userData[userId][key] = `${slashVal} / 5 Faint Harm`
                            } else if(slashVal > 1 && slashVal < 4){
                                userData[userId][key] = `${slashVal} / 5 Grievous Harm`
                            } else if(slashVal > 3 && slashVal < 6){
                                userData[userId][key] = `${slashVal} / 5 Critical Harm!`
                            } else if(slashVal > 5){
                                userData[userId][key] = `${slashVal} / 5 YOU ARE DEAD!`
                            }
                            shiftPrintout.push(`${key}: ${oldStat} \u00A0\u00A0=>\u00A0\u00A0 ${userData[userId][key]}`)
                    } else if(value[0]==='exp'){
                        slashVal = parseInt(slashVal.substring(0)) + i
                        if(isNaN(slashVal)){shiftPrintout.push(moves.shift.error)}
                        if(slashVal<0){slashVal=0}
                        if(slashVal < 5){
                            userData[userId][key] = `${slashVal} / 5`
                        } else if(slashVal > 4){
                            userData[userId][key] = `${slashVal} / 5 IMPROVE!`
                        }
                        shiftPrintout.push(`${key}: ${oldStat} \u00A0\u00A0=>\u00A0\u00A0 ${userData[userId][key]}`)
                    } else if(value[0]==='corruption'){
                        let maxValue = 5
                        userData[userId][key] = slashVal + i;
                        shiftPrintout.push(`${key}: ${oldStat} \u00A0\u00A0=>\u00A0\u00A0 ${userData[userId][key]}`)
                        if(userData[userId][key] >= maxValue){
                            shiftPrintout += '\n\Unlock a corruption advance and *clear* your corruption track.'
                        }
                    } else{
                        userData[userId][key] = slashVal + i;
                        shiftPrintout.push(`${key}: ${oldStat} \u00A0\u00A0=>\u00A0\u00A0 ${userData[userId][key]}`)
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
                        else if(i === 1){i = `${i} / 5 Faint Harm`}
                        else if(i > 1 && i < 4){i = `${i} / 5 Grievous Harm`}
                        else if (i > 3 && i < 6){i = `${i} / 5 Critical Harm`}
                        else if (i > 5){i = `${i} / 5 YOU ARE DEAD!`}
                    if(!i){setErrors.push(moves.set.error)}
                    else{userData[userId][key] = i}
                } else if (value[0]==="exp"){
                    i = i.slice(value[0].length)
                    i = parseInt(i)
                    if(isNaN(i)){setErrors.push(moves.set.error)}
                    if(i<0){i=0}
                        if(i < 5){i = `${i} / 5`}
                        else if (i > 4){i = `${i} / 5 IMPROVE!`}
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
    setErrors = setErrors.toString().split(",").join("\n")
    if(setErrors){return setErrors}
    else{return characterSheet(userMessage, userId, channelId, userNickname, moves, userData)}
}

function debts(userMessage, userId, channelId, userNickname, moves, userData){
    let OwedToMePrintout
    let OwedToThemPrintout

    if (userData[userId]['OWEDTOME'] && Object.keys(userData[userId]['OWEDTOME']).length !== 0) {
        let owedToMeList = []
        for(let [key, value] of Object.entries(userData[userId]['OWEDTOME'])){
            owedToMeList.push(`${capitalize(key)}: ${value}`)   
        }
        OwedToMePrintout = `DEBTS OWED TO ME:\n • ${owedToMeList.join("\n• ")}`
    } else {
        OwedToMePrintout = 'DEBTS OWED TO ME:\n -- None --'
    }
    
    if (userData[userId]['OWEDTOTHEM'] && Object.keys(userData[userId]['OWEDTOTHEM']).length !== 0){
        let owedToThemList = []
        for(let [key, value] of Object.entries(userData[userId]['OWEDTOTHEM'])){
            owedToThemList.push(`${capitalize(key)}: ${value}`)
        }
        OwedToThemPrintout = `DEBTS I OWE:\n • ${owedToThemList.join("\n• ")}`
    } else {
        OwedToThemPrintout = 'DEBTS I OWE:\n -- None --'
    }

    return `Enter __!debts?__ to learn how to add or remove debts.\n\n${OwedToMePrintout}\n\n${OwedToThemPrintout}`
}

function owedToMe(userMessage, userId, channelId, userNickname, moves, userData){
    if(!userMessage[1]){return moves.owedToMe.text}
    if (userMessage[2] && userMessage[2].length > 30){return 'That name is too long. Try a shorter version.'}
    if (!userData[userId]['OWEDTOME']){userData[userId]['OWEDTOME'] = {}}
    let OwedToMeMessage = ''
    let _myDebts = 1

    if(userMessage[1] === "add"){
        if (userMessage.length == 4 ) {
            _myDebts = parseInt(userMessage[3])
            if (isNaN(_myDebts) || _myDebts < 1) { return moves.owedToMe.text }
        } else {
            _myDebts = 1
        }
        
        if(!userData[userId]['OWEDTOME'][userMessage[2]]) {
            userData[userId]['OWEDTOME'][userMessage[2]] = _myDebts
        } else {
            userData[userId]['OWEDTOME'][userMessage[2]] += _myDebts;
        }
        total = userData[userId]['OWEDTOME'][userMessage[2]]
        OwedToMeMessage = `${capitalize(userMessage[2])} owes you ${total} debt${total==1?'':'s'}.`

    } else if (userMessage[1] === "remove"){
        if (userMessage.length == 4){
            _myDebts = parseInt(userMessage[3])
            if (isNaN(_myDebts) || _myDebts < 1) { return moves.owedToMe.text }
        } else {
            _myDebts = 1
        }

        if(userData[userId]['OWEDTOME'][userMessage[2]]){
            if (userData[userId]['OWEDTOME'][userMessage[2]] < _myDebts){
                total = userData[userId]['OWEDTOME'][userMessage[2]]
                return `${capitalize(userMessage[2])} only owes you ${total} debt${total==1?'':'s'}. Please enter a valid number of debts to remove.` 
            } else {
                userData[userId]['OWEDTOME'][userMessage[2]] -= _myDebts
            }
        } else {
            return `Couldn't find ${capitalize(userMessage[2])}.`
        }
        total = userData[userId]['OWEDTOME'][userMessage[2]]
        OwedToMeMessage = `${capitalize(userMessage[2])} owes you ${total} debt${total==1?'':'s'}.`
        if (userData[userId]['OWEDTOME'][userMessage[2]] == 0) { delete userData[userId]['OWEDTOME'][userMessage[2]] }
    } else if (userMessage[1] === "clear"){
        if (userData[userId]['OWEDTOME']) {
            delete userData[userId]['OWEDTOME']
        }
        return "Cleared all debts that are owed to you."
    }

    if(OwedToMeMessage){return OwedToMeMessage} else {return moves.owedToMe.text}
}

function owedToThem(userMessage, userId, channelId, userNickname, moves, userData){
    if(!userMessage[1]){return moves.owedToThem.text}
    if (userMessage[2] && userMessage[2].length > 30){return 'That name is too long. Try a shorter version.'}
    if (!userData[userId]['OWEDTOTHEM']){userData[userId]['OWEDTOTHEM'] = {}}
    let OwedToThemMessage = ''
    let _myDebts = 1

    if(userMessage[1] === "add"){
        if (userMessage.length == 4 ) {
            _myDebts = parseInt(userMessage[3])
            if (isNaN(_myDebts) || _myDebts < 1) { return moves.owedToMe.text }
        } else {
            _myDebts = 1
        }
        
        if(!userData[userId]['OWEDTOTHEM'][userMessage[2]]) {
            userData[userId]['OWEDTOTHEM'][userMessage[2]] = _myDebts
        } else {
            userData[userId]['OWEDTOTHEM'][userMessage[2]] += _myDebts;
        }
        total = userData[userId]['OWEDTOTHEM'][userMessage[2]]
        OwedToThemMessage = `You owe ${capitalize(userMessage[2])} ${total} debt${total==1?'':'s'}.`

    } else if (userMessage[1] === "remove"){
        if (userMessage.length == 4){
            _myDebts = parseInt(userMessage[3])
            if (isNaN(_myDebts) || _myDebts < 1) { return moves.owedToMe.text }
        } else {
            _myDebts = 1
        }

        if(userData[userId]['OWEDTOTHEM'][userMessage[2]]){
            if (userData[userId]['OWEDTOTHEM'][userMessage[2]] < _myDebts){
                total = userData[userId]['OWEDTOTHEM'][userMessage[2]]
                return `You only owe ${total} debt${total==1?'':'s'} to ${capitalize(userMessage[2])}. Please enter a valid number of debts to remove.` 
            } else {
                userData[userId]['OWEDTOTHEM'][userMessage[2]] -= _myDebts
            }
        } else {
            return `Couldn't find ${capitalize(userMessage[2])}.`
        }
        total = userData[userId]['OWEDTOTHEM'][userMessage[2]]
        OwedToThemMessage = `You owe ${capitalize(userMessage[2])} ${total} debt${total==1?'':'s'}.`
        if (userData[userId]['OWEDTOTHEM'][userMessage[2]] == 0) { delete userData[userId]['OWEDTOTHEM'][userMessage[2]] }
    } else if (userMessage[1] === "clear"){
        if (userData[userId]['OWEDTOTHEM']) {
            delete userData[userId]['OWEDTOTHEM']
        }
        return "Cleared all debts that are owed to others."
    }

    if(OwedToThemMessage){return OwedToThemMessage} else {return moves.owedToThem.text}
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
    const nameRegex = /^[nN][aA][mM][eE]\+"[\s\S]+$/
    const commandRegex = /^[cC][oO][mM][mM][aA][nN][dD]\+"[a-zA-Z]+$/
    const rollRegex = /^[rR][oO][lL][lL]\+"\d+d\d+\s\+(blood|heart|mind|spirit|mortality|night|power|wild|BLOOD|HEART|MIND|SPIRIT|MORTALITY|NIGHT|POWER|WILD)$/
    const textRegex =  /^[tT][eE][xX][tT]\+"[\s\S]+$/
    const successRegex = /^[sS][uU][cC][cC][eE][sS][sS]\+"[\s\S]+$/
    const mixedRegex = /^[mM][iI][xX][eE][dD]\+"[\s\S]+$/
    const failRegex = /^[fF][aA][iI][lL]\+"[\s\S]+$/
    userMessage[0] = userMessage[0].slice(8)
    let moveName; let moveCommand; let moveRoll; let moveText;
    let moveSuccess; let moveMixed; let moveFail; let camelName

    userMessage = userMessage.join(' ').split('" ')
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
            moveSuccess = `On a 10+, ${i}`
        } else if (mixedRegex.test(i)){
            checks.mixed = ''
            i = i.slice(7)
            moveMixed = `On a 7-9, ${i}`
        } else if (failRegex.test(i)){
            checks.fail = ''
            i = i.slice(6)
            moveFail = `On a 6-, ${i}`
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

function markCorruption(userMessage, userId, channelId, userNickname, moves, userData){
    return shift(['mark','corruption+1'], userId, channelId, userNickname, moves, userData)
}

function clearCorruption(userMessage, userId, channelId, userNickname, moves, userData){
    return setStats(['set','corruption+0'], userId, channelId, userNickname, moves, userData)
}

function markCorruptionOrFaction(userMessage, userId, channelId, userNickname, moves, userData){
    if(userMessage.length < 2) { return moves.markCorruptionOrFaction.text }
    const corruptRegex = RegExp('^c$|corrupt|corruption')
    const factionRegex = RegExp('^m$|mort|mortality|^n$|night|^p$|pow|power|^w$|wild')
    if(corruptRegex.test(userMessage[1])){
        return markCorruption(userMessage, userId, channelId, userNickname, moves, userData)
    }
    else if(factionRegex.test(userMessage[1])){
        if (!userData[userId]['factions']) { userData[userId]['factions'] = []; }
        let faction;
        let message;
        switch(userMessage[1]) {
            case "m":
            case "mort":
            case "mortality":
                faction = "mortality";
                break;
            case "n":
            case "night":
                faction = "night";
                break;
            case "p":
            case "pow":
            case "power":
                faction = "power";
                break;
            case "w":
            case "wild":
                faction = "wild"
        }
        if (userData[userId]['factions'].includes(faction)) {
            message = `${faction} already marked.`
        } else {
            userData[userId]['factions'].push(faction)
            message = `Marked ${faction}.`
        }
        if(userData[userId]['factions'].length == 4) {
            message += ' All factions marked. Clear the marks and advance.'
        }
        if (message) { return message}
    }
    return moves.markCorruptionOrFaction.text
}

function clearCorruptionOrFaction(userMessage, userId, channelId, userNickname, moves, userData){
    if(userMessage.length < 2) { return moves.clearCorruptionOrFaction.text }
    const corruptRegex = RegExp('^c$|corrupt|corruption')
    const factionRegex = RegExp('^m$|mort|mortality|^n$|night|^p$|pow|power|^w$|wild')
    if(corruptRegex.test(userMessage[1])){
        return clearCorruption(userMessage, userId, channelId, userNickname, moves, userData)
    }
    else if(factionRegex.test(userMessage[1])){
        if (!userData[userId]['factions']) { userData[userId]['factions'] = []; }
        let faction;
        let message;
        switch(userMessage[1]) {
            case "m":
            case "mort":
            case "mortality":
                faction = "mortality";
                break;
            case "n":
            case "night":
                faction = "night";
                break;
            case "p":
            case "pow":
            case "power":
                faction = "power";
                break;
            case "w":
            case "wild":
                faction = "wild"
                break;
        }
        const index = userData[userId]['factions'].indexOf(faction);
        if (index > -1) {
            userData[userId]['factions'].splice(index, 1);
            message = `Cleared ${faction}.`
        } else {
            message = `${faction} already cleared.`
        }
    } else if (/^a$|all|^f$|faction|factions/.test(userMessage[1])) {
        userData[userId]['factions']= [];
        message = "All factions cleared."
    }
    
    if (message) { return message}

    return moves.clearCorruptionOrFaction.text
}

function capitalize(phrase) {
    return phrase.charAt(0).toUpperCase() + phrase.slice(1)
}

function isFaction(tag) {
    return /MORTALITY|MORT|POWER|NIGHT|WILD/.test(tag.toUpperCase())
}