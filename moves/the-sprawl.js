const functions = require('./../functions/the-sprawl.js');

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
 - MATRIX MOVES LIST: !matrix\n\
 - OTHER MOVES LIST: !other\n\
 - CUSTOM MOVES: !custom\n\
 - SET APOCABOT PREFIX: !setprefix\n\
 - SET APOCABOT GAME: !setgame',
        method: function(){return this.text}
    },
    basicMoves: {
       key: ['basic', 'basicmoves'],
       text: 'BASIC MOVES LIST:\n\n\
 - ACT UNDER PRESSURE: !act\n\
 - APPLY FIRST AID: !apply\n\
 - ASSESS: !assess\n\
 - PLAY HARDBALL: !play\n\
 - ACQUIRE AGRICULTURAL PROPERTY: !aap\n\
 - MIX IT UP: !mix\n\
 - RESEARCH: !research\n\
 - FAST TALK: !talk\n\
 - HIT THE STREET: !hit\n\
 - HELP OR INTERFERE: !hoi\n\
 - GO UNDER THE KNIFE: !knife\n\
 - GET THE JOB: !job\n\
 - GETTING PAID: !paid\n\
 - SUFFER HARM: !suffer',
       method: function(){return this.text}
   },
      matrixMoves: {
       key: ['matrix', 'matrixmoves'],
       text: 'MATRIX MOVES LIST:\n\n\
 - LOGIN: !login\n\
 - COMPROMISE SECURITY: !comp\n\
 - MANIPULATE SYSTMES: !manip\n\
 - MELT ICE: !melt\n\
 - JACK OUT: !jack',
       method: function(){return this.text}
   },
   otherMoves: {
       key: ['other', 'othermoves'],
       text: 'OTHER MOVES LIST:\n\n\
 - DECLARE A CONTACT: !contact\n\
 - PRODUCE EQUIPMENT: !equipment\n\
 - REVEAL KNOWLEDGE: !knowledge\n\
 - CONDUCT AN OPERATION: !operation\n\
 - CREATE RANDOM NPC: !npc\n\
 - CREATE RANDOM DRONE: !drone\n\
 - CREATE RANDOM WEAPON: !weapon',
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
                EDGE: ['edge', 0],
                MEAT: ['meat', 0],
                MIND: ['mind', 0],
                STYLE: ['style', 0],
                SYNTH: ['synth', 0],
                CRED: ['cred', 5],
                EXP: ['exp', '0 / 10'],
                HARM: ['harm', `It's 12:00.`]
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
!set name+Me cool-2 edge-1 meat+0 mind+1 style+2 synth+3',
        error: 'Incorrect input, use the format: !set name+bambino cool+1 style-1 etc...',
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
        error: 'Incorrect input, use the format: !shift synth+1 harm+2 etc...\
 (this only works for numerical values)',
        method: functions.shift
    },
    roll: {
        key: ['roll'],
        text: 'ROLL DICE: !roll xdy +z\n\
Use the format !roll xdy +z where x = number of die, y = faces on die, and z = a positive\
 or negative modifier, a stat, another +xdy, or any combination.\n\
EXAMPLE: !roll 2d6 +1  OR  !roll 2d6 +cool  OR !roll 2d6 +1d4 (SPACES MATTER!)',
        error: 'INCORRECT INPUT: Please use the format !roll xdy +z where x = number\
 of die, y = faces on die, and z = positive or negative modifier, if any.\n\
EXAMPLE: !roll 2d6 +1  OR  !roll 2d6 +cool (SPACES MATTER!)',
        method: functions.xdyRoll
    },
   actUnderPressure: {
       name: "Act Under Pressure",
       key: ['aup', 'act', 'underpressure', 'actunderpressure'],
       text: 'When you race against the clock, act while in danger, or act to avoid danger,\
 roll +Cool.',
       success: 'On a 10+, you do it, no problem.',
       mixed: 'On a 7–9, you stumble, hesitate, or flinch: the MC will offer you a worse outcome,\
 hard bargain, or ugly choice.',
       fail: 'On a 6-, something goes wrong...',
       stat: 'cool',
       method: functions.moveRoll
   },
    applyFirstAid: {
       name: "Apply First Aid",
       key: ['apply', 'firstaid', 'applyfirstaid', 'afa'],
       text: 'When you treat someone’s wounds using appropriate medical equipment, roll +Cool.',
       success: 'On a 10+, if their Harm Clock is at 2100 or less, reduce their harm\
 by two segments. If their Harm Clock is at more than 2100, reduce their harm by one segment.',
       mixed: 'On a 7–9, reduce their harm by one segment. If their Harm Clock is still\
 at more than 2100, they take -1 ongoing until they receive proper medical attention.',
       fail: 'On a 6-, something goes wrong...',
       stat: 'cool',
       method: functions.moveRoll
   },
    assess: {
       name: "Assess",
       key: ['assess', 'ass'],
       text: 'When you closely study a person, place or situation, or when you quickly\
 size up an opponent or a charged situation, roll +Edge.\n\n\
 • What potential complication do I need to be wary of?\n\
 • What do I notice despite an effort to conceal it?\n\
 • How is ______ vulnerable to me?\n\
 • How can I avoid trouble or hide here?\n\
 • What is my best way in/way out/way past?\n\
 • Where can I gain the most advantage?\n\
 • Who or what is my biggest threat in this situation?\n\
 • Who or what is in control here?',
       success: 'On a 10+, gain 3 hold. In the ensuing action, you may spend 1 hold at any time\
 to ask the MC a question from the list below if your examination could have revealed the answer.\
 The MC may ask you questions to clarify your intent. Take +1 forward when acting on the answers.\n\n\
 • What potential complication do I need to be wary of?\n\
 • What do I notice despite an effort to conceal it?\n\
 • How is ______ vulnerable to me?\n\
 • How can I avoid trouble or hide here?\n\
 • What is my best way in/way out/way past?\n\
 • Where can I gain the most advantage?\n\
 • Who or what is my biggest threat in this situation?\n\
 • Who or what is in control here?',
       mixed: 'On a 7–9, gain 1 hold. In the ensuing action, you may spend 1 hold at any time\
 to ask the MC a question from the list below if your examination could have revealed the answer.\
 The MC may ask you questions to clarify your intent. Take +1 forward when acting on the answers.\n\n\
 • What potential complication do I need to be wary of?\n\
 • What do I notice despite an effort to conceal it?\n\
 • How is ______ vulnerable to me?\n\
 • How can I avoid trouble or hide here?\n\
 • What is my best way in/way out/way past?\n\
 • Where can I gain the most advantage?\n\
 • Who or what is my biggest threat in this situation?\n\
 • Who or what is in control here?',
       fail: 'On a 6-, something goes wrong...',
       stat: 'edge',
       method: functions.moveRoll
   },
    playHardball: {
       name: "Play Hardball",
       key: ['play', 'hardball', 'playhardball'],
       text: 'When you get in someone’s face threatening violence and you intend to carry through,\
 roll +Edge.',
       success: 'On a 10+, NPCs do what you want. PCs choose: do what you want,\
 or suffer the established consequences.',
       mixed: 'On a 7–9, __for NPCs__, the MC chooses 1:\n\
 • They attempt to remove you as a threat, but not before suffering the established consequences.\n\
 • They do it, but they want payback. Add them as a Threat.\n\
 • They do it, but tell someone all about it. Advance the appropriate Mission Clock.\n\n\
__PCs choose__: do what you want, or suffer the established consequences.\
 They gain +1 forward to act against you.',
       fail: 'On a 6-, something goes wrong...',
       stat: 'edge',
       method: functions.moveRoll
   },
    acquireAgriculturalProperty: {
       name: "Acquire Agricultural Property",
       key: ['aap', 'acquire', 'acquireagriculturalproperty'],
       text: 'When you hit 0000 on your Harm Clock, roll +Meat.',
       success: 'On a 10+, you survive until the medics arrive.',
       mixed: 'On a 7–9, you survive at a cost. Pick one: +owned, substandard treatment\
 (-1 to a stat), cyberware damage (give one piece of cyberware a negative tag).',
       fail: 'On a 6-, you bleed out on the street.',
       stat: 'meat',
       method: functions.moveRoll
   },
    mixItUp: {
       name: "Mix It Up",
       key: ['miu', 'mix', 'mixitup'],
       text: 'When you use violence against an armed force to seize control of an objective,\
 state that objective and roll +Meat.',
       success: 'On a 10+, you achieve your objective.',
       mixed: 'On a 7–9, you achieve your objective, but choose 2:\n\n\
 • You make too much noise. Advance the relevant Mission Clock.\n\
 • You take harm as established by the fiction.\n\
 • An ally takes harm as established by the fiction.\n\
 • Something of value breaks.',
       fail: 'On a 6-, something goes wrong...',
       stat: 'meat',
       method: functions.moveRoll
   },
    research: {
       name: "Research",
       key: ['research'],
       text: 'When you investigate a person, place, object, or service using a library,\
 dossier or database (or combination of them), ask a question from the list below and roll +Mind.\n\n\
 • Where would I find ______?\n\
 • How secure is ______?\n\
 • Who or what is related to ______?\n\
 • Who owned or employed ______?\n\
 • Who or what is ______ most valuable to?\n\
 • What is the relationship between ______ and ______?',
       success: 'On a 10+, take [intel]; the MC will answer your question and answer a follow-up\
 question from this list as well:\n\n\
 • Where would I find ______?\n\
 • How secure is ______?\n\
 • Who or what is related to ______?\n\
 • Who owned or employed ______?\n\
 • Who or what is ______ most valuable to?\n\
 • What is the relationship between ______ and ______?',
       mixed: 'On a 7–9, take [intel]; the MC will answer your question:\n\n\
 • Where would I find ______?\n\
 • How secure is ______?\n\
 • Who or what is related to ______?\n\
 • Who owned or employed ______?\n\
 • Who or what is ______ most valuable to?\n\
 • What is the relationship between ______ and ______?',
       fail: 'On a 6-, the MC will answer your question... and make a move.',
       stat: 'mind',
       method: functions.moveRoll
   },
    fastTalk: {
       name: "Fast Talk",
       key: ['fast', 'talk', 'fasttalk'],
       text: 'When you try to convince someone to do what you want with promises,\
 lies, or bluster, roll +Style.',
       success: 'On a 10+, __NPCs__ do what you want. __PCs__ choose whether to do it or not.\
 If they do, they mark experience. If they don’t, they must act under pressure to go\
 against your stated wishes.',
       mixed: 'On a 7–9, __NPCs__ do it, but someone will find out: the MC will advance\
 the appropriate Countdown Clock. For __PCs__ choose one:\n\n\
 • If they do what you want, they mark experience.\n\
 • If they don’t do it, they must act under pressure to go against your stated wishes.\n\
Then it’s up to them.',
       fail: 'On a 6-, something goes wrong...',
       stat: 'style',
       method: functions.moveRoll
   },
    hitTheStreet: {
       name: "Hit The Street",
       key: ['hit', 'hitstreet', 'street', 'hitthestreet'],
       text: 'When you go to a Contact for help, roll +Style.',
       success: 'On a 10+, you get what you want, and you get a little something extra\
 (choose either [intel] or [gear]).',
       mixed: 'On a 7–9, you get what you want, but choose 2 from the list below:\n\n\
 • Your request is going to cost you extra.\n\
 • Your request is going to take some time to put together.\n\
 • Your request is going to attract unwanted attention, complications or consequences.\n\
 • Your contact needs you to help them out with something. If you turn them down take -1\
 ongoing to this move till you make it right.',
       fail: 'On a 6-, something goes wrong...',
       stat: 'style',
       method: functions.moveRoll
   },
    helpOrInterfere: {
       name: "Help Or Interfere",
       key: ['hoi', 'helporinterfere', 'helpinterfere'],
       text: 'When you help or hinder another character, roll +Links with them.',
       success: 'On a 10+, they take +1 or -2 forward, your choice.',
       mixed: 'On a 7–9, they take +1 or -2 forward, your choice. But, you are implicated in\
 the results of the other character’s move and may expose yourself to danger, retribution, or cost.',
       fail: 'On a 6-, something goes wrong...',
       stat: 'num',
       method: functions.moveRoll
   },
    goUnderTheKnife: {
       name: "Go Under The Knife",
       key: ['knife', 'underknife', 'gounder', 'gounderknife', 'goundertheknife', 'go'],
       text: 'When you have new cyberware installed by a street doctor, roll +Cred spent (max +2).',
       success: 'On a 10+, the operation was a complete success.',
       mixed: 'On a 7–9, the cyberware doesn’t work as well as advertised, choose one:\
 *+unreliable*, *+substandard*, *+hardware decay*, *+damaging*.\n\n\
 *+damaging*: sometimes it hurts like hell and eventually it will do permanent nerve damage.\n\
 *+hardware decay*: it works now, but it’s just a matter of time...\n\
 *+substandard*: it works, but not as well as it should.\n\
 *+unreliable*: sometimes it doesn’t work.',
       fail: 'On a 6-, there have been... complications.',
       stat: 'num',
       method: functions.moveRoll
   },
    getTheJob: {
       name: "Get The Job",
       key: ['getjob', 'get', 'job', 'getthejob'],
       text: 'When you negotiate the terms of a job, roll +Edge.',
       success: 'On a 10+, choose 3 from the list below:\n\n\
 • The employer provides useful information [intel].\n\
 • The employer provides useful assets [gear].\n\
 • The job pays well.\n\
 • The meeting doesn’t attract attention.\n\
 • The employer is identifiable.',
       mixed: 'On a 7–9, choose 1 from the list below:\n\n\
 • The employer provides useful information [intel].\n\
 • The employer provides useful assets [gear].\n\
 • The job pays well.\n\
 • The meeting doesn’t attract attention.\n\
 • The employer is identifiable.',
       fail: 'On a 6-, something goes wrong...',
       stat: 'edge',
       method: functions.moveRoll
   },
    gettingPaid: {
       name: "Getting Paid",
       key: ['gettingpaid', 'getpaid', 'paid'],
       text: 'When you go to a meet to get paid by your employer, roll and add the number\
 of unfilled segments on the Legwork Clock.',
       success: 'On a 10+, choose 3 from the list below:\n\n\
 • It’s not a set-up or an ambush.\n\
 • You are paid in full.\n\
 • The meeting doesn’t attract the attention of outside parties.\n\
 • The employer is identifiable.\n\
 • You learned something from the mission; everyone marks experience.',
       mixed: 'On a 7–9, choose 1 from the list below:\n\n\
 • It’s not a set-up or an ambush.\n\
 • You are paid in full.\n\
 • The meeting doesn’t attract the attention of outside parties.\n\
 • The employer is identifiable.\n\
 • You learned something from the mission; everyone marks experience.',
       fail: 'On a 6-, something goes wrong...',
       stat: 'num',
       method: functions.moveRoll
   },
    harm: {
       name: "Suffer Harm",
       key: ['harm', 'suffer', 'sufferharm'],
       text: 'When you suffer harm (even 0-harm or s-harm) lower the harm suffered\
 by the level of your armor (if any), fill in a number of segments on your Harm Clock\
 equal to the remaining harm, and roll +harm suffered.',
       success: 'On a 10+, choose 1:\n\n\
 • You’re out of action: unconscious, trapped, incoherent or panicked.\n\
 • Take the full harm of the attack, before it was reduced by armor;\
 if you already took the full harm of the attack, take +1-harm.\n\
 • Lose the use of a piece of cyberware until you can get it repaired.\n\
 • Lose a body part (arm, leg, eye).',
       mixed: 'On a 7–9, the MC will choose 1:\n\n\
 • You lose your footing.\n\
 • You lose your grip on whatever you’re holding.\n\
 • You lose track of someone or something you’re attending to.\n\
 • Someone gets the drop on you.',
       fail: 'On a 6-, advance your harm clock as established and consider yourself lucky...',
       stat: 'num',
       method: functions.moveRoll
   },
    login: {
       name: "Login",
       key: ['login'],
       text: 'When you attempt to gain access to a system, roll +Synth.',
       success: 'On a 10+, you’re in clean',
       mixed: 'On a 7–9, you’re in, but choose one:\n\n\
 • Passive trace (+1 trace).\n\
 • ICE is activated.\n\
 • An alert is triggered (advance the active Mission Clock).\n\
 • Your access is restricted – take -1 ongoing to matrix moves in this system\
 while your access is restricted.',
       fail: 'On a 6-, you’re in, but the MC chooses two:\n\n\
 • Passive trace (+1 trace).\n\
 • ICE is activated.\n\
 • An alert is triggered (advance the active Mission Clock).\n\
 • Your access is restricted – take -1 ongoing to matrix moves in this system\
 while your access is restricted.',
       stat: 'synth',
       method: functions.moveRoll
   },
    compromiseSecurity: {
       name: "Compromise Security",
       key: ['comp', 'compsec', 'compromise', 'security', 'compromisesecurity'],
       text: 'When you attempt to compromise a sub-system’s security, roll +Mind.',
       success: 'On a 10+, gain 3 hold over the sub-system you have compromised.\
 You may spend 1 hold to activate a security measure on that sub-system.',
       mixed: 'On a 7–9, gain 1 hold over the sub-system you have compromised.\
 You may spend 1 hold to activate a security measure on that sub-system.',
       fail: 'On a 6-, you trigger an alert, which may have additional consequences.',
       stat: 'mind',
       method: functions.moveRoll
   },
    manipulateSystems: {
       name: "Manipulate Systems",
       key: ['manip', 'manipulate', 'systems', 'manipulatesystems'],
       text: 'When you attempt to manipulate a digitally-controlled aspect of a facility, roll +Synth.',
       success: 'On a 10+, gain 3 hold over the sub-system you are manipulating.\
 You may spend 1 hold to activate routines on that sub-system.',
       mixed: 'On a 7–9, gain 1 hold over the sub-system you are manipulating.\
 You may spend 1 hold to activate routines on that sub-system.',
       fail: 'On a 6-, something goes wrong...',
       stat: 'synth',
       method: functions.moveRoll
   },
    meltIce: {
       name: "Melt Ice",
       key: ['melt', 'ice', 'meltice'],
       text: 'When you attempt to evade, destroy or disable an activated ICE construct, roll +Edge.',
       success: 'On a 10+, you evade, destroy, or temporarily disable the system, your choice.',
       mixed: 'On a 7–9, you evade, destroy, or temporarily disable the system, your choice.\
 But the system successfully executes a routine before you can disable it.',
       fail: 'On a 6-, something goes wrong...',
       stat: 'edge',
       method: functions.moveRoll
   },
    jackOut: {
       name: "Jack Out",
       key: ['jack', 'jackout'],
       text: 'When you, your programs, or your deck are about to be damaged by ICE,\
 you can try to jack out. Roll +Cool.',
       success: 'On a 10+, you disconnect yourself from the system before any serious harm occurs.',
       mixed: 'On a 7–9, you jack out, but choose one:\n\n\
 • You lose some data.\n\
 • You take some of the established consequences.\n\
 • The owners of the target system trace you to your current location.',
       fail: 'On a 6-, you take the established consequences... and you’re still connected.',
       stat: 'cool',
       method: functions.moveRoll
   },
    declareAContact: {
       name: "Declare A Contact",
       key: ['declare', 'contact', 'declareacontact'],
       text: 'When you need to call in a favour from a new contact, name and describe the Contact,\
 then say why the Contact owes you a favour or why you owe them a favour. The MC will ask you\
 some questions about the Contact and your relationship. Add the Contact to your list.',
       method: function(){return this.text}
   },
    produceEquipment: {
       name: "Produce Equipment",
       key: ['produce', 'equipment', 'produceequipment'],
       text: 'When you produce the equipment you need at the right time,\
 describe how and why your professionalism and forethought told you to bring this equipment\
 on the mission and spend [gear]. You must spend [gear] to produce equipment.',
       method: function(){return this.text}
   },
    revealKnowledge: {
       name: "Reveal Knowledge",
       key: ['reveal', 'knowledge', 'revealknowledge'],
       text: 'When you reveal your knowledge of the opposition’s preparations, dispositions\
 or environment, describe how you discovered that information and spend [intel].\
 You must spend [intel] to reveal knowledge. Take +1 forward to exploit the opportunity\
 offered by that information.',
       method: function(){return this.text}
   },
    conductAnOperation: {
       name: "Conduct An Operation",
       key: ['conduct', 'operation', 'conductanoperation'],
       text: 'When you lead a planned and coordinated operation, describe your plan and who\
 is carrying it out, then roll +Edge',
       success: 'On a 10+, everything goes according to plan; you and your team are in\
 perfect position to carry out the final element of the plan. The MC will describe the scene\
 and present you with the opportunity to act.',
       mixed: 'On a 7–9, You get your opportunity to act, but it won’t go as smoothly as you\
 would like, choose 1:\n\n\
 • A preliminary task was not completed on time or accurately; choose a task and the MC\
 will describe how it causes a problem.\n\
 • There’s an unexpected complication; choose a consideration and the MC will describe\
 how it causes a problem.',
       fail: 'On a 6-, the MC will describe the scene and make a move that puts you on the back\
 foot; also the 2 following apply:\n\n\
 • A preliminary task was not completed on time or accurately; choose a task and the MC\
 will describe how it causes a problem.\n\
 • There’s an unexpected complication; choose a consideration and the MC will describe\
 how it causes a problem.',
       stat: 'edge',
       method: functions.moveRoll
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
**EXAMPLE: (you may copy/paste and edit the example text)**\n!newmove name+"Fly High" command+"fly" roll+"2d6 +meat" text+"When\
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
   npcGenerator: {
         key: ['newnpc', 'npc'],
         text: 'To create a new randomized NPC, enter __!npc__ for some fresh meat.',
         name: ['Aziz', 'Cartman', 'Cowboy', 'Demon', 'Frank', 'Furiosa', 'Luka', 'Roadkill', 'Max', 'Roo', 'Rook', 'Squirrel', 'Tower', 'Gant', 'Hub', 'Intrigue', 'Jacinta', 'Jinx', 'Lilliana', 'Master D', 'Sally', 'Mr. Johnson', 'The Goto', 'Case', 'Core', 'Crowley', 'Dead Rob', 'Djinn', 'Frozz', 'Gaius Lupo', 'Hazer', 'Johnny', 'Nezumi', 'Patch', 'Wyldstyle', 'Archer', 'Boone', 'Deckard', 'Frost', 'Marîd', 'Markham', 'Mr. Black', 'Python', 'Quade', 'Richards', 'Ritter', 'Seamus Riley', 'Taylor', 'Bertrand', 'Blue', 'Kit', 'Loe Qi', 'Max', 'Nef', 'Smoke', 'Spectre', 'Zero', 'Angelo', 'Dead Eyes', 'John', 'LouLou', 'Kennedy', 'Knock', 'Mé Moì', 'Molly', 'Oakley', 'Sarah', 'Sleeper', 'Apostle', 'Chalice', 'Dancer', 'Dillon Vicara', 'Eleven', 'Nebula', 'Ice Smooth', 'Lola Chrome', 'Magnetic', 'Nigell', 'Prophet9', 'Relay', 'Sennheiser', 'Shard', 'Conduit', 'Farouk Dakins', 'Glass', 'Grant Access', 'Edison', 'Hoot', 'Madison Brookes-Watanabe', 'Parisa Zahed', 'Scoop', 'Spider', 'Witness', 'Alif', 'Armitage', 'Connomarah', 'Cortez', 'Grit', 'Mac', 'Sly', 'Turnus', 'Turner', 'Angel.1.3', 'AntiK-Tera', 'Bobby', 'Cathode', 'Eleni Larabee', 'Houwayyek', 'Mr. Wizard', 'Spanner', 'Transitivity'],
         gender: ['cis male', 'cis female', 'agender', 'androgynous', 'gender fluid', 'gender nonconforming', 'gender variant', 'non-binary', 'trans male', 'trans female', 'two-spirit', 'pan-gender', 'genderqueer', 'male', 'female', 'transgender'],
         skin: ['artificial', 'asian or south asian', 'black', 'decorated', 'hispanic/latinx', 'indigenous', 'middle eastern', 'white', 'camouflaged', 'covered', 'changing', 'reinforced'],
         eyes: ['laughing', 'cool', 'hard', 'cold', 'distant', 'artificial', 'trustworthy', 'focused', 'young', 'smug', 'impatient', 'twitching', 'mocking', 'jaded', 'restless', 'penetrating', 'resigned', 'obscured', 'searching', 'black', 'cunning', 'dark', 'dead', 'manic', 'unhinged', 'mirrored', 'wild', 'passionate', 'shining', 'driven', 'sad', 'empathic', 'dejected', 'haunted', 'squinty', 'appraising', 'excited'],
         face: ['blank', 'thin', 'covered', 'attractive', 'decorated', 'rugged', 'scarred', 'hidden', 'friendly', 'sneering', 'smooth', 'nondescript', 'weathered', 'impassive', 'ambiguous', 'calm', 'serene', 'striking', 'alluring', 'sculpted', 'grim', 'composed', 'serious', 'expressive'],
         body: ['toned', 'lithe', 'compact', 'scarred', 'augmented', 'flabby', 'unfit', 'small', 'thin', 'bulky', 'fleshy', 'muscular', 'awkward', 'young', 'wiry', 'athletic', 'relaxed', 'soft', 'pudgy', 'tired', 'tense', 'graceful'],
         wear: ['flashy', 'formal', 'utility', 'scrounged', 'vintage', 'leather', 'military', 'corporate', 'street', 'punk', 'worn', 'faded', 'casual', 'high fashion', 'avant-garde', 'messy', 'outdated'],
         cyberwear: ['cybereyes', 'cyberears', 'cybercoms', 'augmented strength', 'implanted tools', 'implanted weaponry', 'cyberlegs', 'dermal plating', 'retractable blades', 'holdout firearm', 'monofilament whip', 'internal assassin implant', 'muscle grafts', 'neural interface', 'synthetic nerves', 'skillwires', 'tactical computer'],
         method: functions.newNpc
   },
   droneGenerator: {
         key: ['newdrone', 'drone'],
         text: 'To create a new randomized drone, enter __!drone__ followed by the size: tiny, small, medium, large.\n\
EXAMPLE: !drone small',
         smallStrengths: ['fast', 'rugged', 'off-road', 'responsive', 'uncomplaining', 'easily repaired', 'stealthy', 'tight encryption', 'autonomous', 'robot armed', 'armed: up to 2-harm firearm close (no autofire)', 'armed: small knife', 'armed: crossbow'],
         mediumStrengths: ['fast', 'rugged', 'off-road', 'responsive', 'uncomplaining', 'easily repaired', 'stealthy', 'tight encryption', 'autonomous', 'robot armed', 'armed: up to 3-harm firearm near', 'armed: teeth', 'armed: sniper rifle'],
         largeStrengths: ['fast', 'rugged', 'off-road', 'responsive', 'uncomplaining', 'easily repaired', 'stealthy', 'tight encryption', 'autonomous', 'robot armed', 'armed: up to 4-harm firearm', 'armed: monofilament whip', 'armed: assault cannon', ],
         sensors: ['magnification', 'thermographic', 'jamming', 'image enhancement', 'analysis software', 'sonar'],
         weaknesses: ['slow', 'fragile', 'unreliable', 'loud', 'loose encryption', 'obvious'],
         method: functions.newDrone
   },
   weaponGenerator: {
      key: ['newweapon', 'weapon'],
      text: 'To select a random weapon, enter __!weapon__\n(thanks to *Augmented Reality* by Paul D Gallagher',
      weapons: ['Flechette pistols', 'Teleoperated drones', 'Hydraulic fists, bites', 'Aware weapons LAN', 'Spider venom rounds', 'Ornate monokatana', 'Hunter-seeker rounds', 'Pearl handled Glock', 'Bulky laser rifle', 'Scoped needle-rifle', 'Monowire mines', 'Implanted zhi dao', 'Exploding munitions', 'Nerve-burner bombs', '3D printed QBZ-95', 'Railgun sniper', 'Compound bow', 'Sleek microwavers', 'Dissolving Nanorounds', 'Martial art techniques', 'Antique uZI', 'SOPMODs', 'Auto grenade launcher', 'Drum-fed AK74', 'Self-destructing gun', 'Twin compact SMGs', 'Charm-covered Steyr', 'Liquid nitrogen rounds', 'Camo autoshotgun', 'Ornate bladed finger', 'Incendiary rounds', 'Flechette adapted M4', 'Screamer grenades', 'Big polymer revolvers', 'Hands-free trigger', 'Rifle with chatty AI',' Cortex bomb', 'Bright Plastic SMG', 'Chinese SMG clone', 'Caseless KrISS Vector', 'Brace of small pistols', 'Scanner shielded gun', 'Inbuilt Scorpion SMGs', 'Crippler rounds', 'Taser', 'Monoknives', 'Compact stutter-laser', 'Disposable pistols', 'Toxin-loaded needlers', 'Underslung blinder', 'Full spectrum targeter', 'Belt-fed chaingun'],
      method: functions.newWeapon
}
}