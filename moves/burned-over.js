const functions = require('./../functions/burned-over.js');

//text library object
module.exports = moves = {
    menu: {
        key: 'menu',
        text: 'ALL APOCABOT COMMANDS BEGIN WITH PREFIX (default ! ).\n\
ADD SUFFIX ? TO ANY COMMAND FOR MOVE INFO:\n\n\
 - NEWCHARACTER: !newcharacter\n\
 - CHECK YOUR CHARACTER STATS: !character\n\
 - SET CHARACTER STATS: !set\n\
 - SHIFT CHARACTER STATS: !shift\n\
 - ROLL SOME DICE: !roll\n\
 - BASIC MOVES: !basic\n\
 - STANDARD MOVES: !standard\n\
 - SUFFER HARM: !suffer\n\
 - SET APOCABOT PREFIX: !setprefix\n\
 - SET APOCABOT GAME: !setgame',
        method: function(){return this.text}
    },
    basicMoves: {
        key: ['basic', 'basicmoves'],
        text: 'ALL APOCABOT COMMANDS BEGIN WITH PREFIX (default ! ).\n\
ADD SUFFIX ? TO ANY COMMAND FOR MOVE INFO:\n\n\
 - CONFRONT SOMEONE: !confront\n\
 - ACT UNDER FIRE: !act\n\
 - CHARM OR DECEIVE SOMEONE: !charm *or* !deceive\n\
 - DO BATTLE: !battle\n\
 - READ SOMEONE: !read\n\
 - READ A SITUATION: !readsitch\n\
 - OPEN YOUR BRAIN: !open\n\
 - HELP SOMEONE: !helppc *or* !helpnpc\n\
 - INTERRUPT SOMEONE: !intpc *or* !intnpc',
        method: function(){return this.text}
    },
    standardMoves: {
        key: ['standard', 'standardmoves'],
        text: 'ALL APOCABOT COMMANDS BEGIN WITH PREFIX (default ! ).\n\
ADD SUFFIX ? TO ANY COMMAND FOR MOVE INFO:\n\n\
 - AUGURY: !aug\n\
 - DEVOTION: !dev\n\
 - INSIGHT: !sight\n\
 - LEADERSHIP: !lead\n\
 - TINKERING: !tinker\n\
 - WEALTH: !wealth',
        method: function(){return this.text}
    },
    abilities: {
        key: 'abilities',
        stats: {
                NAME: ['name', ''],
                AGGRO: ['aggro', 0],
                COOL: ['cool', 0],
                HARD: ['hard', 0],
                SHARP: ['sharp', 0],
                WEIRD: ['weird', 0],
                EXP: ['exp', '0 / 9'],
                HARM: ['harm', `It's 0 o'clock`]
        }
        },
    newCharacter: {
        key: ['newcharacter'],
        text: 'NEW CHARACTER: !newcharacter\n\
Use this command to create a new blank character or to zero out your character stats.',
        method: functions.newCharacter
    },
    noCharacter: {
       key: ['nocharacter'],
       text: 'Before using ApocaBot MOVES, you must set up a CHARACTER SHEET.\n\
Type __!newcharacter__ to create a blank CHARACTER SHEET, __!set?__ to learn about\
setting your character stats, or __!menu__ to learn more about the different\
moves and commands.',
       method: function(){return this.text}
   },
    characterSheet: {
        key: ['character', 'charactersheet'],
        text: 'CHARACTER SHEET: !character\n\
Enter this command at any time to check on your character stats.',
        method: functions.characterSheet
    },
    set: {
        key: ['set', 'stats', 'setstats', 'statset'],
        text: 'SET STATS: !set stat+value ...\nTo set your character stats,\
 enter the command followed by all the STAT MODIFIERS you want to set. Use the \
 stat type +/- stat value. Unentered stats will default\
 to zero or their existing value.\n\
EXAMPLE: !set name+bambino cool+1 hot-1 ... etc',
        error: 'Incorrect input, use the format: !set name+bambino hard+1 hot-1 etc...',
        method: functions.setStats
    },
    setPrefix: {
       key: ['setprefix', 'prefix'],
       text: 'SET PREFIX: !setprefix newprefix$ ...\nTo set a new bot prefix,\
 enter the command !setprefix followed by __newprefix__ and the non-alphanumerica\
 character you would like to use as a bot prefix.\n\
 EXAMPLE: !setprefix newprefix$ (will change the bot prefix from ! to $)',
       error: 'Incorrect input, use the format: !setprefix newprefix$',
       method: functions.setPrefix
   },
   setGame: {
       key: ['setgame'],
       text: 'SET GAME: !setgame game-name ...\nTo change ApocaBot from the current game\
 to a different PbtA game, enter the command __!setgame__ followed by the name\
 of the PbtA game you\'ll be playing.\n\
EXAMPLE: !setgame apocalypse-world *or* !setgame motw\n\n\
WARNING: Setting a new game will erase all current character sheets and data. If you\'d like\
 to play a different game with ApocaBot and keep all your current data, simply create a new\
 channel or server for your new game and leave this one as is.',
       error: 'Incorrect input: Enter the command !setgame followed by a space and one of the supported games:\n\
 • apocalypse-world\n\
 • burned-over\n\
 • dungeon-world\n\
 • masks\n\
 • motw\n\
 • uncharted-worlds\n\
EXAMPLE: !setgame apocalypse-world\n\n\
WARNING: Setting a new game will erase all current character sheets and data. If you\'d like\
 to play a different game with ApocaBot and keep all your current data, simply create a new\
 channel or server for your new game and leave this one as is.',
       method: functions.setGame
   },
    shift: {
        key: 'shift',
        text: 'SHIFT STATS: !shift stat+/-num...\nTo shift your character stats\
 by a certain amount, enter the command followed by the stats you want to shift\
 and the amount to change them.\n\
EXAMPLE: !shift tough+1 will increase your tough by 1.\
 !shift harm+2 will add 2 segments to your harm clock.',
        error: 'Incorrect input, use the format: !shift hot+1 harm+2 etc...\
 (this only works for numerical values)',
        method: functions.shift
    },
    roll: {
        key: ['roll'],
        text: 'ROLL DICE: !roll xdy +z\n\
Use the format !roll xdy +z where x = number of die, y = faces on die, and z = a positive\
 or negative modifier, a stat, another +/-xdy roll, or any combination.\n\
EXAMPLE: !roll 2d6 +1  OR  !roll 2d6 +sharp OR  !roll 2d6 +1d4  (SPACES MATTER!)',
        error: 'INCORRECT INPUT: Please use the format !roll xdy +z where x = number\
 of die, y = faces on die, and z = positive or negative modifier, if any.\n\
EXAMPLE: !roll 2d6 +1  OR  !roll 2d6 +sharp (SPACES MATTER!)',
        method: functions.xdyRoll
    },
    sufferHarm: {
        key: ['suffer', 'sufferharm'],
        text: 'SUFFER HARM: !suffer\n\
When you suffer harm, roll *minus* the harm you\'ve suffered.',
        get greatSuccess(){return this.success},
        success: 'On a 10+, the MC chooses 1:\n\
 *- The harm you take stands as is, with no additional effect.*\n\
 *- You take -1 harm,* but the MC chooses 1 from the list below:\n\n\
 *- You lose your footing.*\n\
 *- You lose your grip on whatever you\'re holding.*\n\
 *- You lose track of someone or something you\'re attending to.*\n\
 *- You miss noticing something important.*',
        mixed: 'On a 7–9, the MC chooses 1:\n\
 *- You lose your footing.*\n\
 *- You lose your grip on whatever you\'re holding.*\n\
 *- You lose track of someone or something you\'re attending to.*\n\
 *- You miss noticing something important.*',
        fail: 'On a 6-, the MC chooses 1:\n\
 *- You\'re out of action: unconscious, trapped, incoherent, or panicked.*\n\
 *- It\'s worse than it seemed. Take an additional 1-harm.*\n\
 *- Choose 2 from the list below:*\n\n\
 *- You lose your footing.*\n\
 *- You lose your grip on whatever you\'re holding.*\n\
 *- You lose track of someone or something you\'re attending to.*\n\
 *- You miss noticing something important.*',
        stat: 'num',
        method: functions.moveRoll
    },
    confrontSomeone: {
        key: ['confront', 'confrontsomeone'],
        text: 'CONFRONT SOMEONE: !confront\n\
When you confront, intimidate, threaten, or bluff someone.',
        get greatSuccess(){return this.success},
        success: 'On a 10+, they have to choose:\n\
 - *Back down and give you your way.*\n\
 - *Defy you and fight back.*\n\
 - *Submit to your mercy and ask you to reconsider.*',
        mixed: 'On a 7–9, you\'ve left them some wiggle room, and they\
 can try to:\n\
 - *Escape.*\n\
 - *Bargain with you.*\n\
 - *Pass off responsibility.*\n\
 - *Divert you instead.*\n\
You choose whether and how to follow through.',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'aggro',
        method: functions.moveRoll
    },
    actUnderFire: {
        key: ['act', 'actunderfire', 'underfire', 'fire'],
        text: 'ACT UNDER FIRE: !act\n\
When you act under fire, or dig into endure fire.',
        get greatSuccess(){return this.success},
        success: 'On a 10+, you do it.',
        mixed: 'On a 7–9, you flinch, hesitate, or stall, and the MC\
 can offer you a worse outcome, a hard bargain, or an unfortunate choice.',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'cool',
        method: functions.moveRoll
    },
    charmOrDeceiveSomeone: {
        key: ['charm', 'deceive', 'charmordeceive', 'cod', 'charmordeceivesomeone'],
        text: 'CHARM OR DECEIVE SOMEONE: !charm *or* !deceive\n\
When you charm or deceive someone.',
        get greatSuccess(){return this.success},
        success: 'On a 10+, they have to choose:\n\
 - Set skepticism aside and go along with you.\n\
 - Call you a fool or a liar to your face.',
        mixed: 'On a 7–9, if they don\'t want to go along with you or call you out,\
 they can choose to ask you for evidence, time, a compromise, or some concrete\n\
 assurance; they must go along with you if you provide it.',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'cool',
        method: functions.moveRoll
    },
    doBattle: {
        key: ['battle', 'dobattle'],
        text: 'DO BATTLE: !battle\n\
When you do battle with someone, exchange harm, but first roll !battle.',
        get greatSuccess(){return this.success},
        success: 'On a 10+, you hold 4 against your enemy. If a PC, your enemy\
 rolls simultaneously to do battle with you. If an NPC, your enemy holds 2 against you.\n\
 To conduct the battle, spend your hold on the following. Commit to your spends\
 without knowing your enemy\'s.\n\
 - **Fight for blood**: *Spend 1 to inflict +1 harm.*\n\
 - **Fight defensively**: *Spend 1 to suffer -1 harm.*\n\
 - **Fight opportunistically**: *Spend 1 to inflict harm on an additional enemy.*\n\
 - **Guard someone**: *Spend 1 to protect an ally from 1-harm.*\n\
 - **Seize initiative**: *Whoever spends more to seize initiative, does.*\n\n\
If you seize initiative, you get any or all of these, as applicable:\n\
 - **Take +1 hold against your enemy into the next round**, *if the battle continues.*\n\
 - Ask 1 **Read a situation** *question for free, with no roll. (?read)*\n\
 - **Take a quick action** *of any kind, for free, while your enemy is off balance.*',
        mixed: 'On a 7–9, you hold 3 against your enemy. If a PC, your enemy\
 rolls simultaneously to do battle with you. If an NPC, your enemy holds 2 against you.\n\
 To conduct the battle, spend your hold on the following. Commit to your spends\
 without knowing your enemy\'s.\n\
 - **Fight for blood**: *Spend 1 to inflict +1 harm.*\n\
 - **Fight defensively**: *Spend 1 to suffer -1 harm.*\n\
 - **Fight opportunistically**: *Spend 1 to inflict harm on an additional enemy.*\n\
 - **Guard someone**: *Spend 1 to protect an ally from 1-harm.*\n\
 - **Seize initiative**: *Whoever spends more to seize initiative, does.*\n\n\
If you seize initiative, you get any or all of these, as applicable:\n\
 - **Take +1 hold against your enemy into the next round**, *if the battle continues.*\n\
 - Ask 1 **Read a situation** *question for free, with no roll. (?read)*\n\
 - **Take a quick action** *of any kind, for free, while your enemy is off balance.*',
        fail: 'On a 6-, you hold 1 against your enemy. If a PC, your enemy\
 rolls simultaneously to do battle with you. If an NPC, your enemy holds 3 against you.\n\
 To conduct the battle, spend your hold on the following. Commit to your spends\
 without knowing your enemy\'s.\n\
 - **Fight for blood**: *Spend 1 to inflict +1 harm.*\n\
 - **Fight defensively**: *Spend 1 to suffer -1 harm.*\n\
 - **Fight opportunistically**: *Spend 1 to inflict harm on an additional enemy.*\n\
 - **Guard someone**: *Spend 1 to protect an ally from 1-harm.*\n\
 - **Seize initiative**: *Whoever spends more to seize initiative, does.*\n\n\
If you seize initiative, you get any or all of these, as applicable:\n\
 - **Take +1 hold against your enemy into the next round**, *if the battle continues.*\n\
 - Ask 1 **Read a situation** *question for free, with no roll. (?readsitch)*\n\
 - **Take a quick action** *of any kind, for free, while your enemy is off balance.*',
        stat: 'hard',
        method: functions.moveRoll
    },
    readSomeone: {
        key: ['read', 'readsomeone', 'readperson'],
        text: 'READ SOMEONE: !read\n\
When you read someone in a charged interaction, ask:\n\
 *- Are you telling the truth?*\n\
 *- What are you feeling?*\n\
 *- What are you thinking of doing?*\n\
 *- What do you hope I\'ll do?*\n\
 *- How could I get you to do ______?*',
        get greatSuccess(){return this.success},
        success: 'On a 10+, hold 3 against them. During your interaction,\
 spend your hold 1 for 1 to ask the MC or their player questions. They have\
 to answer frankly, from their character\'s point of view.\n\
 *- Are you telling the truth?*\n\
 *- What are you feeling?*\n\
 *- What are you thinking of doing?*\n\
 *- What do you hope I\'ll do?*\n\
 *- How could I get you to do ______?*',
        mixed: 'On a 7–9, hold 2 against them. During your interaction,\
 spend your hold 1 for 1 to ask the MC or their player questions. They have\
 to answer frankly, from their character\'s point of view.\n\
 *- Are you telling the truth?*\n\
 *- What are you feeling?*\n\
 *- What are you thinking of doing?*\n\
 *- What do you hope I\'ll do?*\n\
 *- How could I get you to do ______?*',
        fail: 'On a 6-, the MC might have you ask 1 question anyway,\
 but be prepared for the worst.\n\
 *- Are you telling the truth?*\n\
 *- What are you feeling?*\n\
 *- What are you thinking of doing?*\n\
 *- What do you hope I\'ll do?*\n\
 *- How could I get you to do ______?*',
        stat: 'sharp',
        method: functions.moveRoll
    },
    readASituation: {
        key: ['readsitch', 'readasitch', 'readasituation'],
        text: 'READ A SITUATION: !readsitch\n\
When you read a charged situation, ask:\n\
 *- Who\'s in control here?*\n\
 *- What\'s my best way in / out / around / through?*\n\
 *- Who or what poses the biggest threat to me?*\n\
 *- Who or what represents the best opportunity for me to do ______?*\n\
 *- What should I be on the lookout for?*',
        get greatSuccess(){return this.success},
        success: 'On a 10+, ask the MC 3 questions right now. They have\
 to answer frankly, and when you\'re acting on their answers, take +1 to\
 any rolls you make.\n\
 *- Who\'s in control here?*\n\
 *- What\'s my best way in / out / around / through?*\n\
 *- Who or what poses the biggest threat to me?*\n\
 *- Who or what represents the best opportunity for me to do ______?*\n\
 *- What should I be on the lookout for?*',
        mixed: 'On a 7–9, ask the MC 1 question right now. They have\
 to answer frankly, and when you\'re acting on their answers, take +1 to\
 any rolls you make.\n\
 *- Who\'s in control here?*\n\
 *- What\'s my best way in / out / around / through?*\n\
 *- Who or what poses the biggest threat to me?*\n\
 *- Who or what represents the best opportunity for me to do ______?*\n\
 *- What should I be on the lookout for?*',
        fail: 'On a 6-, the MC might have you ask 1 question anyway,\
 but be prepared for the worst.\n\
 *- Who\'s in control here?*\n\
 *- What\'s my best way in / out / around / through?*\n\
 *- Who or what poses the biggest threat to me?*\n\
 *- Who or what represents the best opportunity for me to do ______?*\n\
 *- What should I be on the lookout for?*',
        stat: 'sharp',
        method: functions.moveRoll
    },
    openYourBrain: {
        key: ['open', 'openbrain', 'openyourbrain', 'brain'],
        text: 'OPEN YOUR BRAIN: !open\n\
When you open your brain to the world\'s psychic maelstrom.',
        get greatSuccess(){return this.success},
        success: 'On a 10+, the MC will tell you something new and\
 interesting about the current situation. They must give you at least\
 one good, concrete detail. They may ask you a question or 2: answer\
 them frankly. If you already know everything there is to know about the\
 situation, the MC must tell you so.',
        mixed: 'On a 7–9, the MC will tell you something new and\
 interesting about the current situation. They can stick to\
 impressions and suggestions. They may ask you a question or 2: answer\
 them frankly. If you already know everything there is to know about the\
 situation, the MC must tell you so.',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'weird',
        method: functions.moveRoll
    },
    helpPc: {
        key: ['helppc'],
        text: 'HELP SOMEONE: !helppc *or* !helpnpc\n\
To help someone, ask their player what you can do to help.',
        get greatSuccess(){return this.success},
        success: 'On a 10+, they get +1 Hx with you on their sheet,\
 and the MC chooses the most suitable:\n\
 - *They weren\'t able to make the attempt, but now they are.*\n\
 - *They get +1 to their roll, +1 hold, +1 choice, +1 harm, suffer\
 -1 harm, or another suitable bonus.*\n\
 - *You both roll for it, and the better roll stands.*',
        mixed: 'On a 7–9, the MC chooses the most suitable:\n\
 - *They weren\'t able to make the attempt, but now they are.*\n\
 - *They get +1 to their roll, +1 hold, +1 choice, +1 harm, suffer\
 -1 harm, or another suitable bonus.*\n\
 - *You both roll for it, and the better roll stands.*',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'num',
        method: functions.moveRoll
    },
    helpNpc: {
        key: ['helpnpc'],
        text: 'HELP SOMEONE: !helppc *or* !helpnpc\n\
To help someone, ask their player what you can do to help.',
        get greatSuccess(){return this.success},
        success: 'On a 10+, The MC chooses the most suitable:\n\
 - *They weren\'t able to make the attempt, but now they are.*\n\
 - *They get +1 to their roll, +1 hold, +1 choice, +1 harm, suffer\
 -1 harm, or another suitable bonus.*\n\
 - *You both roll for it, and the better roll stands.*',
        mixed: 'On a 7–9, the MC chooses the most suitable:\n\
 - *They weren\'t able to make the attempt, but now they are.*\n\
 - *They get +1 to their roll, +1 hold, +1 choice, +1 harm, suffer\
 -1 harm, or another suitable bonus.*\n\
 - *You both roll for it, and the better roll stands.*',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'sharp',
        method: functions.moveRoll
    },
    interruptPc: {
        key: ['intpc', 'interpc', 'interruptpc'],
        text: 'INTERUPT SOMEONE: !intpc *or* !intnpc\n\
To interrupt someone. *(You can\'t interrupt someone who\'s interrupting you.)*',
        get greatSuccess(){return this.success},
        success: 'On a 10+, you take +1 forward against them,\
 and the MC chooses the most suitable:\n\
 - *You\'re there first.*\n\
 - *You\'re in their way.*\n\
 - *You\'re ready for it.*\n\
...And they have to deal with you instead of doing what they intended.',
        mixed: 'On a 7–9, the MC chooses the most suitable:\n\
 - *You\'re there first.*\n\
 - *You\'re in their way.*\n\
 - *You\'re ready for it.*\n\
...And they have to deal with you instead of doing what they intended.',
        fail: 'On a 6-, you still interrupt them, but the MC\
 chooses the most suitable:\n\
 - *They see what\'s happening and can change course smoothly.*\n\
 - *They take +1 forward against you.*',
        stat: 'num',
        method: functions.moveRoll
    },
    interruptNpc: {
        key: ['intnpc', 'internpc', 'interruptnpc'],
        text: 'INTERUPT SOMEONE: !intpc *or* !intnpc\n\
To interrupt someone. *(You can\'t interrupt someone who\'s interrupting you.)*',
        get greatSuccess(){return this.success},
        success: 'On a 10+, you take +1 forward against them,\
 and the MC chooses the most suitable:\n\
 - *You\'re there first.*\n\
 - *You\'re in their way.*\n\
 - *You\'re ready for it.*\n\
...And they have to deal with you instead of doing what they intended.',
        mixed: 'On a 7–9, the MC chooses the most suitable:\n\
 - *You\'re there first.*\n\
 - *You\'re in their way.*\n\
 - *You\'re ready for it.*\n\
...And they have to deal with you instead of doing what they intended.',
        fail: 'On a 6-, you still interrupt them, but the MC\
 chooses the most suitable:\n\
 - *They see what\'s happening and can change course smoothly.*\n\
 - *They take +1 forward against you.*',
        stat: 'cool',
        method: functions.moveRoll
    },
    augury: {
        key: ['aug', 'augury'],
        text: 'AUGURY: !augury\n\
When you use your psychic antenna for augury.',
        get greatSuccess(){return this.success},
        success: 'On a 10+, choose 1:\n\
 *- You can reach through the world’s psychic maelstrom to something or someone connected to it.*\n\
 *- You can isolate and protect a person or thing from the world’s psychic maelstrom.*\n\
 *- You can extract and contain a fragment of the world’s psychic maelstrom itself.*\n\
 *- You can open a window or door into the world’s psychic maelstrom.*\n\n\
By default, the effect lasts only as long as you maintain it, reaches only\
 shallowly into the world’s psychic maelstrom as it is local to you, and bleeds\
 instability. On a 10+, choose 2 of the following:\n\
 *- It persists for a while without your actively maintaining it.*\n\
 *- It reaches deep into the world’s psychic maelstrom.*\n\
 *- It reaches broadly, maybe universally, throughout the world’s psychic maelstrom.*\n\
 *- It’s stable and contained, no bleeding.',
        mixed: 'On a 7–9, choose 1:\n\
 *- You can reach through the world’s psychic maelstrom to something or someone connected to it.*\n\
 *- You can isolate and protect a person or thing from the world’s psychic maelstrom.*\n\
 *- You can extract and contain a fragment of the world’s psychic maelstrom itself.*\n\
 *- You can open a window or door into the world’s psychic maelstrom.*\n\n\
By default, the effect lasts only as long as you maintain it, reaches only\
 shallowly into the world’s psychic maelstrom as it is local to you, and bleeds\
 instability. On a 7-9, choose 1 of the following:\n\
 *- It persists for a while without your actively maintaining it.*\n\
 *- It reaches deep into the world’s psychic maelstrom.*\n\
 *- It reaches broadly, maybe universally, throughout the world’s psychic maelstrom.*\n\
 *- It’s stable and contained, no bleeding.',
        fail: 'On a 6-, whatever bad happens, your psychic antenna takes the brunt of it.',
        stat: 'weird',
        method: functions.moveRoll
    },
    devotion: {
        key: ['dev', 'devotion'],
        text: 'DEVOTION: !dev\n\
At the beginning of the session, if your followers are secure and stable, roll !dev.\
 If you have more than 1 group of followers, roll separately for each of them.',
        get greatSuccess(){return this.success},
        success: 'On a 10+, during the session, your followers offer you all of their devotions.',
        mixed: 'On a 7–9, they offer you all of their devotions, but choose 1 demand.',
        fail: 'On a 6-, or if your followers are in crisis, choose all of their demands.',
        stat: 'cool',
        method: functions.moveRoll
    },
    insight: {
        key: ['ins', 'insight'],
        text: 'INSIGHT: !insight\n\
When you go to your advisors for insight, ask them what they think your best course is,\
 and the MC will tell you. If you pursue that course, take +1 to any rolls you make in\
 the pursuit. If you pursue that course but don’t accomplish your ends, you mark 1 toward Improvement.',
        method: function(){return this.text}
    },
    leadership: {
        key: ['lead', 'leadership'],
        text: 'LEADERSHIP: !lead\n\
When you have to order your gang to advance, regroup, hold position, or put their backs into it.',
        get greatSuccess(){return this.success},
        success: 'On a 10+, they snap to, and you take +1 forward into whatever\
 you’re having them do.',
        mixed: 'On a 7–9, they do it.',
        fail: 'On a 6-, they do it, but you’ll hear about it later.',
        stat: 'hard',
        method: functions.moveRoll
    },
    tinkering: {
        key: ['tinker', 'tinkering'],
        text: 'TINKERING: !tinker\n\
When you go into your workspace to create something, repair something,\
 solve a problem, or get to the bottom of something, tell the MC about\
 it and ask if it’s possible. The MC will tell you “sure, no problem,\
 but...” and then 1 to 4 of the following:\n\
 *- It’s going to take hours/days/weeks/months of work.*\n\
 *- First you’ll have to get/make/fix/figure out [x].*\n\
 *- You’re going to need [x] to help you with it.*\n\
 *- It’s going to cost a ton of jingle.*\n\
 *- The best you’ll be able to do is not great, it’ll be poor, slow, weak or unreliable.*\n\
 *- It’s going to mean exposing yourself or others to serious danger.*\n\
 *- You’re going to have to add [x] to your workspace first.*\n\
 *- It’s going to take you several/dozens/hundreds of tries.*\n\
 *- You’re going to have to take [x] apart to do it.*\n\n\
The MC might connect them all with “and,” or might throw in a merciful “or.”\n\
Once you’ve accomplished the necessaries, you can go ahead and accomplish your project..',
        method: function(){return this.text}
    },
    wealth: {
        key: 'wealth',
        text: 'WEALTH: !wealth\n\
At the beginning of the session, if your holding or venue is secure and stable, roll !wealth.',
        get greatSuccess(){return this.success},
        success: 'On a 10+, during the session, your holding or venue has all of its surpluses.',
        mixed: 'On a 7–9, your holding or venue has all of its surpluses, but choose 1 want.',
        fail: 'On a 6-, or if your holding or venue is in crisis, choose all of its wants.',
        stat: 'hard',
        method: functions.moveRoll
    },
}

