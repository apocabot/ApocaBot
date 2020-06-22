let storage
require('../mungu.js').then(s => storage = s)

module.exports = {setGame, setPrefix, removePrefix, xdyRoll, roll, newCharacter, characterSheet, setStats, shift, moveRoll, messageCounter, markCondition, clearCondition}

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
    let conditions = 0
    let input = userMessage[1];
    input = parseInt(input);
    if(moves[i].stat === 'num'){
        if(!input){input = 0}
        modStat = input
    } else if(moves[i].stat === 'con'){
        modStat = userData[userId]['CONDITIONS'].split(" ").length-1
        showStat = ' COND'
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
            else{addOnPrint = addOn; result.push(` *(${addOnPrint})*`)}
            
        }   
        if(statTwo){
            addOn = parseInt(userMessage[2]);
            if(addOn>=0){addOnPrint = `+${addOn}`}
            else{addOnPrint = addOn}
            result.push(` *(${addOnPrint})*`)
        }
    }
    if (userMessage[0] === 'engage' && userData[userId]['CONDITIONS'].includes('Afraid')){
        conditions += -2;
        result.push(` *(-2 Afraid)*`)
    }
    if (userMessage[0] === 'comfort' && userData[userId]['CONDITIONS'].includes('Angry')){
        conditions += -2;
        result.push(` *(-2 Angry)*`)
    }
    if (userMessage[0] === 'support' && userData[userId]['CONDITIONS'].includes('Angry')){
        conditions += -2;
        result.push(` *(-2 Angry)*`)
    }
    if (userMessage[0] === 'pierce' && userData[userId]['CONDITIONS'].includes('Angry')){
        conditions += -2;
        result.push(` *(-2 Angry)*`)
    }
    if (userMessage[0] === 'provoke' && userData[userId]['CONDITIONS'].includes('Guilty')){
        conditions += -2;
        result.push(` *(-2 Guilty)*`)
    }
    if (userMessage[0] === 'assess' && userData[userId]['CONDITIONS'].includes('Guilty')){
        conditions += -2;
        result.push(` *(-2 Guilty)*`)
    }
    if (userMessage[0] === 'unleash' && userData[userId]['CONDITIONS'].includes('Hopeless')){
        conditions += -2;
        result.push(` *(-2 Hopeless)v`)
    }
    if (userMessage[0] === 'defend' && userData[userId]['CONDITIONS'].includes('Insecure')){
        conditions += -2;
        result.push(` *(-2 Insecure)*`)
    }
    if (userMessage[0] === 'reject' && userData[userId]['CONDITIONS'].includes('Insecure')){
        conditions += -2;
        result.push(` *(-2 Insecure)*`)
    }

    total = total + addOn + conditions;
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
    return `${rollText}\n${moveText}`
}

function newCharacter(userMessage, userId, channelId, userNickname, moves, userData){
    if(!userData['TEAM']){userData['TEAM'] = 0}
    let person = {};
    for(let [key, value] of Object.entries(moves.abilities.stats)){
        person[key] = value[1]
    }
    person.TEAM = (userData['TEAM'])
    userData[userId] = person;
    storage.set(channelId, userData);
    return 'CREATED A BLANK CHARACTER: Type __!set?__ to learn\
 how to set your character stats.\n' + characterSheet(userMessage, userId, channelId, userNickname, moves, userData)
}

function characterSheet(userMessage, userId, channelId, userNickname, moves, userData){
    statPrintout = ['Here are your CHARACTER STATS:'];
    delete userData[userId]['TEAM']
    for(let [key, value] of Object.entries(userData[userId])){
        statPrintout.push(`${key}: ${value}`)
    }
    statPrintout.push(`TEAM: ${userData['TEAM']}`)
    statPrintout = statPrintout.toString().split(",").join("\n")
    return statPrintout
}

function shift(userMessage, userId, channelId, userNickname, moves, userData){
    let shiftMessage = ['CHANGES:'];
    let errorMessage = ''
    let shiftRegex = /^name|mark|clear$/

    userMessage.forEach(i => {
        if(i.startsWith('team')){
            i = i.slice(4)
            i = parseInt(i)
            if(isNaN(i)){
                errorMessage.push('INCORRECT TEAM INPUT\nEXAMPLE: !shift team+1')
            } else {
                userData['TEAM'] = userData['TEAM'] + i;
                shiftMessage.push(`TEAM: Shifted to ${userData['TEAM']}`)}
        }

    })
    for(let [key, value] of Object.entries(moves.abilities.stats)){
        userMessage.forEach(i => {
            if(shiftRegex.test(i)){
                errorMessage = 'You can only shift Labels, Team, and Potential';
                return;
            }
            else if(i.startsWith(value[0]) && value[0]!='pot'){
                i = i.slice(value[0].length)        
                i = parseInt(i);
                if(isNaN(i)){
                    errorMessage = 'Use the format !shift label+num (Example: !shift mun+1 or !shift freak-1)';
                    return
                } else {
                    userData[userId][key] = userData[userId][key] + i;
                    if(parseInt(userData[userId][key]) > 3){
                        userData[userId][key] = 3
                        errorMessage = 'You can\'t shift your labels above +3. Instead, mark a condition, GM\'s choice.'
                    }else if(-2 > parseInt(userData[userId][key])){
                        userData[userId][key] = -2
                        errorMessage = 'You can\'t shift your labels below -2. Instead, mark a condition, GM\'s choice.'
                    } else{shiftMessage.push(`${key}: Shifted to ${userData[userId][key]}`)}
                }
            }
            else if (value[0]==='pot' && i.startsWith('pot')){
                i = i.slice(value[0].length)  
                i = parseInt(i);
                if(isNaN(i)){
                    errorMessage = 'Use the format !shift pot+num (Example: !shift pot+1 or !shift pot-5)';
                    return
                } else {
                    let slashVal = userData[userId][key]
                    slashVal = parseInt(slashVal.substring(0)) + i
                    if(isNaN(slashVal)){errorMessage = 'Your potential is not a number, try again.'}
                    if(slashVal<0){slashVal=0; errorMessage = 'Your potential cannot go below zero.'}
                    if(slashVal < 5){
                        userData[userId][key] = `${slashVal} / 5`
                    } else if(slashVal > 4){
                        userData[userId][key] = `${slashVal} / 5 ADVANCE!`
                    }
                    shiftMessage.push(`POTENTIAL: Shifted to ${userData[userId][key]}`)
                }
            }
        })
    }

    errorMessage = errorMessage.toString().split(",").join("\n")
    shiftMessage = shiftMessage.toString().split(",").join("\n")
    if(errorMessage){return errorMessage}
    else{return shiftMessage}
}

function setStats(userMessage, userId, channelId, userNickname, moves, userData){
    let errorMessage = []

    userMessage.forEach(i => {
        if(i.startsWith('team')){
            i = i.slice(4)
            i = parseInt(i)
            if(isNaN(i)){
                errorMessage.push('INCORRECT TEAM INPUT\nEXAMPLE: !set team+1')
            } else {userData['TEAM'] = i}
        }
    })

    for(let [key, value] of Object.entries(moves.abilities.stats)){
        userMessage.forEach(i => {
            if(i.startsWith(value[0])){
                if(value[0]==="conditions"){
                    errorMessage.push("INCORRECT COMMAND:\nManage conditions with the commands !mark and !clear")
                }
                if(value[0]==="name"){
                    i = i.slice(value[0].length)
                    i = i.slice(1).toUpperCase()
                    if(i==='NICKNAME'){i = userNickname};
                    if(!i){errorMessage.push('INCORRECT NAME INPUT\nEXAMPLE: !set name+bambino *or* !set name+nickname')}
                    else{userData[userId][key] = i}
                } else if (value[0]==="pot"){
                    i = i.slice(value[0].length)
                    i = parseInt(i)
                    if(isNaN(i)){
                        errorMessage.push('INCORRECT LABEL INPUT\nEXAMPLE: !set  dan+1  fre-1  pot+2  etc...')
                    } else {
                        if(i<0){i=0}
                        if(i < 5){
                            userData[userId][key] = `${i} / 5`
                        } else if (i > 4){
                            userData[userId][key] = `${i} / 5 ADVANCE!`
                        }
                    }
                } else {
                    i = i.slice(value[0].length)
                    i = parseInt(i)
                    if(isNaN(i)){
                        errorMessage.push('INCORRECT LABEL INPUT\nEXAMPLE: !set  dan+1  fre-1  mun+0  etc...')
                    } else {
                        userData[userId][key] = i 
                    }
                }  
            }       
        })
    }
    errorMessage = errorMessage.toString().split(",").join("\n")
    if(errorMessage){return errorMessage}
    else{return characterSheet(userMessage, userId, channelId, userNickname, moves, userData)}
}

function markCondition(userMessage, userId, channelId, userNickname, moves, userData){
    markMessage = ''
    
    userMessage.forEach(i => {
        switch(i){
            case 'afraid':
                if(!userData[userId]['CONDITIONS'].includes('Afraid')){
                    userData[userId]['CONDITIONS'] = userData[userId]['CONDITIONS'].concat(` Afraid`)
                    markMessage = 'You are now Afraid.'
                } else {
                    if(userData[userId]['CONDITIONS'].split(" ").length-1 === 5){
                        markMessage = 'You have no more conditions to mark. You are taken out, lose consciousness, or flee. The GM will tell you when you come back into another scene. You may clear one condition.'
                    } else {markMessage = 'You are already Afraid. Mark a different Condition.'}
                }
            break;
            case 'angry':
                if(!userData[userId]['CONDITIONS'].includes('Angry')){
                    userData[userId]['CONDITIONS'] = userData[userId]['CONDITIONS'].concat(` Angry`)
                    markMessage = 'You are now Angry.'
                } else {
                    if(userData[userId]['CONDITIONS'].split(" ").length-1 === 5){
                        markMessage = 'You have no more conditions to mark. You are taken out, lose consciousness, or flee. The GM will tell you when you come back into another scene. You may clear one condition.'
                    } else {markMessage = 'You are already Angry. Mark a different Condition.'}
                }
            break;
            case 'guilty':
                if(!userData[userId]['CONDITIONS'].includes('Guilty')){
                    userData[userId]['CONDITIONS'] = userData[userId]['CONDITIONS'].concat(` Guilty`)
                    markMessage = 'You are now Guilty.'
                } else {
                    if(userData[userId]['CONDITIONS'].split(" ").length-1 === 5){
                        markMessage = 'You have no more conditions to mark. You are taken out, lose consciousness, or flee. The GM will tell you when you come back into another scene. You may clear one condition.'
                    } else {markMessage = 'You are already Guilty. Mark a different Condition.'}
                }
            break;
            case 'hopeless':
                if(!userData[userId]['CONDITIONS'].includes('Hopeless')){
                    userData[userId]['CONDITIONS'] = userData[userId]['CONDITIONS'].concat(` Hopeless`)
                    markMessage = 'You are now Hopeless.'
                } else {
                    if(userData[userId]['CONDITIONS'].split(" ").length-1 === 5){
                        markMessage = 'You have no more conditions to mark. You are taken out, lose consciousness, or flee. The GM will tell you when you come back into another scene. You may clear one condition.'
                    } else {markMessage = 'You are already Hopeless. Mark a different Condition.'}
                }
            break;
            case 'insecure':
                if(!userData[userId]['CONDITIONS'].includes('Insecure')){
                    userData[userId]['CONDITIONS'] = userData[userId]['CONDITIONS'].concat(` Insecure`)
                    markMessage = 'You are now Insecure.'
                } else {
                    if(userData[userId]['CONDITIONS'].split(" ").length-1 === 5){
                        markMessage = 'You have no more conditions to mark. You are taken out, lose consciousness, or flee. The GM will tell you when you come back into another scene. You may clear one condition.'
                    } else {markMessage = 'You are already Insecure. Mark a different Condition.'}
                }
            break;
            default: markMessage = 'You didn\'t mark any Conditions.'
        }
    })
    return markMessage
}

function clearCondition(userMessage, userId, channelId, userNickname, moves, userData){
    clearMessage = ''
    
    userMessage.forEach(i => {
        switch(i){
            case 'afraid':
                if(userData[userId]['CONDITIONS'].includes('Afraid')){
                    userData[userId]['CONDITIONS'] = userData[userId]['CONDITIONS'].replace(` Afraid`, '')
                    clearMessage = 'You are no longer Afraid.'
                } else {clearMessage = 'You were not Afraid. Clear a different Condition.'}
            break;
            case 'angry':
                if(userData[userId]['CONDITIONS'].includes('Angry')){
                    userData[userId]['CONDITIONS'] = userData[userId]['CONDITIONS'].replace(` Angry`, '')
                    clearMessage = 'You are no longer Angry.'
                } else {clearMessage = 'You were not Angry. Clear a different Condition.'}
            break;
            case 'guilty':
                if(userData[userId]['CONDITIONS'].includes('Guilty')){
                    userData[userId]['CONDITIONS'] = userData[userId]['CONDITIONS'].replace(` Guilty`, '')
                    clearMessage = 'You are no longer Guilty.'
                } else {clearMessage = 'You were not Guilty. Clear a different Condition.'}
            break;
            case 'hopeless':
                if(userData[userId]['CONDITIONS'].includes('Hopeless')){
                    userData[userId]['CONDITIONS'] = userData[userId]['CONDITIONS'].replace(` Hopeless`, '')
                    clearMessage = 'You are no longer Hopeless.'
                } else {clearMessage = 'You were not Hopeless. Clear a different Condition.'}
            break;
            case 'insecure':
                if(userData[userId]['CONDITIONS'].includes('Insecure')){
                    userData[userId]['CONDITIONS'] = userData[userId]['CONDITIONS'].replace(` Insecure`, '')
                    clearMessage = 'You are no longer Insecure.'
                } else {clearMessage = 'You were not Insecure. Clear a different Condition.'}
            break;
            default: clearMessage = 'You didn\'t clear any Conditions.'
        }
    })
    return clearMessage
}

async function messageCounter(userData){
    if(!userData['COUNTER']){userData['COUNTER']=0} 
    userData['COUNTER']++
    if((userData['COUNTER']%50)===0){console.log(userData['COUNTER'])};
    await storage.set(userData)
}