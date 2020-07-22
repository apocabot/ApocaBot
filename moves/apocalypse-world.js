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
 - BASIC MOVES LIST: !basic\n\
 - OTHER MOVES LIST: !other\n\
 - CUSTOM MOVES: !custom\n\
 - HX LIST: !hx\n\
 - SET APOCABOT PREFIX: !setprefix\n\
 - SET APOCABOT GAME: !setgame',
        method: function(){return this.text}
    },
    basicMoves: {
       key: ['basic', 'basicmoves'],
       text: 'BASIC MOVES LIST:\n\n\
 - ACT UNDER FIRE: !act\n\
 - GO AGGRO: !aggro\n\
 - SEDUCE OR MANIPULATE: !seduce *or* !manipulate\n\
 - HELP OR INTERFERE: !hoi\n\
 - READ A SITCH: !readsitch\n\
 - READ A PERSON: !readperson\n\
 - OPEN YOUR BRAIN: !open\n\
 - END SESSION: !endsession',
       method: function(){return this.text}
   },
   otherMoves: {
       key: ['other', 'othermoves'],
       text: 'PERIPHERAL AND BATTLE MOVES LIST:\n\n\
 - SUFFER HARM: !suffer\n\
 - SHOP AT MARKET: !market\n\
 - DROP JINGLE: !jingle\n\
 - INSIGHT: !insight\n\
 - AUGURY: !augury\n\
 - SEIZE BY FORCE: !seize\n\
 - SINGLE COMBAT: !single\n\
 - LAY DOWN FIRE: !lay\n\
 - STAND OVERWATCH: !watch\n\
 - KEEP AN EYE OUT: !eye\n\
 - BAIT A TRAP: !bait\n\
 - HUNT PREY: !hunt\n\
 - ESCAPE A HUNTER: !escape\n\
 - TURN THE TABLES: !turn',
       method: function(){return this.text}
   },
   customMenu: {
       key: ['custom', 'custommoves'],
       text: 'CUSTOM MOVE COMMANDS:\n\n\
 - USE CUSTOM MOVE: !move\n\
 - CREATE NEW CUSTOM MOVE: !newmove\n\
 - DELETE CUSTOM MOVE: !deletemove\n\
 - CUSTOM MOVE LIST: !customlist\n\n\
Please consider supporting ApocaBot at patreon.com/apocabot to receive\
 update news, formatted Custom Moves, and more. Thanks!',
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
        key: ['set', 'setstats', 'statset'],
        text: 'SET STATS: !set stat+value ...\n\n• To set your character stats,\
 enter the command __!set__ followed by all the stats you want to set.\n• Use the\
 stat name +/- stat value.\n• Unentered stats will default to zero or their\
 existing value.\n• !set name+nickname will use your Discord channel nickname\
 as your character name.\n\n\
EXAMPLE: **(You can copy/paste and edit the stats)**\n\
!set name+Me cool-2 hard-1 hot+0 sharp+1 weird+2',
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
 • monsterhearts\n\
 • motw\n\
 • the-sprawl\n\
 • uncharted-worlds\n\
EXAMPLE: !setgame apocalypse-world\n\n\
WARNING: Setting a new game will erase all current character sheets and data. If you\'d like\
 to play a different game with ApocaBot and keep all your current data, simply create a new\
 channel or server for your new game and leave this one as is.',
       method: functions.setGame
   },
    shift: {
        key: ['shift'],
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
    actUnderFire: {
      name: 'Act Under Fire',
        key: ['act', 'actunderfire', 'underfire', 'fire'],
        text: 'ACT UNDER FIRE: !act\n\
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
      name: 'Go Aggro',
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
      name: 'Seduce Or Manipulate',
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
      name: 'Help Or Interfere',
        key: ['hoi', 'interfere', 'helporinterfere'],
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
      name: 'Read A Sitch',
        key: ['readsitch', 'readasitch', 'sitch'],
        text: 'READ A SITCH: !readsitch\n\
When you read a charged situation, you may ask:\n\
 *- Where\'s my best escape route / way in / way past?*\n\
 *- Which enemy is the most vulnerable to me?*\n\
 *- Which enemy is the biggest threat?*\n\
 *- What should I be on the lookout for?*\n\
 *- What\'s my enemy\'s true position?*\n\
 *- Who\'s in control here?*',
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
      name: 'Read A Person',
        key: ['readperson', 'readaperson', 'person'],
        text: 'READ A PERSON: !readperson\n\
When you read a person in a charged interaction, you may ask:\n\
 *- Is your character telling the truth?*\n\
 *- What\'s your character really feeling?*\n\
 *- What does your character intend to do?*\n\
 *- What does your character wish I\'d do?*\n\
 *- How could I get your character to -- ?*',
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
      name: 'Open Your Brain',
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
   sufferHarm: {
      name: 'Suffer Harm',
       key: ['suffer', 'sufferharm', 'harm'],
       text: 'SUFFER HARM: !suffer\n\
When you suffer harm, roll+harm suffered (after armor, if you\'re wearing any).',
       success: 'On a 10+, the MC can choose one:\n\
 - You\'re out of action: unconscious, trapped, incoherent, or panicked.\n\
 - It\'s worse than it seemed. Take an additional 1-harm.\n\
 - Choose 2 from the list below:\n\n\
 - You lose your footing.\n\
 - You lose your grip on whatever you\'re holding.\n\
 - You lose track of someone or something you\'re attending to.\n\
 - You miss noticing something important.',
       mixed: 'On a 7–9, the MC can choose 1:\n\
 - You lose your footing.\n\
 - You lose your grip on whatever you\'re holding.\n\
 - You lose track of someone or something you\'re attending to.\n\
 - You miss noticing something important.',
       fail: 'On a 6-, the MC can choose 1 from the list below. If she\
does, you take -1 harm.\n\
 - You lose your footing.\n\
 - You lose your grip on whatever you\'re holding.\n\
 - You lose track of someone or something you\'re attending to.\n\
 - You miss noticing something important.',
       stat: 'num',
       method: functions.moveRoll
   },
   shopAtMarket: {
      name: 'Shop At Market',
       key: ['market', 'shop', 'shopatmarket'],
       text: 'SHOP AT MARKET: !shop\n\
When you go into a holding\'s bustling market, looking for some\
particular thing to buy, and it\'s not obvious whether you should\
be able to just go buy one like that, roll+sharp.',
       success: 'On a 10+, yes, you can just go buy it like that.',
       mixed: 'On a 7–9, the MC chooses 1:\n\
 - It costs 1-barter more than you\'d expect.\n\
 - It\'s not openly for sale, but you find someone who can lead you\
 to someone selling it.\n\
 - It\'s not openly for sale, but you find someone who sold it recently,\
 who may be willing to introduce you to their previous buyer.\n\
 - It\'s not available for sale, but you find something similar. Will it do?',
       fail: 'On a 6-, the MC chooses 1 from the list, plus it costs 1-barter more.\n\
 - It\'s not openly for sale, but you find someone who can lead you\
 to someone selling it.\n\
 - It\'s not openly for sale, but you find someone who sold it recently,\
 who may be willing to introduce you to their previous buyer.\n\
 - It\'s not available for sale, but you find something similar. Will it do?',
       stat: 'sharp',
       method: functions.moveRoll
   },
   dropJingle: {
      name: 'Drop Jingle',
       key: ['dropjingle', 'drop', 'jingle'],
       text: 'DROP JINGLE: !jingle\n\
When you make known that you want a thing and drop jingle to speed\
 it on its way, roll+barter spent (max roll+3). It has to be a thing\
 you could legitimately get this way.',
       success: 'On a 10+, it comes to you, no string attached.',
       mixed: 'On a 7–9, it comes to you, or something pretty close.',
       fail: 'On a 6-, it comes to you, but with string very much attached.',
       stat: 'num',
       method: functions.moveRoll
   },
   insight: {
      name: 'Insight',
       key: ['insight', 'sight'],
       text: 'When you are able to go to someone for insight, ask them what\
 they think your best course is, and the MC will tell you. If you pursue that\
 course, take +1 to any rolls you make in the pursuit. If you pursue that course\
 but don\'t accomplish your ends, you mark experience.',
       method: function(){return this.text}
   },
   augury: {
      name: 'Augury',
       key: ['augury'],
       text: 'AUGURY: !augury\n\
When you are able to use something for augury, roll+weird.',
       success: 'On a 10+, choose 1:\n\
 - Reach through the world’s psychic maelstrom to something or someone connected to it.\n\
 - Isolate and protect a person or thing from the world’s psychic maelstrom.\n\
 - Isolate and contain a fragment of the world’s psychic maelstrom itself.\n\
 - Insert information into the world’s psychic maelstrom.\n\
 - Open a window into the world’s psychic maelstrom.\n\n\
By default, the effect lasts only as long as you maintain it, will reach only\
 shallowly into the world’s psychic maelstrom as it is local to you, and will bleed\
 instability. On a 10+, choose 2 of the following:\n\
 - It’ll persist (for a while) without your actively maintaining it.\n\
 - It reaches deep into the world’s psychic maelstrom.\n\
 - It reaches broadly throughout the world’s psychic maelstrom.\n\
 - It’s stable and contained, no bleeding.',
       mixed: 'On a 7–9, choose 1:\n\
 - Reach through the world’s psychic maelstrom to something or someone connected to it.\n\
 - Isolate and protect a person or thing from the world’s psychic maelstrom.\n\
 - Isolate and contain a fragment of the world’s psychic maelstrom itself.\n\
 - Insert information into the world’s psychic maelstrom.\n\
 - Open a window into the world’s psychic maelstrom.\n\n\
By default, the effect lasts only as long as you maintain it, will reach only\
 shallowly into the world’s psychic maelstrom as it is local to you, and will bleed\
 instability. On a 7-9, choose 1 of the following:\n\
 - It’ll persist (for a while) without your actively maintaining it.\n\
 - It reaches deep into the world’s psychic maelstrom.\n\
 - It reaches broadly throughout the world’s psychic maelstrom.\n\
 - It’s stable and contained, no bleeding.',
       fail: 'On a 6-, whatever bad happens, your antenna takes the brunt of it.',
       stat: 'weird',
       method: functions.moveRoll
   },
   seizeByForce: {
      name: 'Seize By Force',
       key: ['seize', 'seizebyforce', 'seizeforce'],
       text: 'SEIZE BY FORCE: !seize\n\
To seize something by force, exchange harm, but first roll+hard.',
       success: 'On a 10+, choose 3:\n\
 - You inflict terrible harm (+1harm).\n\
 - You suffer little harm (-1harm).\n\
 - You take definite and undeniable control of it.\n\
 - You impress, dismay, or frighten your enemy.',
       mixed: 'On a 7–9, choose 2:\n\
 - You inflict terrible harm (+1harm).\n\
 - You suffer little harm (-1harm).\n\
 - You take definite and undeniable control of it.\n\
 - You impress, dismay, or frighten your enemy.',
       fail: 'On a 6-, choose 1:\n\
 - You inflict terrible harm (+1harm).\n\
 - You suffer little harm (-1harm).\n\
 - You take definite and undeniable control of it.\n\
 - You impress, dismay, or frighten your enemy.',
       stat: 'hard',
       method: functions.moveRoll
   },
   singleCombat: {
      name: 'Single Combat',
       key: ['single', 'combat', 'singlecombat'],
       text: 'SINGLE COMBAT: !single\n\
When you do single combat with someone, no quarters, exchange harm\
 but first roll+hard.',
       success: 'On a 10+, both:\n\
 - You inflict terrible harm (+1harm).\n\
 - You suffer little harm (-1harm).',
       mixed: 'On a 7–9, choose 1:\n\
 - You inflict terrible harm (+1harm).\n\
 - You suffer little harm (-1harm).',
       fail: 'On a 6-, you opponent chooses 1 against you:\n\
 - You inflict terrible harm (+1harm).\n\
 - You suffer little harm (-1harm).',
       stat: 'hard',
       method: functions.moveRoll
   },
   layDownFire: {
      name: 'Lay Down Fire',
       key: ['lay', 'laydown', 'laydownfire'],
       text: 'LAY DOWN FIRE: !lay\n\
When you lay down fire, roll+hard. You may:\n\
 - You provide covering fire, allowing another character to move or act freely.\n\
 - You provide supporting fire, giving another PC +1choice to their own battle move.\n\
 - You provide suppressing fire, denying another character to move or act freely.\
 (If a PC, they may still act under fire.)\n\
 - You take an opportune shot, inflicting harm (but -1harm) on an enemy within your reach.',
       success: 'On a 10+, choose 3:\n\
 - You provide covering fire, allowing another character to move or act freely.\n\
 - You provide supporting fire, giving another PC +1choice to their own battle move.\n\
 - You provide suppressing fire, denying another character to move or act freely.\
 (If a PC, they may still act under fire.)\n\
 - You take an opportune shot, inflicting harm (but -1harm) on an enemy within your reach.',
       mixed: 'On a 7–9, choose 2:\n\
 - You provide covering fire, allowing another character to move or act freely.\n\
 - You provide supporting fire, giving another PC +1choice to their own battle move.\n\
 - You provide suppressing fire, denying another character to move or act freely.\
 (If a PC, they may still act under fire.)\n\
 - You take an opportune shot, inflicting harm (but -1harm) on an enemy within your reach.',
       fail: 'On a 6-, choose 1:\n\
 - You provide covering fire, allowing another character to move or act freely.\n\
 - You provide supporting fire, giving another PC +1choice to their own battle move.\n\
 - You provide suppressing fire, denying another character to move or act freely.\
 (If a PC, they may still act under fire.)\n\
 - You take an opportune shot, inflicting harm (but -1harm) on an enemy within your reach.',
       stat: 'hard',
       method: functions.moveRoll
   },
   standOverwatch: {
      name: 'Stand Overwatch',
       key: ['stand', 'watch', 'standoverwatch'],
       text: 'STAND OVERWATCH: !watch\n\
When you stand overwatch for an ally, roll+cool.',
       success: 'On a 10+, if anyone attacks or interferes with your ally,\
 you attack them and inflict harm as established, as well as warning your ally.\
 You also choose 1:\n\
 - ...And you inflict your harm before they can carry out their attack or interference.\n\
 - ...And you inflict terrible harm (+1harm).',
       mixed: 'On a 7–9, if anyone attacks or interferes with your ally,\
 you attack them and inflict harm as established, as well as warning your ally.',
       fail: 'On a 6-, you were able to warn your ally but not attack your enemy.',
       stat: 'cool',
       method: functions.moveRoll
   },
   keepAnEyeOut: {
      name: 'Keep An Eye Out',
       key: ['eye', 'keepaneyeout', 'keepeyeout', 'eyeout'],
       text: 'KEEP AN EYE OUT: !eye\n\
When you keep an eye out for what\'s coming, roll+sharp. Spend hold to:\n\
 - Direct a PC ally\'s attention to an enemy. If they make a battle move against\
 that enemy, they get +1choice to their move.\n\
 - Give a PC ally an order, instruction, or suggestion. If they do it, they get\
 +1 to any rolls they make in the effort.\n\
 - Direct an ally\'s attention to an enemy. If they attack that enemy, they\
 inflict +1harm.\n\
 - Direct an ally\'s attention to a danger. They take -1harm from that danger.',
       success: 'On a 10+, hold 3. During the battle, spend your hold, 1 for 1,\
 to ask the MC what\'s coming and choose 1:\n\
 - Direct a PC ally\'s attention to an enemy. If they make a battle move against\
 that enemy, they get +1choice to their move.\n\
 - Give a PC ally an order, instruction, or suggestion. If they do it, they get\
 +1 to any rolls they make in the effort.\n\
 - Direct an ally\'s attention to an enemy. If they attack that enemy, they\
 inflict +1harm.\n\
 - Direct an ally\'s attention to a danger. They take -1harm from that danger.',
       mixed: 'On a 7–9, hold 2. During the battle, spend your hold, 1 for 1,\
 to ask the MC what\'s coming and choose 1:\n\
 - Direct a PC ally\'s attention to an enemy. If they make a battle move against\
 that enemy, they get +1choice to their move.\n\
 - Give a PC ally an order, instruction, or suggestion. If they do it, they get\
 +1 to any rolls they make in the effort.\n\
 - Direct an ally\'s attention to an enemy. If they attack that enemy, they\
 inflict +1harm.\n\
 - Direct an ally\'s attention to a danger. They take -1harm from that danger.',
       fail: 'On a 6-, hold 1. During the battle, spend your hold, 1 for 1,\
 to ask the MC what\'s coming and choose 1:\n\
 - Direct a PC ally\'s attention to an enemy. If they make a battle move against\
 that enemy, they get +1choice to their move.\n\
 - Give a PC ally an order, instruction, or suggestion. If they do it, they get\
 +1 to any rolls they make in the effort.\n\
 - Direct an ally\'s attention to an enemy. If they attack that enemy, they\
 inflict +1harm.\n\
 - Direct an ally\'s attention to a danger. They take -1harm from that danger.',
       stat: 'sharp',
       method: functions.moveRoll
   },
   baitATrap: {
      name: 'Bait A Trap',
       key: ['bait', 'trap', 'baitatrap'],
       text: 'BAIT A TRAP: !bait\n\
When you\'re the bait, roll+cool.',
       success: 'On a 10+, choose 2:\n\
 - You draw your prey all the way into the trap. Otherwise, they only approach.\n\
 - Your prey doesn\'t suspect you. Otherwise, they\'re wary and alert.\n\
 - You don\'t expose yourself to extra risk. Othewise, any harm your prey\
 inclicts is +1.',
       mixed: 'On a 7–9, choose 1:\n\
 - You draw your prey all the way into the trap. Otherwise, they only approach.\n\
 - Your prey doesn\'t suspect you. Otherwise, they\'re wary and alert.\n\
 - You don\'t expose yourself to extra risk. Othewise, any harm your prey\
 inclicts is +1.',
       fail: 'On a 6-, the MC chooses 1 for you:\n\
 - You draw your prey all the way into the trap. Otherwise, they only approach.\n\
 - Your prey doesn\'t suspect you. Otherwise, they\'re wary and alert.\n\
 - You don\'t expose yourself to extra risk. Othewise, any harm your prey\
 inclicts is +1.',
       stat: 'cool',
       method: functions.moveRoll
   },
   huntPrey: {
      name: 'Hunt Prey',
       key: ['hunt', 'huntprey', 'prey'],
       text: 'HUNT PREY: !hunt\n\
When you\'re the cat, roll+cool.',
       success: 'On a 10+, you catch your prey out. You\'ve driven them\
 first to a place of your choosing; say where.',
       mixed: 'On a 7–9, you catch your prey out. You\'ve had to follow them\
 where they wanted to go; they say where.',
       fail: 'On a 6-, your prey escapes you.',
       stat: 'cool',
       method: functions.moveRoll
   },
   escapeAHunter: {
      name: 'Escape A Hunter',
       key: ['escape', 'escapehunter', 'escapeahunter'],
       text: 'ESCAPE A HUNTER: !escape\n\
When you\'re the mouse, roll+cool.',
       success: 'On a 10+, you escape clean and leave your hunter hunting.',
       mixed: 'On a 7–9, your hunter catches you out, but only after you\'ve led\
 them to a place of your choosing; say where.',
       fail: 'On a 6-, your hunter catches you out and the MC says where.',
       stat: 'cool',
       method: functions.moveRoll
   },
   turnTheTables: {
      name: 'Turn The Tables',
       key: ['turn', 'turntables', 'turnthetables'],
       text: 'TURN THE TABLES: !turn\n\
When it\'s not certain whether you\'re the cat or the mouse, roll+sharp.',
       success: 'On a 10+, you decide if you\'re the cat or the mouse.\
 You take +1 forward as well.',
       mixed: 'On a 7–9, you decide if you\'re the cat or the mouse.',
       fail: 'On a 6-, you\'re the mouse.',
       stat: 'sharp',
       method: functions.moveRoll
   },
   addHx: {
      key: ['addhx'],
      text: 'To add 1 to your Hx stat with another character, use the command __!addhx__ followed by the\
 other character\'s name. Enter __!hx__ to view your Hx list.\n\n\
EXAMPLE: It\'s the end of the session and you have to add Hx+1 to your Hx with Bucky. Enter __!addhx bucky__ to shift\
 your Hx score up by one.',
      method: functions.addHx
   },
   subHx: {
      key: ['subhx'],
      text: 'To subtract 1 from your Hx stat with another character, use the command __!subhx__ followed by the\
 other character\'s name. Enter __!hx__ to view your Hx list.\n\n\
EXAMPLE: At the start of the game, you have Hx-2 with Lulu. Enter the command __!subhx lulu__ to add Lulu\
 to your Hx list, and bring your Hx with Lulu to Hx-1, then enter __!subhx lulu__ again to get to Hx-2.',
      method: functions.subHx
   },
   printHx: {
      key: ['hx'],
      text: 'Every player\'s character has Hx, history, with every other player\'s character.\
 Your Hx with someone says how well you know them.\n\n • To set your Hx stat with the other players,\
 use the commands __!addhx__ and __!subhx__ followed by the other character\'s name.\n\n • Hx will not\
 automatically add to your **Help or Interfere** move, but you can enter __!hoi +name__ to use a stored Hx stat.\n\n\
 • If you want to remove a character entirely from your Hx list, enter __!removehx__ followed by the character\'s name.\n\n\
 • If your score reaches Hx+4, the bot will automatically shift it to Hx+1 and tell you to mark EXP.\n\n\
 • If your score reaches Hx-3, the bot will automatically shift it to Hx+0 and tell you to mark EXP.\n\n\
EXAMPLES:\n\
 • At the start of the game, you have Hx-2 with Lulu. Enter the command __!subhx lulu__ to add Lulu\
 to your Hx list, and bring your Hx with Lulu to Hx-1, then enter __!subhx lulu__ again to get to Hx-2.\n\n\
 • It\'s the end of the session and you have to add Hx+1 to your Hx with Bucky. Enter __!addhx bucky__ to shift\
 your Hx score up by one.\n\n\
 • Your friend Snakebite just died. Though you\'ll never forget them, enter __!removehx snakebite__ to remove them\
 from your Hx list.\n\n\
 • You decide to **Help or Interfere** with Lucky. You don\'t remember what your Hx score with them is, but you\
 can just enter __!hoi +lucky__ to automatically add your saved Hx score from the list.',
      method: functions.printHx
   },
   removeHx: {
      key: ['removehx'],
      text: 'If you want to remove a character entirely from your Hx list, enter __!removehx__ followed by the character\'s name.\
 Enter __!hx__ to view your Hx list.\n\n\
EXAMPLE: Your friend Snakebite just died. Though you\'ll never forget them, enter __!removehx snakebite__ to remove them\
 from your Hx list.',
      method: functions.removeHx
   },
   customMove: {
       key: ['move'],
       text: 'To use a custom move, enter the command __!move__ followed by the custom command\
 for your move.\nTo view the text of a custom move, type !move command? (with custom command)\n\
To see a list of all custom moves, type __!movelist__.\nTo delete a custom move, enter\
 __!deletemove__ followed by __"move name"__ (name must be in quotes).',
       method: functions.customMove
   },
   newMove: {
       key: ['newmove'],
       text: 'To create a custom move, enter a command with the following parameters:\n\
 • !newmove\n\
 • name+"Move Name"\n\
 • command+"movecommand"\n\
 • roll+"xdy +stat"\n\
 • text+"Description of move"\n\
 • success+"this happens when you succeed..."\n\
 • mixed+"this happens on a mixed success..."\n\
 • fail+"this happens on a failure..."\n\n\
**Spaces between each parameter. Double quotes around all custom text. Command+ must be one word, letters only.**\n\n\
**EXAMPLE: (you may copy/paste and edit the example text)**\n!newmove name+"Fly High" command+"fly" roll+"2d6 +weird" text+"When\
 you want to fly high" success+"you fly high" mixed+"you fly a little" fail+"you fall"',
          method: functions.newCustomMove
   },
   moveList: {
       key: ['movelist', 'customlist'],
       text: 'Enter the command __!movelist__ for a list of all custom moves.\
 Enter __!newmove?__ to learn about creating new custom moves, __!deletemove?__ to learn\
 about deleting custom moves, and __!move?__ to learn about using custom moves in your game.',
       method: functions.moveList
   },
   deleteMove: {
       key: ['deletemove'],
       text: 'To delete a custom move, enter __!deletemove__ followed by __"MOVE NAME"__\
 (name must be in quotes).\n\n\
EXAMPLE: !deletemove "Fly High"',
       method: functions.deleteMove
   }
}