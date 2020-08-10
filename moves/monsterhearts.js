const functions = require('./../functions/monsterhearts.js');

//text library object
module.exports = moves = {
    menu: {
        key: ['help', 'menu',],
        text: 'ALL APOCABOT COMMANDS BEGIN WITH PREFIX (default ! ).\n\
ADD SUFFIX ? TO ANY COMMAND FOR MOVE INFO:\n\n\
 - NEWCHARACTER: !newcharacter\n\
 - CHECK CHARACTER STATS: !character\n\
 - SET CHARACTER STATS: !set\n\
 - SHIFT CHARACTER STATS: !shift\n\
 - ROLL SOME DICE: !roll\n\
 - BASIC MOVES LIST: !basic\n\
 - GROWING UP MOVES LIST: !grown\n\
 - CUSTOM MOVES: !custom\n\
 - SET EXPERIENCE ON A MISS: !expOnMiss\n\
 - SET APOCABOT PREFIX: !setprefix\n\
 - SET APOCABOT GAME: !setgame',
        method: function(){return this.text}
    },
    basicMoves: {
        key: [`basic`, 'basicmoves'],
        text: 'BASIC MOVES LIST:\n\n\
 - TURN SOMEONE ON: !tso *or* !turnon\n\
 - SHUT SOMEONE DOWN: !ssd *or* !shutdown\n\
 - KEEP YOUR COOL: !kyc *or* !keepcool\n\
 - LASH OUT PHYSICALLY: !lop *or* !lashout\n\
 - RUNAWAY: !run\n\
 - GAZE INTO THE ABYSS: !gita *or* !gaze\n\
 - GAIN A STRING: !gain\n\
 - SPEND A STRING: !spend\n\
 - ADD A CONDITION: !cond add\n\
 - REMOVE A CONDITION: !cond remove',
        method: function(){return this.text}
   },
    growingUpMoves: {
        key: ['grown', 'growingupmoves'],
        text: 'GROWING UP MOVES LIST:\n\n\
 - MAKE OTHERS FEEL BEAUTIFUL: !mofb\n\
 - CALL PEOPLE ON THEIR SHIT: !callout\n\
 - INTERVENE IN AN ACT OF VIOLENCE: !intervene\n\
 - SHARE YOUR PAIN: !share',
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
                HOT: ['hot', 0],
                COLD: ['cold', 0],
                VOLATILE: ['vol', 0],
                DARK: ['dark', 0],
                HARM: ['harm', '0 / 4'],
                EXP: ['exp', '0 / 5'],
                CONDITIONS: [ 'conditions', [] ],
                STRINGS: [ 'strings', {} ]
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
        key: ['character', 'charactersheet', 'sheet'],
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
!set name+Me hot-2 cold-1 vol+0 dark+1',
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
 • the-veil\n\
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
EXAMPLE: !shift harm+1 will increase your harm by 1',
        error: 'Incorrect input, use the format: !shift hot+1 etc...\
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
EXAMPLE: !roll 2d6 +1  OR  !roll 2d6 +cold (SPACES MATTER!)',
        method: functions.xdyRoll
    },
    turnSomeoneOn: {
        name: "Turn Someone On",
        key: ['tso', 'turnon', 'turnsomeoneon'],
        text: 'When you turn someone on, roll with Hot',
        success: 'On a 10 up, gain a String on them and they choose a reaction from below:\n\
 • I give myself to you\n\
 • I promise something I think you want, or\n\
 • I get embarrassed and act awkward.',
        mixed: 'On a 7-9, they can either give you a String or choose one of the reactions.\n\
 • I give myself to you\n\
 • I promise something I think you want, or\n\
 • I get embarrassed and act awkward.',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'hot',
        method: functions.moveRoll
    },
    shutSomeoneDown: {
        name: "Shut Someone Down",
        key: ['ssd', 'shutdown', 'shutsomeonedown'],
        text: 'When you shut someone down, roll with Cold.',
        success: 'On a 10 up, choose one from below\n\
 • They lose a String on you,\n\
 • If they have no Strings on you, gain one on them,\n\
 • They gain a Condition, or\n\
 • You take 1 Forward.',
        mixed: 'On a 7-9, choose one from below, but you come across poorly, and they give\n\
        you a Condition in return:\n\
 • They lose a String on you,\n\
 • If they have no Strings on you, gain one on them,\n\
 • They gain a Condition, or\n\
 • You take 1 Forward.',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'cold',
        method: functions.moveRoll
    },
    keepYourCool: {
        name: "Keep Your Cool",
        key: ['kyc', 'keepcool', 'keepyourcool'],
        text: 'KEEP YOUR COOL: !keepcool\nWhen you keep your cool and act despite fear, name what\n\
        you’re afraid of, roll with Cold.',
        success: 'On a 10 up, you keep your cool and gain insight: ask the MC a question about the\n\
        situation and take 1 Forward to acting on that information',
        mixed: 'On a 7-9, the MC will tell you how your actions would leave you vulnerable, and you\n\
        can choose to back down or go through with it.',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'cold',
        method: functions.moveRoll
    },
    lashOutPhysically: {
        name: "Lash Out Physically",
        key: ['lop', 'lashout', 'lashoutphysically'],
        text: 'When you lash out physically, roll with Volatile.',
        success: 'On a 10 up, you deal them harm, and they choke up momentarily before they can react.',
        mixed: 'On a 7-9, you harm them but choose one:\n\
 • They learn something about your true nature and gain a String on you,\n\
 • The MC decides how bad the harm turns out,\n\
 • You become your Darkest Self',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'volatile',
        method: functions.moveRoll
    },
    runAway: {
        name: "Run Away",
        key: ['run', 'away', 'runaway'],
        text: 'When you run away, roll with Volatile.',
        success: 'On a 10 up, you get away to a safe place.\n\
 • You run into something worse,\n\
 • You cause a big scene, or\n\
 • You leave something behind.',
        mixed: 'On a 7-9, you get away but choose one:\n\
 • You run into something worse,\n\
 • You cause a big scene, or\n\
 • You leave something behind.',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'volatile',
        method: functions.moveRoll
    },
    gazeIntoTheAbyss: {
        name: "Gaze Into The Abyss",
        key: ['gaze', 'gita', 'gazeintotheabyss', 'abyss'],
        text: 'When you gaze into the abyss, name what you’re looking for, roll with Dark.',
        success: 'On a 10 up, the abyss shows you lucid visions, and you take 1 Forward to addressing them.',
        mixed: 'On a 7-9, the abyss shows you confusing and alarming visions, but you get your answer nonetheless',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'dark',
        method: functions.moveRoll
    },
    makeOthersFeelBeautiful: {
        name: "Make Others Feel Beautiful",
        key: ['mofb', 'makeothersfeelbeautiful', 'beautiful'],
        text: 'When you make others feel beautiful, roll with Hot.',
        success: 'On a 10 up, choose two from below.\n\
 • they take 1 Forward,\n\
 • they remove a Condition,\n\
 • they mark experience, or\n\
 • you take 1 Forward.',
        mixed: 'On a 7-9, you can tempt them to do what you want, as if you\'d just spent a String.',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'hot',
        method: functions.moveRoll
    },
    callPeopleOnTheirShit: {
        name: "Call People On Their Shit",
        key: ['cpots', 'callout'],
        text: 'When you call people on their shit, roll with Cold.',
        success: 'On a 10 up, choose one from below.\n\
 • they lose a String against someone else, or\n\
 • they choke up, break down, or bail.',
        mixed: 'On a 7-9, choose one from below, but you come across poorly, and they give you a\n\
Condition in return.\n\
• they lose a String against someone else, or\n\
• they choke up, break down, or bail.',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'cold',
        method: functions.moveRoll
    },
    interveneInAnActOfViolence: {
        name: "Intervene in an Act Of Violence",
        key: ['intervene', 'iiaaov'],
        text: 'When you intervene in an act of violence against someone else, roll with Volatile.',
        success: 'On a 10 up, you get in the way and they need to deal with you first. Whoever you\'re\n\
protecting gets to react, and takes 1 Forward to whatever they decide to do.',
        mixed: 'On a 7-9, you\'re in the middle of it, and the assailant chooses from below.\n\
 • I back off,\n\
 • I take whatever harm you want to give me as I push past, or\n\
 • I redirect the violence to you.',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'volatile',
        method: functions.moveRoll
    },
    shareYourPain: {
        name: "Share Your Pain",
        key: ['syp', 'share', 'pain'],
        text: 'When you share your pain, roll with Dark.',
        success: 'On a 10 up, choose two.\n\
 • remove a Condition from yourself,\n\
 • remove a Condition from someone who listened,\n\
 • take 1 Forward toward helping yourself, or\n\
 • those who listened take 1 Forward to helping you.',
        mixed: 'On a 7-9, choose one:\n\
 • remove a Condition from yourself,\n\
 • remove a Condition from someone who listened,\n\
 • take 1 Forward toward helping yourself, or\n\
 • those who listened take 1 Forward to helping you.',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'dark',
        method: functions.moveRoll
    },
    pullingStrings: {
        name: "Pulling Strings",
        key: ['strings'],
        text: 'When you spend a String on someone, choose one:\n\
 • Tempt them to do what you want,\n\
 • Give them a Condition,\n\
 • Add 1 to your roll against them, or\n\
 • Add 1 to the harm you deal them.',
        method: function(){return this.text}
    },
    healing: {
        key: ['healing', 'heal'],
        text: 'HEALING: !heal\n\When you take time to tend to your wounds, once per session you\n\
may heal 1 Harm. If someone else is there with you, tending to your wounds delicately and intimately\n\
- and perhaps with erotic subtext - you may heal an additional 1 Harm.',
        method: function(){return this.text}
    },
    skirtingDeath: {
        name: "Skirting Death",
        key: ['skirt', 'death', 'skirtingdeath'],
        text: 'To avoid death, erase all harm and choose one:\n\
 • Become your Darkest Self.\n\
 • Lose all Strings you have on everybody.',
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
 **EXAMPLE: (you may copy/paste and edit the example text)**\n!newmove name+"Fly High" command+"fly" roll+"2d6 +vol" text+"When\
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
    },
    setExpOnAMiss: {
        key: ['exponmiss', 'xponmiss', 'exponamiss', 'xponamiss'],
        text: 'Set the rule for Experience on a miss. To set the rule, enter __!expOnMiss__ followed by yes or no.\n\
• yes: Whenever a miss is rolled using a move command, a reminder will be displayed to mark Experience.\n\
• no: No reminder will be displayed.',
        method: functions.setExpOnAMiss
    },
    gainString: {
        key: ['gain', 'gainstring', 'addstring'],
        text: 'To gain a string on someone, enter !gain <Name>.\n\n\
EXAMPLE: __!gain Lucky__ will give you one string on Lucky. If you enter __!gain Lucky__ again, you will now have\
 two strings on Lucky. Enter __!character__ to see your list of strings.',
        method: functions.gainString
    },
    spendString: {
        key: ['spend', 'spendstring', 'removestring'],
        text: 'To spend a string on someone, enter !spend <Name>\n\
When you spend a String on someone, choose one:\n\
• Tempt them to do what you want,\n\
• Give them a Condition,\n\
• Add 1 to your roll against them, or\n\
• Add 1 to the harm you deal them.\n\n\
EXAMPLE: __!spend Lucky__ will remove 1 from your strings on Lucky. If your strings reach 0,\
 the character will be removed from your list.',
        method: functions.spendString
    },
    conditionMove: {
        key: ['condition', 'cond', 'con'],
        text: 'Add or remove a Condition. To add a Condition, enter !cond add <Condition>. To remove\n\
a condition, enter !cond remove <index number>.\n\n\
EXAMPLE: __!cond add drained__ will add the condition *Drained* to your list. To remove the condition,\
 find its index number on your list with __!character__. If *Drained* is in position 1), then __!cond remove 1__\
 will remove it from your list.',
        method: functions.conditionMove
    }
}
