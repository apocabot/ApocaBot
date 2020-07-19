const functions = require('./../functions/urban-shadows.js');

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
 - CUSTOM MOVES: !custom\n\
 - DEBTS LIST: !debt\n\
 - SET APOCABOT PREFIX: !setprefix\n\
 - SET APOCABOT GAME: !setgame',
        method: function(){return this.text}
    },
    basicMoves: {
       key: ['basic', 'basicmoves'],
       text: 'BASIC MOVES LIST:\n\n\
 - UNLEASH AN ATTACK: !unleash\n\
 - ESCAPE A SITUATION: !escape\n\
 - PERSUADE AN NPC: !persuade\n\
 - FIGURE SOMEONE OUT: !figure\n\
 - MISLEAD, DISTRACT, OR TRICK: !mdt\n\
 - KEEP YOUR COOL: !kyc\n\
 - LET IT OUT: !let\n\
 - LEND A HAND OR GET IN THE WAY: !lah OR !gitw\n\
 - HIT THE STREETS: !hit\n\
 - PUT A FACE TO A NAME: !put\n\
 - INVESTIGATE A PLACE OF POWER: !inv\n\
 - DO SOMEONE A FAVOR: !favor\n\
 - CASH IN A DEBT: !cashin\n\
 - REFUSE TO HONOR A DEBT: !refuse\n\
 - DROP SOMEONE\'S NAME: !drop\n\
 - MARK CORRUPTION: !mark\n\
 - CLEAR CORRUPTION: !clear\n\
 - SESSION INTRO: !intro\n\
 - SESSION END: !end',
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
                BLOOD: ['blood', 0],
                HEART: ['heart', 0],
                MIND: ['mind', 0],
                SPIRIT: ['spirit', 0],
                MORTALITY: ['mort', 0],
                NIGHT: ['night', 0],
                POWER: ['power', 0],
                WILD: ['wild', 0],
                HARM: ['harm', `0 / 5`],
                CORRUPTION: ['corruption', 0]
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
!set name+Me blood-2 heart-1 mind+0 spirit+1 mort+2 night+1 power+0 wild-1',
        error: 'Incorrect input, use the format: !set name+bambino mort+1 blood-1 etc...',
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
 • urban-shadows\n\
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
EXAMPLE: !shift mort+1 will increase your Mortality stat by 1.\
 !shift harm+2 will add 2 segments to your Harm.',
        error: 'Incorrect input, use the format: !shift blood+1 harm+2 etc...\
 (this only works for numerical values)',
        method: functions.shift
    },
    roll: {
        key: ['roll'],
        text: 'ROLL DICE: !roll xdy +z\n\
Use the format !roll xdy +z where x = number of die, y = faces on die, and z = a positive\
 or negative modifier, a stat, another +xdy, or any combination.\n\
EXAMPLE: !roll 2d6 +1  OR  !roll 2d6 +blood  OR !roll 2d6 +1d4 (SPACES MATTER!)',
        error: 'INCORRECT INPUT: Please use the format !roll xdy +z where x = number\
 of die, y = faces on die, and z = positive or negative modifier, if any.\n\
EXAMPLE: !roll 2d6 +1  OR  !roll 2d6 +blood (SPACES MATTER!)',
        method: functions.xdyRoll
    },
   unleashAnAttack: {
       name: "Unleash An Attack",
       key: ['unleash', 'attack', 'unleashattack', 'unleashanattack'],
       text: 'When you unleash an attack on someone, roll with Blood.',
       success: 'On a 10+, you inflict harm as established, and choose 1:\n\
 • Inflict terrible harm\n\
 • Take something from them',
       mixed: 'On a 7–9, you inflict harm as established, and choose 1:\n\
 • Inflict terrible harm\n\
 • Take something from them\n\
 And also choose 1 from below as well:\n\
 • They inflict harm on you\n\
 • You find yourself in a bad spot',
       fail: 'On a 6-, brace yourself...',
       stat: 'blood',
       method: functions.moveRoll
   },
    escapeASituation: {
       name: 'Escape A Situation',
       key: ['escape', 'escapesituation', 'situation', 'escapeasituatio'],
       text: 'When you take advantage of an opening to escape a situation, roll with Blood.',
       success: 'On a 10+, you get away and choose 1:\n\n\
 • You suffer harm during your escape\n\
 • You end up in another dangerous situation\n\
 • You leave something important behind\n\
 • You owe someone a Debt for your escape\n\
 • You give in to your base nature and mark corruption',
       mixed: 'On a 7–9, you get away and choose 2:\n\n\
 • You suffer harm during your escape\n\
 • You end up in another dangerous situation\n\
 • You leave something important behind\n\
 • You owe someone a Debt for your escape\n\
 • You give in to your base nature and mark corruption',
       fail: 'On a 6-, brace yourself...',
       stat: 'blood',
       method: functions.moveRoll
   },
   persuadeAnNPC: {
    name: 'Persuade An NPC',
    key: ['persuade', 'persuadenpc', 'persuadeannpc'],
    text: 'When you persuade an NPC through seduction, promises, or threats, roll with Heart.\
 If you **cash in a Debt** you have with them before rolling, you may __add +3__ to your roll.',
    success: 'On a 10+, they do what you ask.',
    mixed: 'On a 7–9, they modify the terms or demand a Debt.',
    fail: 'On a 6-, brace yourself...',
    stat: 'heart',
    method: functions.moveRoll
    },
    figureSomeoneOut: {
       name: 'Figure Someone Out',
       key: ['figure', 'figureout', 'figuresomeone', 'figuresomeoneout'],
       text: 'When you try to figure someone out, roll with Mind.\n\n\
 • Who’s pulling your character’s strings?\n\
 • What’s your character’s beef with ______?\n\
 • What’s your character hoping to get from ______?\n\
 • How could I get your character to ______?\n\
 • What does your character worry might happen?\n\
 • How could I put your character in my Debt?',
       success: 'On a 10+, hold 2. While you\'re interacting with them, spend your hold 1-for-1 to\
 ask their player a question:\n\n\
 • Who’s pulling your character’s strings?\n\
 • What’s your character’s beef with ______?\n\
 • What’s your character hoping to get from ______?\n\
 • How could I get your character to ______?\n\
 • What does your character worry might happen?\n\
 • How could I put your character in my Debt?\n\n\
If you\'re in their Faction, ask an additional question, even on a miss.',
       mixed: 'On a 7–9, hold 2 and they hold 1 on you as well. While you\'re interacting with them,\
 spend your hold 1-for-1 to ask their player a question:\n\n\
 • Who’s pulling your character’s strings?\n\
 • What’s your character’s beef with ______?\n\
 • What’s your character hoping to get from ______?\n\
 • How could I get your character to ______?\n\
 • What does your character worry might happen?\n\
 • How could I put your character in my Debt?\n\n\
If you\'re in their Faction, ask an additional question, even on a miss.',
       fail: 'On a 6-, if you\'re in their Faction, ask a question.\n\n\
 • Who’s pulling your character’s strings?\n\
 • What’s your character’s beef with ______?\n\
 • What’s your character hoping to get from ______?\n\
 • How could I get your character to ______?\n\
 • What does your character worry might happen?\n\
 • How could I put your character in my Debt?',
       stat: 'mind',
       method: functions.moveRoll
    },
    misleadDistractOrTrick: {
        name: 'Mislead, Distract, Or Trick',
        key: ['mislead', 'distract', 'trick', 'mdt', 'mdot'],
        text: 'When you try to mislead, distract, or trick someone, roll with Mind.',
        success: 'On a 10+, they are fooled, at least for a moment. Pick 3:\n\n\
 • You create an opportunity\n\
 • You expose a weakness or flaw\n\
 • You confuse them for some time\n\
 • You avoid further entanglement',
        mixed: 'On a 7–9, On a 10+, they are fooled, at least for a moment. Pick 2:\n\n\
 • You create an opportunity\n\
 • You expose a weakness or flaw\n\
 • You confuse them for some time\n\
 • You avoid further entanglement',
        fail: 'On a 6-, brace yourself...',
        stat: 'mind',
        method: functions.moveRoll
    },
    letItOut: {
        name: 'Let It Out',
        key: ['let', 'letout', 'letitout'],
        text: 'When you let out the power within you, roll with Spirit.',
        success: 'On a 10+, choose 1 and mark corruption. Also, you may ignore the corruption or\
 choose another from the list.\n\n\
 • Take +1 forward on your next roll\n\
 • Extend your senses, supernatural or otherwise\n\
 • Frighten, intimidate, or impress your opposition\n\
 • Take definite hold of something vulnerable or exposed',
        mixed: 'On a 7–9, choose 1 and mark corruption.\n\n\
 • Take +1 forward on your next roll\n\
 • Extend your senses, supernatural or otherwise\n\
 • Frighten, intimidate, or impress your opposition\n\
 • Take definite hold of something vulnerable or exposed',
        fail: 'On a 6-, brace yourself...',
        stat: 'spirit',
        method: functions.moveRoll
    },
    lendAHandorGetInTheWay: {
        name: 'Lend A Hand Or Get In The Way',
        key: ['lend', 'get', 'lendhand', 'getinway', 'lendahand', 'getintheway', 'lah', 'gitw'],
        text: 'When you lend a hand or get in the way after a PC has rolled, roll with their Faction.',
        success: 'On a 10+, give them a +1 or -2 to their roll.',
        mixed: 'On a 7–9, give them a +1 or -2 to their roll and you expose yourself to danger, entanglement, or cost.',
        fail: 'On a 6-, brace yourself...',
        stat: 'stat',
        method: functions.moveRoll
    },
    hitTheStreets: {
        name: 'Hit The Streets',
        key: ['hit', 'hitstreets', 'streets', 'hitthestreets'],
        text: 'When you hit the streets to get what you need, name who you’re going to and roll with their Faction.',
        success: 'On a 10+, they’re available and have the stuff.',
        mixed: 'On a 7–9, choose 1:\n\n\
 • Whoever you\'re going to is juggling their own problems\n\
 • Whatever you need is more costly than anticipated',
        fail: 'On a 6-, brace yourself...',
        stat: 'stat',
        method: functions.moveRoll
    },
    putAFaceToAName: {
        name: 'Put A Face To A Name',
        key: ['put', 'putface', 'putfacetoname', 'face', 'name'],
        text: 'When you put a face to a name or vice versa, roll with their Faction.',
        success: 'On a 10+, you know their reputation; the GM tells you what most people know about them.\
 You’ve also dealt with them before; learn something interesting and useful about them or they owe you a Debt.',
        mixed: 'On a 7–9, you know their reputation; the GM tells you what most people know about them.',
        fail: 'On a 6-, you don’t know them or you owe them; the MC will tell you which',
        stat: 'stat',
        method: functions.moveRoll
    },
    investigateAPlaceOfPower: {
        name: 'Investigate A Place Of Power',
        key: ['investigate', 'invest', 'inv', 'investigateplace', 'place', 'power'],
        text: 'When you investigate a place of power, roll with the Faction that owns it.',
        success: 'On a 10+, you see below the surface to the reality underneath. You can also\
 ask the MC one question about the schemes and politics of the Faction in question',
        mixed: 'On a 7–9, you see below the surface to the reality underneath.',
        fail: 'On a 6-, brace yourself...',
        stat: 'stat',
        method: functions.moveRoll
    },
    refuseToHonorADebt: {
        name: 'Refuse To Honor A Debt',
        key: ['refuse', 'honor', 'debt', 'refusetohonordebt'],
        text: 'When you refuse to honor a debt, roll with Heart.',
        success: 'On a 10+, you weasel out of the current deal, but still owe the Debt.',
        mixed: 'On a 7–9, you weasel out of the current deal, but still owe the Debt. Choose 1:\n\n\
 • You owe them an additional Debt\n\
 • You lose face with their faction\n\
 • You mark corruption',
        fail: 'On a 6-, you can’t avoid the noose. You either honor your Debt or face the consequences:\
 they pick two from the list below or force you to lose all the Debts owed to you.\n\n\
 • You owe them an additional Debt\n\
 • You lose face with their faction\n\
 • You mark corruption',
        stat: 'heart',
        method: functions.moveRoll
    },
    dropSomeonesName: {
        name: 'Drop Someone\'s Name',
        key: ['drop', 'dropname', 'namedrop', 'name'],
        text: 'When you drop the name of someone who owes you a Debt, roll with their Faction.',
        success: 'On a 10+, their name carries weight and gives you an opening or opportunity.\
 You also keep the Debt and mark their Faction.',
        mixed: 'On a 7–9, their name carries weight and gives you an opening or opportunity.',
        fail: 'On a 6-, erase the Debt and brace yourself...',
        stat: 'stat',
        method: functions.moveRoll
    },
    sessionIntro: {
        name: 'Session Intro',
        key: ['intro', 'sessionintro'],
        text: 'At the beginning of every session, announce which character your character trusts the least;\
 their player will spotlight a Faction for your character (that isn’t already marked). Mark that Faction.\
 Tell the MC about a rumor or conflict that you’ve heard about that Faction, building on previous established\
 information if you’d like, and roll with the Faction.',
        success: 'On a 10+, you’re prepared for the conflict you laid out: you’ve got a Debt on someone\
 in that Faction or a useful piece of information or equipment, your choice',
        mixed: 'On a 7–9, you’re neck deep in it: you owe someone in that Fac- tion a Debt,\
 and someone in that Faction owes a Debt to you.',
        fail: 'On a 6-, you’re caught flat-footed, unprepared, or unaware: the MC will tell you who is coming at you.',
        stat: 'stat',
        method: functions.moveRoll
    },
    sessionIntro: {
        name: 'Session End',
        key: ['end', 'sessionend'],
        text: 'At the end of every session:\n\n\
 • If you learned something meaningful about a Faction, increase your score in that Faction by 1 and decrease your\
 score in a different Faction by 1. Tell the MC how your relationships to those communities have changed.\n\
 • If someone did you a favor at a cost, tell the group; you owe them a Debt.\n\
 • If you did someone a favor without redress, tell the group; they owe you a Debt.',
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
**EXAMPLE: (you may copy/paste and edit the example text)**\n!newmove name+"Fly High" command+"fly" roll+"2d6 +spirit" text+"When\
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


}