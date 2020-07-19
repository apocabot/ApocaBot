const functions = require('./../functions/motw.js');

//text library object
module.exports = moves = {
    menu: {
        key: ['help', 'menu',],
        text: 'ALL APOCABOT COMMANDS BEGIN WITH PREFIX (default ! ).\n\
ADD SUFFIX ? TO ANY COMMAND FOR MOVE INFO:\n\n\
 - NEWCHARACTER: !newcharacter\n\
 - CHECK YOUR CHARACTER STATS: !character\n\
 - SET CHARACTER STATS: !set\n\
 - SHIFT CHARACTER STATS: !shift\n\
 - ROLL SOME DICE: !roll\n\
 - BASIC MOVES LIST: !basic\n\
 - ALTERNATE WEIRD MOVES LIST: !weirdmoves\n\
 - CUSTOM MOVES: !custom\n\
 - END OF SESSION: !endsession\n\
 - SET APOCABOT PREFIX: !setprefix\n\
 - SET APOCABOT GAME: !setgame',
        method: function(){return this.text}
    },
    basicMoves: {
        key: [`basic`, 'basicmoves'],
        text: 'BASIC MOVES LIST:\n\n\
 - KICK SOME ASS: !ksa *or* !kickass\n\
 - ACT UNDER PRESSURE: !aup *or* !act\n\
 - HELP OUT: !helpout\n\
 - INVESTIGATE A MYSTERY: !iam *or* !invest\n\
 - MANIPULATE SOMEONE: !manipulate\n\
 - MANIPULATE HUNTER: !manhunt\n\
 - PROTECT SOMEONE: !protect\n\
 - READ A BAD SITUATION: !rabs *or* !read\n\
 - USE MAGIC: !magic\n\
 - BIG MAGIC: !bigmagic\n\
 - PHENOMENA: !phenom\n\
 - MAGIC EFFECTS: !effects\n\
 - MAGIC GLITCHES: !glitches',
        method: function(){return this.text}
   },
    weirdMoves: {
        key: ['weirdmoves'],
        text: 'ALTERNATE WEIRD MOVES LIST:\n\n\
 - EMPATH: !empath\n\
 - ILLUMINATED: !illum\n\
 - NO LIMITS: !nolimits\n\
 - PAST LIVES: !pastlives\n\
 - SENSITIVE: !sensitive\n\
 - TRUST YOUR GUT: !trustgut\n\
 - TELEKINESIS: !tele\n\
 - WEIRD SCIENCE: !weirdsci',
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
                CHARM: ['charm', 0],
                COOL: ['cool', 0],
                SHARP: ['sharp', 0],
                TOUGH: ['tough', 0],
                WEIRD: ['weird', 0],
                LUCK: ['luck', '0 / 7'],
                HARM: ['harm', '0 / 7'],
                EXP: ['exp', '0 / 5']

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
!set name+Me charm-2 cool-1 sharp+0 tough+1 weird+2',
        error: 'Incorrect input, use the format: !set name+bambino charm+1 cool-1 etc...',
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
EXAMPLE: !shift harm+1 will increase your harm by 1',
        error: 'Incorrect input, use the format: !shift tough+1 etc...\
 (this only works for numerical values)',
        method: functions.shift
    },
    roll: {
        key: ['roll'],
        text: 'ROLL DICE: !roll xdy +z\n\
Use the format !roll xdy +z where x = number of die, y = faces on die, and z = a positive\
 or negative modifier, a stat, another +xdy, or any combination.\n\
EXAMPLE: !roll 2d6 +1  OR  !roll 2d6 +sharp  !roll 2d6 +1d4 (SPACES MATTER!)',
        error: 'INCORRECT INPUT: Please use the format !roll xdy +z where x = number\
 of die, y = faces on die, and z = positive or negative modifier, if any.\n\
EXAMPLE: !roll 2d6 +1  OR  !roll 2d6 +charm (SPACES MATTER!)',
        method: functions.xdyRoll
    },
    kickSomeAss: {
       name: 'Kick Some Ass',
        key: ['ksa', 'kickass', 'kicksome', 'kicksomeass', 'ass'],
        text: 'KICK SOME ASS: !kickass\nWhen you get into a fight and kick some ass.',
        success: 'On a 10+, you and whatever you\'re fighting inflict harm on each other,\
 plus choose one extra effect:\n\
 - You gain the advantage: take +1 forward, or give +1 forward to another hunter\n\
 - You inflict terrible harm (+1 harm)\n\
 - You suffer less harm (-1 harm)\n\
 - You force them where you want them',
        mixed: 'On a 7–9, you and whatever you\'re fighting inflict harm on each other.',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'tough',
        method: functions.moveRoll
    },
    actUnderPressure: {
       name: 'Act Under Pressure',
        key: ['aup', 'act', 'actunder', 'underpressure', 'actunderpressure', 'pressure'],
        text: 'ACT UNDER PRESSURE: !act\nWhen you act under pressure.',
        success: 'On a 10+, you do what you set out to do.',
        mixed: 'On a 7–9, the Keeper is going to give you a worse outcome, hard choice,\
 or price to pay.',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'cool',
        method: functions.moveRoll
    },
    helpOut: {
       name: 'Help Out',
        key: ['helpout'],
        text: 'HELP OUT: !helpout\nWhen you help another hunter.',
        success: 'On a 10+, your help grants them +1 to their roll.',
        mixed: 'On a 7–9, your help grants them +1 to their roll,\
 but you also expose yourself to trouble or danger.',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'cool',
        method: functions.moveRoll
    },
    investigateAMystery: {
       name: 'Investigate A Mystery',
        key: ['iam', 'invest', 'investigate', 'investigatemystery', 'investigateamystery', 'mystery'],
        text: 'INVESTIGATE A MYSTERY: !investigate\nWhen you investigate a mystery, you can ask:\n\
 - What happened here?\n\
 - What sort of creature is it?\n\
 - What can it do?\n\
 - What can hurt it?\n\
 - Where did it go?\n\
 - What was it going to do?\n\
 - What is being concealed here?\n\
 - (type !phenom if investigating a phenomena)',
        success: 'On a 10+, hold 2. One hold can be spent to ask the keeper\
 one of the following questions:\n\
 - What happened here?\n\
 - What sort of creature is it?\n\
 - What can it do?\n\
 - What can hurt it?\n\
 - Where did it go?\n\
 - What was it going to do?\n\
 - What is being concealed here?\n\
 - (type !phenom if investigating a phenomena)',
        mixed: 'On a 7-9, hold 1. One hold can be spent to ask the keeper\
 one of the following questions:\n\
 - What happened here?\n\
 - What sort of creature is it?\n\
 - What can it do?\n\
 - What can hurt it?\n\
 - Where did it go?\n\
 - What was it going to do?\n\
 - What is being concealed here?\n\
 - (type !phenom if investigating a phenomena)',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'sharp',
        method: functions.moveRoll
    },
    manipulateSomeone: {
       name: 'Manipulate Someone',
        key: ['manipulate', 'manipulatesomeone'],
        text: 'MANIPULATE SOMEONE: !manipulate\n\
Once you have given them a reason, tell them what you want them to do.',
        success: 'On a 10+, they’ll do it for the reason you\
 gave them. If you asked too much, they’ll tell you the minimum it would\
 take for them to do it (or if there’s no way they’d do it).',
        mixed: 'On a 7–9, they’ll do it, but only if you do something\
 for them right now to show that you mean it. If you asked too much,\
 they’ll tell you what, if anything, it would take for them to do it.',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'charm',
        method: functions.moveRoll
    },
    manipulateHunter: {
       name: 'Manipulate Another Hunter',
        key: ['manhunt', 'hunter', 'huntermanipulate'],
        text: 'MANIPULATE HUNTER: !hunter\n\
Once you have given the other hunter a reason, tell them what you want them to do.',
        success: 'On a 10+, if they do what you ask they mark\
 experience and get +1 forward.',
        mixed: 'On a 7–9, they mark experience if they do what you want.',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'charm',
        method: functions.moveRoll
    },
    protectSomeone: {
       name: 'Protect Someone',
        key: ['protect', 'protectsomeone'],
        text: 'PROTECT SOMEONE: !protect\n\
When you prevent harm to another character.',
        success: 'On a 10+, you protect them okay, but\
 you\'ll suffer some or all of the harm they were going to get.\n\
 - You suffer little harm (-1 harm)\n\
 - All impending danger is now focused on you\n\
 - You inflict harm on the enemy\n\
 - You hold the enemy back',
        mixed: 'On a 7-9, you protect them okay, but\
 you\'ll suffer some or all of the harm they were going to get.',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'tough',
        method: functions.moveRoll
    },
    readABadSituation: {
       name: 'Read A Bad Situation',
        key: ['rabs', 'read', 'readasitch', 'readabadsituation', 'badsituation'],
        text: 'READ A BAD SITUATION: !read\n\
When you look around and read a bad situation, you can ask:\n\
 - What\'s my best way in?\n\
 - What\'s my best way out?\n\
 - Are there any dangers we haven\'t noticed?\n\
 - What\'s the biggest threat?\n\
 - What\'s most vulnerable to me?\n\
 - What\'s the best way to protect the victims?',
        success: 'On a 10+, hold 3. One hold can be spent\
 to ask the Keeper one of the following questions (if you act on the answers,\
 you get +1 ongoing while the information is relevant):\n\
 - What\'s my best way in?\n\
 - What\'s my best way out?\n\
 - Are there any dangers we haven\'t noticed?\n\
 - What\'s the biggest threat?\n\
 - What\'s most vulnerable to me?\n\
 - What\'s the best way to protect the victims?',
        mixed: 'On a 10+, hold 1. One hold can be spent\
 to ask the Keeper one of the following questions (if you act on the answers,\
 you get +1 ongoing while the information is relevant):\n\
 - What\'s my best way in?\n\
 - What\'s my best way out?\n\
 - Are there any dangers we haven\'t noticed?\n\
 - What\'s the biggest threat?\n\
 - What\'s most vulnerable to me?\n\
 - What\'s the best way to protect the victims?',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'sharp',
        method: functions.moveRoll
    },
    useMagic: {
       name: 'Use Magic',
        key: ['usemagic', 'magic'],
        text: 'USE MAGIC: !magic\n\
When you use magic, say what you\'re trying to achieve and how you do the spell.',
        success: 'On a 10+ the magic works without issue: choose your effect.\n\
 (type !effects for reference)',
        mixed: 'On a 7–9, it works imperfectly: choose your effect and a glitch.\
 The Keeper will decide what effect the glitch has.\n\
 (type !effects and/or !glitches for reference)',
        fail: 'On a 6-, you lose control of the magic. This never ends well...',
        stat: 'weird',
        method: functions.moveRoll
    },
    bigMagic: {
       name: 'Big Magic',
        key: ['big', 'bigmagic'],
        text: 'BIG MAGIC: !bigmagic\n\
Use this when you want more than the Use Magic effects. Tell the Keeper what you\
 want to do. They may require:\n\
 - You need to spend a lot of time (days or weeks) researching the magic ritual\n\
 - You need to experiment with the spell - there will be lots of failures before\
 you get it right\n\
 - You need some rare and weird ingredients and supplies\n\
 - The spell will take a long time (hours or days) to cast\n\
 - You need a lot of people (2, 3, 7, 13, or more) to help\n\
 - The spell needs to be cast at a particular place and/or time\n\
 - You need to use magic as part of the ritual, perhaps to summon a monster\
 communicate with something, or bar the portal you opened\n\
 - It will have a specific side-effect or danger.',
        success: 'On a 10+ the magic works without issue: choose your effect.\n\
 (type !effects and/or !bigmagic? for reference)',
        mixed: 'On a 7–9, it works imperfectly: choose your effect and a glitch.\
 The Keeper will decide what effect the glitch has.\n\
 (type !effects and/or !glitches for reference)',
        fail: 'On a 6-, you lose control of the magic. This never ends well...',
        stat: 'weird',
        method: functions.moveRoll
    },
    effects: {
        key: ['effects'],
        text: 'USE MAGIC EFFECTS:\n\
 - Inflict harm (1-harm ignore-armour magic obvious)\n\
 - Enchant a weapon. It gets +1 harm and +magic\n\
 - Do one thing that is beyond human limitations\n\
 - Bar a place or portal to a specific person or a type of creature\n\
 - Trap a specific person, minion, or monster\n\
 - Banish a spirit or curse from the person, object, or place it inhabits\n\
 - Summon a monster into the world\n\
 - Communicate with something that you do not share a language with\n\
 - Observe another place or time\n\
 - Heal 1-harm from an injury, or cure a disease, or neutralize a poison',
        method: function(){return this.text}
   },
   glitches: {
        key: ['glitches'],
        text: 'USE MAGIC GLITCHES:\n\
 - The effect is weakened\n\
 - The effect is of short duration\n\
 - You take 1-harm ignore-armour magic\n\
 - The magic draws immediate, unwelcome attention\n\
 - It has a problematic side effect\n\n\
THE KEEPER MAY SAY THAT:\n\
 - The spell requires weird materials\n\
 - The spell will take 10 seconds, 30 seconds, or 1 minute to cast\n\
 - The spell requires ritual chanting and gestures\n\
 - The spell requires you to draw arcane symbols\n\
 - You need one or two people to help cast the spell\n\
 - You need to refer to a tome of magic for the details',
        method: function(){return this.text}
   },
   phenomena: {
        key: ['phenom', 'phenomena'],
        text: 'WHEN INVESTIGATING A PHENOMENA, YOU MAY ALSO ASK:\n\
 - How is this phenomenon doing this?\n\
 - What could fix it, cure it, or slow it down?\n\
 - How far does the effect reach?\n\
 - What will be affected next?',
        method: function(){return this.text}
   },
   empath: {
       name: 'Empath',
       key: ['empath'],
       text: 'EMPATH: !empath\n\
When you open up your brain to feel the emotions of something right there\
 in front of you.',
       success: 'On a 10+, you gain a clearn impression of their current\
 emotional state and intentions. Take +1 forward when acting on this knowledge.',
       mixed: 'On a 7-9, you gain a hazy impression of their current emotional\
 state and intentions.',
       fail: 'On a 6-, your brain is overwhelmed with emotion.',
       stat: 'weird',
       method: functions.moveRoll
   },
   illuminated: {
       name: 'Illuminated',
       key: ['illum', 'illuminated'],
       text: 'ILLUMINATED: !illum\n\
When you telepathically ask the Secret Masters for aid.',
       success: 'On a 10+, the Secret Masters reveal a key fact, clue, or\
 technique that will help you.',
       mixed: 'On a 7-9, the Secret Masters need you to complete a task\
 for them. Once it is done, they reveal a key fact, clue, or technique that\
 will help you.',
       fail: 'On a 6-, the Secret Masters\' reply is terrible, garbled, or\
 somehow dangerously wrong.',
       stat: 'weird',
       method: functions.moveRoll
   },
   noLimits: {
       name: 'No Limits',
       key: ['nolimits', 'limits'],
       text: 'NO LIMITS: !nolimits\n\
When you push your physical body past its limits.',
       success: 'On a 10+, your body obeys your will, to the limits of\
 physical possibility, for a moment.',
       mixed: 'On a 7-9, you do it but choose one consequence:\n\
 - Suffer 1-harm\n\
 - Take -1 forward\n\
 - You need to rest right now.',
       fail: 'On a 6-, something goes horribly wrong.',
       stat: 'weird',
       method: functions.moveRoll
   },
   pastLives: {
       name: 'Past Lives',
       key: ['pastlives', 'past', 'lives'],
       text: 'PAST LIVES: !pastlives\n\
When you channel your previous incarnations to discover something,\
 pose your question:\n\
 - What did a past life discover about ______?\n\
 - How did a past life deal with ______?\n\
 - What important hidden secret can a past life show me the way to?\n\
 - What did a past life learn too late to help them?\n\
 - What does a past life advise me to do now?',
       success: 'On a 10+, a past life has something useful to offer.\
 Ask the Keeper two of the questions below:\n\
 - What did a past life discover about ______?\n\
 - How did a past life deal with ______?\n\
 - What important hidden secret can a past life show me the way to?\n\
 - What did a past life learn too late to help them?\n\
 - What does a past life advise me to do now?',
       mixed: 'On a 7-9, a past life has a little experience with this.\
 Ask the Keeper one of the questions below:\n\
 - What did a past life discover about ______?\n\
 - How did a past life deal with ______?\n\
 - What important hidden secret can a past life show me the way to?\n\
 - What did a past life learn too late to help them?\n\
 - What does a past life advise me to do now?',
       fail: 'On a 6-, a past life takes over for a while.',
       stat: 'weird',
       method: functions.moveRoll
   },
   sensitive: {
       name: 'Sensitive',
       key: ['sensitive', 'sense'],
       text: 'SENSITIVE: !sensitive\n\
When you open your brain to the psychic environment.',
       success: 'On a 10+, you gain a definite impression (a vision\
 tangible aura, overheard thought, etc) about something important.',
       mixed: 'On a 7-9, you gain a hazy impression about something important.',
       fail: 'On a 6-, your brain makes contact with something dangerous.',
       stat: 'weird',
       method: functions.moveRoll
   },
   trustYourGut: {
       name: 'Trust Your Gut',
       key: ['trust', 'trustgut', 'trustyourgut', 'gut'],
       text: 'TRUST YOUR GUT: !trustgut\n\
When you consult your instincts about what to do next.',
       success: 'On a 10+, the Keeper will tell where you should go.\
 Wherever that is, it will be important. You get +1 ongoing on the way to this place.',
       mixed: 'On a 7-9, the Keeper will tell you a general direction to go.\
 Take +1 forward as you explore that.',
       fail: 'On a 6-, your instincts lead you into danger.',
       stat: 'weird',
       method: functions.moveRoll
   },
   telekinesis: {
       name: 'Telekinesis',
       key: ['telekinesis', 'tele'],
       text: 'TELEKINESIS: !tele\n\
When you fling something with your mind.',
       success: 'On a 10+, you move it. Choose two options and mark 1-harm\
 (anything not picked is not true):\n\
 - Something is held fast.\n\
 - Something is hurt (2-harm smash).\n\
 - Something catches fire.\n\
 - You can fling something bigger than a person.\n\
 - You keep it basically under control.\n\
 - You suffer 1 less harm.',
       mixed: 'On a 7-9, you move it but it hurts. Choose one option and mark 2-harm\
 (anything not picked is not true):\n\
 - Something is held fast.\n\
 - Something is hurt (2-harm smash).\n\
 - Something catches fire.\n\
 - You can fling something bigger than a person.\n\
 - You keep it basically under control.\n\
 - You suffer 1 less harm.',
       fail: 'On a 6-, something goes horribly wrong.',
       stat: 'weird',
       method: functions.moveRoll
   },
   weirdScience: {
       name: 'Weird Science',
       key: ['weirdscience', 'weirdsci', 'science'],
       text: 'WEIRD SCIENCE: !weirdsci\n\
When you create or adapt a device to analyse or deal with strangeness\
 say what it will do.',
       success: 'On a 10+, you pick two requirements:\n\
 - It needs a rare and/or weird material.\n\
 - It won\'t be very reliable.\n\
 - It requires huge amounts of power or fuel.\n\
 - It will take a long time to get it working.\n\
 - It won\'t work exactly as you intended.\n\
 - You\'ll need help (beyond the hunters on your team) to finish it.',
       mixed: 'On a 7-9, you pick one requirements and the Keeper picks a second one:\n\
 - It needs a rare and/or weird material.\n\
 - It won\'t be very reliable.\n\
 - It requires huge amounts of power or fuel.\n\
 - It will take a long time to get it working.\n\
 - It won\'t work exactly as you intended.\n\
 - You\'ll need help (beyond the hunters on your team) to finish it.',
       fail: 'On a 6-, something goes horribly wrong. You are still able to\
 create your device, but the Keeper picks three requirements:\n\
 - It needs a rare and/or weird material.\n\
 - It won\'t be very reliable.\n\
 - It requires huge amounts of power or fuel.\n\
 - It will take a long time to get it working.\n\
 - It won\'t work exactly as you intended.\n\
 - You\'ll need help (beyond the hunters on your team) to finish it.',
       stat: 'weird',
       method: functions.moveRoll
   },
   endOfSession: {
        key: ['session', 'sessionend', 'endsession', 'endofsession'],
        text: 'At the end of each session, the Keeper will ask the following questions:\n\
 - Did we conclude the current mystery?\n\
 - Did we save someone from certain death (or worse)?\n\
 - Did we learn something new and important about the world?\n\
 - Did we learn something new and important about one of the hunters?\n\n\
If you get one or two “Yes” answers, **mark one experience**. If you get three\
 or four, **mark two**.',
        method: function(){return this.text}
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