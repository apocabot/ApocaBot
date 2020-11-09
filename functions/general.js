let storage
require('../mungu.js').then(s => storage = s)

module.exports = {gear, notes, capitalize}

function gear(userMessage, userId, channelId, userNickname, moves, userData){
    let noGear = 'You have no Gear.\n\nEnter !gear? to learn how to add items to your Gear List.'
    if(!userMessage[1] || !userMessage[2]){
         if(!userData[userId]['GEAR']){return noGear}
         else {
             let gearPrintout = ['Here is your Gear:'];
            for(let [i, phrase] of Object.entries(userData[userId]['GEAR'])){
                gearPrintout.push(`${parseInt(i)+1}) ${capitalize(phrase)}`)
            }
             return gearPrintout
         }
        }

    if (userMessage[1] === ("add" || "Add" || "ADD" || "+")) {
        let person = userData[userId]
        if (!person['GEAR']) { person['GEAR'] = [] }
        phrase = userMessage.slice(2).join(" ")

        userData[userId]['GEAR'].push(phrase)
        return `Added item: ${capitalize(phrase)}`

    } else if (userMessage[1] === ("remove" || "Remove" || "REMOVE" || "-")) {
        index = parseInt(userMessage[2]) - 1
        if (isNaN(index)) { return moves.gear.text }
        
        let person = userData[userId]
        if (!person['GEAR']) {return noGear}
        if (person['GEAR'].length == 0) {return noGear}
        if (index > person['GEAR'].length - 1 || index < 0) { return `ERROR: Invalid number selected. Pick a number from 1-${person['GEAR'].length}`}
        
        phrase = userData[userId]['GEAR'][index]
        userData[userId]['GEAR'].splice(index,1)
        return `Removed item: ${capitalize(phrase)}.`

    }   else if (userMessage[1] === ("clear" || "Clear" || "CLEAR") && userMessage[2] === ("all" || "All" || "ALL")){
            if(!userData[userId]['GEAR']){return noGear}
            delete userData[userId]['GEAR']
            return 'Removed all items from your Gear.'
    }   
        else if (userMessage[1] === ("move" || "Move" || "MOVE")){
            if(!userData[userId]['GEAR']){return noGear}
            if(!userMessage[2] && !userMessage[3])return moves.gear.text
            let indexOne; let phraseOne; let indexTwo;
            for(let [i, phrase] of Object.entries(userData[userId]['GEAR'])){
                if(parseInt(userMessage[2]) === (parseInt(i)+1)){indexOne = i, phraseOne = phrase}
                if(parseInt(userMessage[3]) === (parseInt(i)+1)){indexTwo = i}
            }
            if(!indexOne || !indexTwo){return 'INVALID NUMBER SELECTED.\nEnter __!gear move__ followed by two numbers:\n\
 • First, the index number of the item you want to move\n\
 • Second, the index number where you want the item to go\n\n\
EXAMPLE: __!gear move 4 1__ will move the item in slot 4 into slot 1. All other items will shift to accomodate.'}
            userData[userId]['GEAR'].splice(parseInt(indexOne), 1)
            userData[userId]['GEAR'].splice(parseInt(indexTwo), 0, phraseOne)
            return `You moved the item in slot ${parseInt(indexOne) + 1}) into slot ${parseInt(indexTwo) + 1}).\n\nView your gear list with !gear`
        } 
        else if (userMessage[1] === ("edit" || "Edit" || "EDIT")){
            if(!userData[userId]['GEAR']){return noGear}
            if(!userMessage[2] && !userMessage[3])return moves.gear.text
            let indexEdit
            let phrase = userMessage.slice(3).join(" ")
            for(let [i, phrase] of Object.entries(userData[userId]['GEAR'])){
                if(parseInt(userMessage[2]) === (parseInt(i)+1)){indexEdit = i}
            }
            if (!indexEdit) return moves.gear.text
            userData[userId]['GEAR'][indexEdit] = phrase
            return `Edited item in gear list:\n\n${parseInt(indexEdit) + 1}) ${capitalize(userData[userId]['GEAR'][indexEdit])}`
        }
        else {
            return moves.gear.text
    }
}

function notes(userMessage, userId, channelId, userNickname, moves, userData){
    let noNotes = 'You have no Notes.\n\nEnter !notes? to learn how to add Notes to your list.'
    if(!userMessage[1] || !userMessage[2]){
         if(!userData[userId]['NOTES']){return noNotes}
         else {
             let notesPrintout = ['Here are your Notes:'];
            for(let [i, phrase] of Object.entries(userData[userId]['NOTES'])){
                notesPrintout.push(`${parseInt(i)+1}) ${capitalize(phrase)}`)
            }
             return notesPrintout
         }
        }

    if (userMessage[1] === ("add" || "Add" || "ADD" || "+")) {
        let person = userData[userId]
        if (!person['NOTES']) { person['NOTES'] = [] }
        phrase = userMessage.slice(2).join(" ")

        userData[userId]['NOTES'].push(phrase)
        return `Added note: ${capitalize(phrase)}`

    } else if (userMessage[1] === ("remove" || "Remove" || "REMOVE" || "-")) {
        index = parseInt(userMessage[2]) - 1
        if (isNaN(index)) { return moves.notes.text }
        
        let person = userData[userId]
        if (!person['NOTES']) {return noNotes}
        if (person['NOTES'].length == 0) {return noNotes}
        if (index > person['NOTES'].length - 1 || index < 0) { return `ERROR: Invalid number selected. Pick a number from 1-${person['NOTES'].length}`}
        
        phrase = userData[userId]['NOTES'][index]
        userData[userId]['NOTES'].splice(index,1)
        return `Removed note: ${capitalize(phrase)}.`

    }   else if (userMessage[1] === ("clear" || "Clear" || "CLEAR") && userMessage[2] === ("all" || "All" || "ALL")){
            if(!userData[userId]['NOTES']){return noNotes}
            delete userData[userId]['NOTES']
            return 'Removed all Notes from your list.'
    }   
        else if (userMessage[1] === ("move" || "Move" || "MOVE")){
            if(!userData[userId]['NOTES']){return noNotes}
            if(!userMessage[2] && !userMessage[3])return moves.notes.text
            let indexOne; let phraseOne; let indexTwo; let phraseTwo
            for(let [i, phrase] of Object.entries(userData[userId]['NOTES'])){
                if(parseInt(userMessage[2]) === (parseInt(i)+1)){indexOne = i, phraseOne = phrase}
                if(parseInt(userMessage[3]) === (parseInt(i)+1)){indexTwo = i}
            }
            if(!indexOne || !indexTwo){return 'INVALID NUMBER SELECTED.\nEnter __!notes move__ followed by two numbers:\n\
 • First, the index number of the item you want to move\n\
 • Second, the index number where you want the item to go\n\n\
EXAMPLE: __!notes move 4 1__ will move the note in slot 4 into slot 1. All other notes will shift to accomodate.'}            userData[userId]['NOTES'][indexOne] = phraseTwo
            userData[userId]['NOTES'].splice(parseInt(indexOne), 1)
            userData[userId]['NOTES'].splice(parseInt(indexTwo), 0, phraseOne)
            return `You moved the note in slot ${parseInt(indexOne) + 1}) into slot ${parseInt(indexTwo) + 1}).\n\nView your Notes list with !notes`
        } 
        else if (userMessage[1] === ("edit" || "Edit" || "EDIT")){
            if(!userData[userId]['NOTES']){return noNotes}
            if(!userMessage[2] && !userMessage[3])return moves.notes.text
            let indexEdit
            let phrase = userMessage.slice(3).join(" ")
            console.log(phrase)
            for(let [i, phrase] of Object.entries(userData[userId]['NOTES'])){
                if(parseInt(userMessage[2]) === (parseInt(i)+1)){indexEdit = i}
            }
            if (!indexEdit) return moves.notes.text
            userData[userId]['NOTES'][indexEdit] = phrase
            return `Edited note in list:\n\n${parseInt(indexEdit) + 1}) ${capitalize(userData[userId]['NOTES'][indexEdit])}`
        }
        else {
            return moves.notes.text
    }
}

function capitalize(phrase) {
    return phrase.charAt(0).toUpperCase() + phrase.slice(1)
}