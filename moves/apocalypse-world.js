const functions = require('./../functions/apocalypse-world.js');

//text library object
module.exports = moves = {
    menu: {
        key: ['help', 'menu'],
        text: 'ALL APOCABOT COMMANDS BEGIN WITH PREFIX (default ! ).\n\
ADD SUFFIX ? TO ANY COMMAND FOR MOVE INFO:\n\n\
 - NEWCHARACTER: !newcharacter\n\
 - CHECK YOUR CHARACTER STATS: !character\n\
 - SET CHARACTER STATS: !set\n\
 - SHIFT CHARACTER STATS: !shift\n\
 - ROLL SOME DICE: !roll\n\
 - SET APOCABOT PREFIX: !setprefix\n\
 - SET APOCABOT GAME: !setgame\n\
 - DO SOMETHING UNDER FIRE: !underfire\n\
 - GO AGGRO: !aggro\n\
 - SEDUCE OR MANIPULATE: !seduce *or* !manipulate\n\
 - HELP OR INTERFERE: !help *or* !interfere\n\
 - READ A SITCH: !readsitch\n\
 - READ A PERSON: !readperson\n\
 - OPEN YOUR BRAIN: !open\n\
 - END SESSION: !endsession',
        method: function(){return this.text}
    },
    abilities: {
        key: 'abilities',
        stats: {
                NAME: ['name', ''],
                COOL: ['cool', 0],
                HARD: ['hard', 0],
                HOT: ['hot', 0],
                SHARP: ['sharp', 0],
                WEIRD: ['weird', 0],
                EXP: ['exp', '0 / 5'],
                HARM: ['harm', `It's 0 o'clock`]
        }
        },
    newCharacter: {
        key: ['new', 'newcharacter'],
        text: 'NEW CHARACTER: !newcharacter\n\
Use this command to create a new blank character or to zero out your character stats.',
        method: functions.newCharacter
    },
    noCharacter: {
       key: ['nocharacter'],
       text: 'Before using ApocaBot MOVES, you must set up a CHARACTER SHEET.\n\
Type __!newcharacter__ to create a blank CHARACTER SHEET, __?set__ to learn about\
setting your character stats, or __?menu__ to learn more about the different\
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
        error: 'Incorrect input, use the format: !set name+bambino cool+1 hard-1 etc...',
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
 or negative modifier, a stat, another +xdy, or any combination.\n\
EXAMPLE: !roll 2d6 +1  OR  !roll 2d6 +sharp  OR !roll 2d6 +1d4 (SPACES MATTER!)',
        error: 'INCORRECT INPUT: Please use the format !roll xdy +z where x = number\
 of die, y = faces on die, and z = positive or negative modifier, if any.\n\
EXAMPLE: !roll 2d6 +1  OR  !roll 2d6 +sharp (SPACES MATTER!)',
        method: functions.xdyRoll
    },
    doSomethingUnderFire: {
        key: ['do', 'dosomething', 'dosomethingunderfire', 'underfire', 'fire'],
        text: 'DO SOMETHING UNDER FIRE: !underfire\n\
When you do something under fire, or dig in to endure fire.',
        greatSuccess: 'On a 12+, you transcend the danger, the pressure,\
 the possibility of harm. You do what you set out to do, and the MC will\
 offer you a better outcome, true beauty, or a moment of grace.',
        success: 'On a 10+, you do it.',
        mixed: 'On a 7–9, you flinch, hesitate, or stall:\
 the MC can offer you a worse outcome, a hard bargain, or an ugly choice.',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'cool',
        method: functions.moveRoll
    },
    goAggro: {
        key: ['goaggro', 'go', 'aggro'],
        text: 'GO AGGRO: !aggro\n\
When you go aggro on someone.',
        greatSuccess: 'On a 12+, your opponent has to cave and do what\n\
 you want. You\'ve overwhelmed them; they can\'t possibly bring\
 themselves to force your hand.',
        success: 'On a 10+, your opponent can either:\n\
 *- Force your hand and suck it up.*\n\
 *- Cave and do what you want.*',
        mixed: 'On a 7–9, your opponent can choose one of the following:\n\
 *- Force your hand and suck it up.*\n\
 *- Cave and do what you want.*\n\
 *- Get the hell out of your way.*\n\
 *- Barricade themselves securely in.*\n\
 *- Give you something they think you want, or tell you what you want to hear.*\n\
 *- Back off calmly, hands where you can see.*',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'hard',
        method: functions.moveRoll
    },
    seduceOrManipulate: {
        key: ['seduce', 'manipulate', 'seduceormanipulate'],
        text: 'SEDUCE OR MANIPULATE: !seduce *or* !manipulate\n\
When you try to seduce, manipulate, bluff, fast-talk, or lie to someone,\
 tell them what you want them to do, give them a reason.',
        greatSuccess: 'On a 12+, only if they\'re an NPC, they do it,\
 and furthermore you change their nature. Choose one of the following;\
 tell the MC to erase their threat type altgether and write it in instead.\n\
 *- **ally: friend** (impulse: to back you up)*\n\
 *- **ally: lover** (impulse: to give you shelter & comfort)*\n\
 *- **ally: right hand** (impulse: to follow through on your intentions)*\n\
 *- **ally: representative** (impulse: to pursue your interests\
 in your absence)*\n\
 *- **ally: guardian** (impulse: to intercept danger)*\n\
 *- **ally: confidante** (impulse: to give you advice, perspective, or absolution)*',
        success: 'On a 10+,\n\
 - For NPCs: they\'ll go along with you, unless or until some fact\
 or action betrays the reason you gave them.\n\
 - For PCs ***both***: If they go along with you, they mark experience, **and***\
 if they refuse, erase one of their stat highlights for the\
 remainder of the session. What they do then is up to them.',
        mixed: 'On a 7–9,\n\
 - For NPCs: they\'ll go along with you, but they need some\
 concrete assurance, corroboration, or evidence first.\n\
 - For PCs ***either***: If they go along with you, they mark experience,\
  **or*** if they refuse, erase one of their stat highlights for the\
 remainder of the session. What they do then is up to them.',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'hot',
        method: functions.moveRoll
    },
    helpOrInterfere: {
        key: ['help', 'interfere', 'helporinterfere'],
        text: 'HELP OR INTERFERE: !help *or* !interfere\n\
When you help or interfere with someone who\'s making a roll.',
        greatSuccess: 'On a 10+, they take +2(help) or -2(interfere)\
 to their roll.',
        success: 'On a 10+, they take +2(help) or -2(interfere)\
 to their roll.',
        mixed: 'On a 7–9, they take +1(help) or -1(interfere)\
 to their roll.',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'num',
        method: functions.moveRoll
    },
    readASitch: {
        key: ['readsitch', 'readasitch', 'sitch'],
        text: 'READ A SITCH: !readsitch\n\
When you read a charged situation.',
        greatSuccess: 'On a 12+, you can ask the MC any 3 questions.\
 Whenever you act on one of the MC\'s answers, take +1.',
        success: 'On a 10+, ask 3 questions from the list below.\
 Whenever you act on one of the MC\'s answers, take +1.\n\
 *- Where\'s my best escape route / way in / way past?*\n\
 *- Which enemy is the most vulnerable to me?*\n\
 *- Which enemy is the biggest threat?*\n\
 *- What should I be on the lookout for?*\n\
 *- What\'s my enemy\'s true position?*\n\
 *- Who\'s in control here?*',
        mixed: 'On a 7–9, ask 1 question from the list below.\
 Whenever you act on one of the MC\'s answer, take +1.\n\
 *- Where\'s my best escape route / way in / way past?*\n\
 *- Which enemy is the most vulnerable to me?*\n\
 *- Which enemy is the biggest threat?*\n\
 *- What should I be on the lookout for?*\n\
 *- What\'s my enemy\'s true position?*\n\
 *- Who\'s in control here?*',
        fail: 'On a 6-, ask 1 question from the list below,\
 but be prepared for the worst.\n\
 *- Where\'s my best escape route / way in / way past?*\n\
 *- Which enemy is the most vulnerable to me?*\n\
 *- Which enemy is the biggest threat?*\n\
 *- What should I be on the lookout for?*\n\
 *- What\'s my enemy\'s true position?*\n\
 *- Who\'s in control here?*',
        stat: 'sharp',
        method: functions.moveRoll
    },
    readAPerson: {
        key: ['readperson', 'readaperson', 'person'],
        text: 'READ A PERSON: !readperson\n\
When you read a person in a charged interaction.',
        greatSuccess: 'On a 12+, hold 3. While you\'re interacting\
 with them, you may spent your hold to ask their player any questions,\
 1 for 1.',
        success: 'On a 10+, hold 3. While you\'re interacting\
 with them, you may spent your hold to ask their player any of\
 the following questions, 1 for 1:\n\
 *- Is your character telling the truth?*\n\
 *- What\'s your character really feeling?*\n\
 *- What does your character intend to do?*\n\
 *- What does your character wish I\'d do?*\n\
 *- How could I get your character to -- ?*',
        mixed: 'On a 7–9, hold 1. While you\'re interacting\
 with them, you may spent your hold to ask their player any of\
 the following questions, 1 for 1:\n\
 *- Is your character telling the truth?*\n\
 *- What\'s your character really feeling?*\n\
 *- What does your character intend to do?*\n\
 *- What does your character wish I\'d do?*\n\
 *- How could I get your character to -- ?*',
        fail: 'On a 6-, hold 1. While you\'re interacting\
 with them, you may spent your hold to ask their player any of\
 the following questions, 1 for 1, but be prepared for the worst:\n\
 *- Is your character telling the truth?*\n\
 *- What\'s your character really feeling?*\n\
 *- What does your character intend to do?*\n\
 *- What does your character wish I\'d do?*\n\
 *- How could I get your character to -- ?*',
        stat: 'sharp',
        method: functions.moveRoll
    },
    openYourBrain: {
        key: ['open', 'openbrain', 'openyourbrain', 'brain'],
        text: 'OPEN YOUR BRAIN: !open\n\
When you open your brain to the world\'s psychic maelstrom.',
        greatSuccess: 'On a 12+, you reach through the world\'s\
 psychic maelstrom to what\'s beyond.',
        success: 'On a 10+, the MC tells you something new and\
 interesting about the current situation in good detail,\
 and might ask you a question or two. If you already know\
 all there is to know, the MC will tell you that.',
        mixed: 'On a 7–9, the MC give you an impression of\
 something new and interesting about the current situation,\
 and might ask you a question or two. If you already know\
 all there is to know, the MC will tell you that.',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'weird',
        method: functions.moveRoll
    },
    endSession: {
       key: ['session', 'endsession', 'sessionend'],
       text: 'At the end of every session, choose a character\
 who knows you better than they used to. If there’s more than one, choose\
 one at your whim. Tell that player to **add +1 to their Hx with you** on their\
 sheet. If this brings them to **Hx+4**, they **reset to Hx+1 (and therefore\
 mark experience)**. If no one knows you better, choose a character who doesn’t\
 know you as well as they thought, or choose any character at your whim.\
 Tell that player to **take -1 to their Hx with you** on their sheet. If this\
 brings them to **Hx -3, they reset to Hx=0 (and therefore mark experience)**.',
       method: function(){return this.text}
   },
}