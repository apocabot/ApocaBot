const functions = require('./../functions/uncharted-worlds.js');

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
 - ENTERPRISE MOVES LIST: !enterprise\n\
 - CUSTOM MOVES: !custom\n\
 - ADVANCEMENT AND XP: !advance\n\
 - SET APOCABOT PREFIX: !setprefix\n\
 - SET APOCABOT GAME: !setgame',
        method: function(){return this.text}
    },
    basicMoves: {
       key: ['basic', 'basicmoves'],
       text: 'BASIC MOVES LIST:\n\n\
 - FACE ADVERSITY: !face\n\
 - ASSESSMENT: !assess\n\
 - GET INVOLVED: !get\n\
 - OPEN FIRE: !open\n\
 - LAUNCH ASSAULT: !launch\n\
 - PATCH UP: !patch\n\
 - COMMAND: !command\n\
 - ACCESS: !access\n\
 - BRACE FOR IMPACT: !brace',
       method: function(){return this.text}
   },
   enterpriseMoves: {
       key: ['enterprise', 'enterprisemoves'],
       text: 'ENTERPRISE MOVES LIST:\n\n\
 - SHIELDS UP: !shields\n\
 - WILD JUMP: !wild\n\
 - CRAMPED QUARTERS: !cramped\n\
 - ACQUISITION: !acquire\n\
 - BARTER: !barter',
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
                MET: ['met', 0],
                EXP: ['exp', 0],
                PHY: ['phy', 0],
                INF: ['inf', 0],
                INT: ['int', 0],
                ARM: ['arm', 0]
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
 3-letter stat name +/- stat value.\n• Unentered stats will default to zero or their\
 existing value.\n• !set name+nickname will use your Discord channel nickname\
 as your character name.\n\n\
EXAMPLE: **(You can copy/paste and edit the stats)**\n\
!set name+Me met-2 exp-1 phy+0 inf+1 int+2 arm+0',
        error: 'Incorrect input, use the format: !set name+bambino met+1 phy-1 etc...',
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
 EXAMPLE: !shift met+1 will increase your strength by 1.\
 !shift met-1 will remove 1 from your met stat.',
       error: 'Incorrect input, use the format: !shift met+1 etc...\
 (this only works for numerical values)',
       method: functions.shift
   },
    roll: {
        key: ['roll'],
        text: 'ROLL DICE: !roll xdy +z\n\
Use the format !roll xdy +z where x = number of die, y = faces on die, and z = a positive\
 or negative modifier, a stat, another +xdy, or any combination.\n\
EXAMPLE: !roll 2d6 +1  OR  !roll 2d6 +int  OR  !roll 2d6 +1d4 (SPACES MATTER!)',
        error: 'INCORRECT INPUT: Please use the format !roll xdy +z where x = number\
 of die, y = faces on die, and z = positive or negative modifier, if any.\n\
EXAMPLE: !roll 2d6 +1  OR  !roll 2d6 +int (SPACES MATTER!)',
        method: functions.xdyRoll
    },
    faceAdversity: {
        name: 'Face Adversity',
        key: ['faceadversity', 'face'],
        text: 'FACE ADVERSITY: !face +STAT\n When you overcome opposition\
 or danger using...\n\
 - stealth, piloting, accuracy, or discipline: +MET\n\
 - knowledge, mechanics, or first-aid: +EXP\n\
 - athletics, endurance, strength, or health: +PHY\n\
 - charm, diplomacy, bargaining, or lies: +INF\n\
 - open computer systems and networks: +INT',
        greatSuccess: 'On a 10+ you overcome the opposition or danger, just as you described.',
        success: 'On a 10+ you overcome the opposition or danger, just as you described.',
        mixed: 'On a 7-9, the danger is overcome, but at a price; the GM will offer you\
 a cost or a hard choice.',
        fail: 'On a 6-, prepare for the worst...',
        stat: 'stat',
        method: functions.moveRoll
    },
    assessment: {
        name: 'Assessment',
        key: ['assessment', 'assess'],
        text: 'ASSESSMENT: !assess +STAT\n When you collect critical information\
 about an important, dangerous or mysterious subject using...\n\
 - stealth, focus, or cunning: +MET\n\
 - research and experimentation: +EXP\n\
 - exploration, laobr, or strenuous activity: +PHY\n\
 - informants, interviews, or gossip: +INF\n\
 - the SectorNet or open networks: +INT',
        greatSuccess: 'On a 10+, you gain significant information about the subject,\
 and earn a Data Point about it as well.',
        success: 'On a 10+, you gain significant information about the subject,\
 and earn a Data Point about it as well.',
        mixed: 'On a 7-9, the GM will reveal interesting, potentially useful\
 information about the subject. Or they might ask you.',
        fail: 'On a 6-, the GM will reveal facts about the subject you probably\
 wish were not true.',
        stat: 'stat',
        method: functions.moveRoll
    },
    getInvolved: {
       name: 'Get Involved',
        key: ['getinvolved', 'get'],
        text: 'GET INVOLVED: !get +STAT\n When an ally makes a Move and you affect\
 the result using...\n\
 - stealth, piloting, accuracy, or bravery: +MET\n\
 - education, mechanics, or first-aid: +EXP\n\
 - athletics, endurance, strength, or health: +PHY\n\
 - charm, diplomacy, bargaining, or lies: +INF\n\
 - open computer systems and networks: +INT',
        greatSuccess: 'On a 10+, increase or decrease the level of success by one step.',
        success: 'On a 10+, increase or decrease the level of success by one step.',
        mixed: 'On a 7-9, increase or decrease the level of success by one step,\
 but you incur a cost, complication or hard choice in order to get involved.',
        fail: 'On a 6-, prepare for the worst...',
        stat: 'stat',
        method: functions.moveRoll
    },
    openFire: {
       name: 'Open Fire',
        key: ['openfire', 'open'],
        text: 'OPEN FIRE: !open +MET\nWhen you engage enemy forces in long ranged,\
 cover-to-cover firefights, describe your tactics and primary targets.',
        greatSuccess: 'On a 10+, you win this engagement. Your targets are dead, injured,\
 incapacitated, retreating, pinned, surrendering, etc.',
        success: 'On a 10+, you win this engagement. Your targets are dead, injured,\
 incapacitated, retreating, pinned, surrendering, etc.',
        mixed: 'On a 7-9, you win this engagement. Your targets are dead, injured,\
 incapacitated, retreating, pinned, surrendering, etc. But the GM will choose 1 or more\
 of the following consequences:\n - You suffer harm during the exchange.\n\
 - The exchange causes undesirable collateral damage.\n\
 - The battle shifts, changing threats or adding new ones.\n\
 - The targets actually suffer a lesser fate (GM chooses).',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'met',
        method: functions.moveRoll
    },
    launchAssault: {
       name: 'Launch Assault',
        key: ['launchassault', 'launch', 'assault'],
        text: 'LAUCH ASSAULT: !launch +PHY\nWhen you engage enemy forces in\
 chaotic close-quarters combat, describe your tactics and primary targets.',
        greatSuccess: 'On a 10+, you win this engagement. Your targets are dead, injured,\
 incapacitated, retreating, pinned, surrendering, etc.',
        success: 'On a 10+, you win this engagement. Your targets are dead, injured,\
 incapacitated, retreating, pinned, surrendering, etc.',
        mixed: 'On a 7-9, you win this engagement. Your targets are dead, injured,\
 incapacitated, retreating, pinned, surrendering, etc. But the GM will choose 1 or more\
 of the following consequences:\n - You suffer harm during the exchange.\n\
 - The exchange causes undesirable collateral damage.\n\
 - The battle shifts, changing threats or adding new ones.\n\
 - The targets actually suffer a lesser fate (GM chooses).',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'phy',
        method: functions.moveRoll
    },
    patchUp: {
       name: 'Patch Up',
        key: ['patchup', 'patch'],
        text: 'PATCH UP: !patch +EXP\nWhen using appropriate medical supplies/tools\
 to repair harm to people or machinery.',
        greatSuccess: 'On a 10+, choose 1 from the list below:\n\
 - Treat a single minor, major, or severe injury/damage.\n\
 - Treat a malfunction or minor debility.\n\
 - Stabilize a major debility.\n\
 - Perform a medical/technical procedure.',
        success: 'On a 10+, choose 1 from the list below:\n\
 - Treat a single minor, major, or severe injury/damage.\n\
 - Treat a malfunction or minor debility.\n\
 - Stabilize a major debility.\n\
 - Perform a medical/technical procedure.',
        mixed: 'On a 7-9, choose 1 from the list below, but you\'ve reached the limit\
 of what you can do; you cannot re-attempt to Patch Up the subject for now:\n\
 - Treat a single minor, major, or severe injury/damage.\n\
 - Treat a malfunction or minor debility.\n\
 - Stabilize a major debility.\n\
 - Perform a medical/technical procedure.',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'exp',
        method: functions.moveRoll
    },
    command: {
       name: 'Command',
        key: ['command'],
        text: 'COMMAND: !command +INF\nWhen you issue a command to a group\
 that is inclined to follow your orders.',
        greatSuccess: 'On a 10+, they follow those orders to the best of their ability,\
 though there may be costs in time, resources or personnel.',
        success: 'On a 10+, they follow those orders to the best of their ability,\
 though there may be costs in time, resources or personnel.',
        mixed: 'On a 7-9, they follow those orders to the best of their ability\
 (though there may be costs in time, resources or personnel), but their disposition\
 or effectiveness has been significantly impacted in some way. This crew will not\
 accept a new Command until those issues have been dealt with.',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'inf',
        method: functions.moveRoll
    },
    access: {
       name: 'Access',
        key: ['access'],
        text: 'ACCESS: !access +INT\nWhen you spend several minutes accessing\
 a locked, protected system or network with the appropriate tools.',
        greatSuccess: 'On a 10+, credentials verified, access granted. The system is now\
 open to Interface-based Moves.',
        success: 'On a 10+, credentials verified, access granted. The system is now\
 open to Interface-based Moves.',
        mixed: 'On a 7-9, credentials verified, access granted. The system is now\
 open to Interface-based Moves, but your breach is detected. The owners of the system\
 will likely retaliate soon, either electronically, legally or physically.',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'int',
        method: functions.moveRoll
    },
    braceForImpact: {
       name: 'Brace For Impact',
        key: ['braceforimpact', 'brace', 'impact'],
        text: 'BRACE FOR IMPACT: !brace +ARMOR\nWhen you would suffer harm,\
 the GM will tell you the Severity, then roll !brace.',
        greatSuccess: 'On a 13+, the severity is reduced by two levels.',
        success: 'On a 10-12, the severity is reduced by one level.',
        mixed: 'On a 7-9, you suffer an injury of that severity.',
        fail: 'On a 6-, you also suffer debilities, incur costs/troubles,\
 or suffer an injury of a greater severity, at the GM’s discretion.',
        stat: 'arm',
        method: functions.moveRoll
    },
    shieldsUp: {
       name: 'Shields Up',
        key: ['shieldsup', 'shields'],
        text: 'SHIELDS UP: !shields\nWhen one of the starship sections would\
 suffer damage from outside, the pilot rolls !shields. If a character is at\
 the shield station, they roll !shields instead, and add their +INT.',
        greatSuccess: 'On a 10+, the severity of the damage is reduced by two.',
        success: 'On a 10+, the severity of the damage is reduced by two.',
        mixed: 'On a 7-9, the severity of the damage is reduced by one.',
        fail: 'On a 6-, shields down! The section suffers damage, and the\
 shields need to be repaired or recharged before they can be used again.',
        stat: 'stat',
        method: functions.moveRoll
    },
    wildJump: {
       name: 'Wild Jump',
        key: ['wildjump', 'wild', 'jump'],
        text: 'WILD JUMP: !wildjump\nWhen you force your ship to make a Wild Jump. Anything could happen:\n\
 - You find an uncharted world, ready for exploration.\n\
 - You find exploitable resources, there for the taking.\n\
 - You discover a scientifically-interesting phenomenon.\n\
 - You discover wreckage or ruins of unknown origin.\n\
 - You find a new path to a well-known destination.\n\
 - You encounter a faction or culture that is new to you.',
        greatSuccess: 'On a 10+, the crew only suffers nausea, headaches,\
 and other minor effects. You reach a point within a week\'s travel of your\
 destination, or choose from the list below:\n\
 - You find an uncharted world, ready for exploration.\n\
 - You find exploitable resources, there for the taking.\n\
 - You discover a scientifically-interesting phenomenon.\n\
 - You discover wreckage or ruins of unknown origin.\n\
 - You find a new path to a well-known destination.\n\
 - You encounter a faction or culture that is new to you.',
        success: 'On a 10+, the crew only suffers nausea, headaches,\
 and other minor effects. You reach a point within a week\'s travel of your\
 destination, or choose from the list below:\n\
 - You find an uncharted world, ready for exploration.\n\
 - You find exploitable resources, there for the taking.\n\
 - You discover a scientifically-interesting phenomenon.\n\
 - You discover wreckage or ruins of unknown origin.\n\
 - You find a new path to a well-known destination.\n\
 - You encounter a faction or culture that is new to you.',
        mixed: 'On a 7-9, the crew suffers nausea, headaches, and other effects.\
 The illness and hallucinations are pronounced. The GM chooses one from the list below:\n\
 - You find an uncharted world, ready for exploration.\n\
 - You find exploitable resources, there for the taking.\n\
 - You discover a scientifically-interesting phenomenon.\n\
 - You discover wreckage or ruins of unknown origin.\n\
 - You find a new path to a well-known destination.\n\
 - You encounter a faction or culture that is new to you.',
        fail: 'On a 6-, the GM will describe the ugly, debilitating,\
 terrifying consequences. It\'s full of stars.',
        stat: '',
        method: functions.moveRoll
    },
    crampedQuarters: {
       name: 'Cramped Quarters',
        key: ['crampedquarters', 'cramped'],
        text: 'CRAMPED QUARTERS: !cramped\nWhen you\'ve been trapped in\
 cramped quarters with the same people for a significant amount of time\
 (a leg of an interstellar journey, etc), choose a character trapped with you.',
        greatSuccess: 'On a 10+, describe how the two of you bonded over the past\
 few days.',
        success: 'On a 10+, describe how the two of you bonded over the past\
 few days.',
        mixed: 'On a 7-9, reveal/discover the answer to their question about\
 an aspectof yourself or your past.',
        fail: 'On a 6-, describe what caused the newest hurt feelings or\
 bad blood between you.',
        stat: 'num',
        method: functions.moveRoll
    },
    acquisition: {
       name: 'Acquisition',
        key: ['acquire', 'acquisition'],
        text: 'ACQUISITION: !acquisition +CARGO CLASS\nWhen you demand important\
 services or assets from a market able to supply those demands, Roll +0.\
 If you offer a cargo unit as part of the deal, Roll+ that cargo\'s class.',
        greatSuccess: 'On a 13+, the deal goes through; you get what you asked for.',
        success: 'On a 10-12, the deal goes through if the seller/market is amiably\
 disposed toward the deal. Otherwise the deal will only go through if you accept\
 a cost, a task, or a lesser asset/service instead of what you asked for.',
        mixed: 'On a 7-9, the deal will only go through if you accept a cost,\
 a task, or a lesser asset/service instead of what you asked for.',
        fail: 'On a 6-, the deal will only go through if you call in a Favor.',
        stat: 'num',
        method: functions.moveRoll
    },
    barter: {
       name: 'Barter',
        key: ['barter'],
        text: 'BARTER: !barter +CARGO CLASS\nWhen you exchange a foreign unit of\
 cargo for local trade good, Roll+ that cargo\'s class.',
        greatSuccess: 'On a 13+, you attract the attention of a faction or\
 individual with a unique item or service to trade.',
        success: 'On a 10-12, you get a higher Class cargo of local goods in\
 exchange, to a max of Class 4.',
        mixed: 'On a 7-9, you get a higher Class cargo, to a max of Class 4,\
 and the GM chooses one flaw:\n - The negotiations take many days to complete.\n\
 - The goods need special care (fragile, hazardous, etc).\n\
 - The goods are very odd, distateful or bizarre.\n\
 - The provenance or legality of the goods is dubious.',
        fail: 'On a 6-, prepare for the worst.',
        stat: 'num',
        method: functions.moveRoll
    },
    advancement: {
       key: ['advance', 'advancement'],
       text: 'ADVANCEMENT:\n\
During the course of the game, when a player notices that any character\'s\
 actions fulfills their chosen trigger, every character gains 1 xp. Each\
 character\'s advancement can only trigger once per session.\n\n\
When a character has earned experience equal to their current number of skills,\
 their player does the follwoing in order:\n\
 1. Expend their accumulated experience points.\n\
 2. Choose a new skill from the career they were advancing.\n\
 3. Give up their current advancement method.\n\
 4. Choose a new advancement method, either in the same career or in a new career.\n\
(You cannot choose the same advancement method twice.)',
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
**EXAMPLE: (you may copy/paste and edit the example text)**\n!newmove name+"Fly High" command+"fly" roll+"2d6 +met" text+"When\
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