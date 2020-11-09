let storage
require('../mungu.js').then(s => storage = s)

module.exports = {deleteMove, moveList, customMove, newCustomMove, setGame, setPrefix, damage, removePrefix, xdyRoll, roll, newCharacter, characterSheet, setStats, shift, moveRoll}

//functions
function removePrefix(message, userData){
    query = false
    newMoveRegex = /([nN][eE][wW][mM][oO][vV][eE])/
    gearRegex = /([gG][eE][aA][rR])/
    noteRegex = /([Nn][Oo][Tt][Ee])/
    notesRegex = /([Nn][Oo][Tt][Ee][Ss])/
    if(newMoveRegex.test(message) || gearRegex.test(message) || noteRegex.test(message) || notesRegex.test(message)){
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
    console.log(userData[userId])
    statPrintout = ['Here are your CHARACTER STATS:'];
    for(let [key, value] of Object.entries(userData[userId])){
        if (key==='GEAR') {
            statPrintout.push('GEAR: !gear')
        }
        else if (key==='NOTES') {
            statPrintout.push('NOTES: !notes')
        }
        else {statPrintout.push(`${key}: ${value}`)}
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
                let numerical = hasNumber(value)
                if(stat && numerical){
                    i = parseInt(i)
                    let oldStat = userData[userId][key]
                    userData[userId][key] = userData[userId][key] + i,
                    shiftPrintout.push(`${key}: ${oldStat} \u00A0\u00A0=>\u00A0\u00A0 ${userData[userId][key]}`)
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
                } else if(value[0] === "dam"){
                    i = i.slice(value[0].length)
                    i = i.slice(1).toLowerCase()
                    if(i==='d4' || i==='d6' || i==='d8' || i==='d10' || i==='d12'){
                        userData[userId][key] = i
                    } else {setErrors.push(moves.damage.error)}
                } else {
                    i = i.slice(value[0].length)
                    i = parseInt(i)
                    if(isNaN(i)){
                        setErrors.push(moves.set.error)
                    } else {
                        userData[userId][key] = i 
                    }
                }
            }
        })
    }
    setErrors = setErrors.toString().split(",").join("\n")
    if(setErrors){return setErrors}
    else{return characterSheet(userMessage, userId, channelId, userNickname, moves, userData)}
}

function damage(userMessage, userId, channelId, userNickname, moves, userData){
    let damDie = userData[userId]['DAM']
    let modDieRoll = [0, 0]
    let modNum = 0
    let damDieRoll = [0, 0]
    let posNeg = ''
    let damError
    switch (damDie){
        case 'd4':
            damDieRoll = roll(1, 4)
            break;
        case 'd6':
            damDieRoll = roll(1, 6)
            break;
        case 'd8':
            damDieRoll = roll(1, 8)
            break;
        case 'd10':
            damDieRoll = roll(1, 10)
            break;
        case 'd12':
            damDieRoll = roll(1, 12)
            break;
        default:
            return moves.damage.error
    }
    userMessage.forEach(i => {
        const xdyregex = /[+-]\d+d\d+/
        const modregex = /[+-]\d+/
        if(xdyregex.test(i)){
        if(i==='+'){posNeg = 'pos'}
        if(i==='-'){posNeg = 'neg'}
        let xdy = i.split('d');
        let num = parseInt(xdy[0]);
        num = Math.abs(num)
        let faces = parseInt(xdy[1]);
        if (num>200){return "Maximum die roll = 200d2000"}
        if (faces>2000){return "Maximum die roll = 200d2000"}
        modDieRoll = roll(num, faces);
        } else if (modregex.test(i)){
        modNum = parseInt(i)
        } else if (!modregex.test(i) && !xdyregex.test(i) && i!=="dam"){damError = "Something went wrong, try that roll again.\nEXAMPLE:\n • !dam\n • !dam +1\n • !dam +1d4\n • !dam +1 +1d4\n(spaces matter)"}

    })
    if(posNeg === 'neg'){modDieRoll[0] = -Math.abs(modDieRoll[0])}
    if(modDieRoll[0]===0){modDieAddon = ''}
        else if(modDieRoll[0] > 0){modDieAddon = ` + *${modDieRoll[0]}*`}
        else if(modDieRoll[0] < 0 ){modDieRollDisp = Math.abs(modDieRoll[0]); modDieAddon = ` - *${modDieRollDisp}*`}

    if(modNum===0){modAddon = ''} 
        else if(modNum > 0){modAddon = ` + *${modNum}*`}
        else if (modNum < 0){modNumDisp = Math.abs(modNum); modAddon = ` - *${modNumDisp}*`}
    let damGrandTotal = damDieRoll[0] + modDieRoll[0] + modNum

    if(damError){return damError}
    else {return `You rolled [ ${damDieRoll[0]}${modDieAddon}${modAddon} ] = ${damGrandTotal} damage!`}
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
    const rollRegex = /^[rR][oO][lL][lL]\+"\d+d\d+(\s*|\s\+(str|dex|con|int|wis|cha|STR|DEX|CON|INT|WIS|CHA))$/
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