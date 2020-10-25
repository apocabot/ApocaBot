const functions = require('./../functions/masks.js');

//text library object
module.exports = moves = {
    menu: {
        key: ['help', 'menu'],
        text: 'ALL APOCABOT COMMANDS BEGIN WITH PREFIX (default ! ).\n\
ADD SUFFIX ? TO ANY COMMAND FOR MOVE INFO:\n\n\
 - NEWCHARACTER: !newcharacter\n\
 - CHECK YOUR CHARACTER STATS: !character\n\
 - SET CHARACTER STATS: !set\n\
 - SHIFT CHARACTER STAT: !shift\n\
 - ROLL SOME DICE: !roll\n\
 - BASIC MOVES LIST: !basic\n\
 - ADULT MOVES LIST: !adult\n\
 - CUSTOM MOVES: !custom\n\
 - ADD/REMOVE INFLUENCE: !inf\n\
 - SET POTENTIAL ON A MISS: !potOnMiss\n\
 - SET APOCABOT PREFIX: !setprefix\n\
 - SET APOCABOT GAME: !setgame',
        method: function(){return this.text}
    },
    basicMoves: {
        key: ['basic', 'basicmoves'],
        text: 'BASIC MOVES LIST:\n\n\
 - DIRECTLY ENGAGE A THREAT: !engage\n\
 - UNLEASH YOUR POWERS: !unleash\n\
 - COMFORT OR SUPPORT: !comfort *or* !support\n\
 - PIERCE THE MASK: !pierce\n\
 - DEFEND: !defend\n\
 - ASSESS THE SITUATION: !assess\n\
 - PROVOKE SOMEONE: !provoke\n\
 - TAKE A POWERFUL BLOW: !take\n\
 - CONDITIONS: !con\n\
 - REJECT INFLUENCE: !reject\n\
 - TEAM POOL: !team\n\
 - END OF SESSION: !endsession',
        method: function(){return this.text}
    },
    adultMoves: {
        key: ['adult', 'adultmoves'],
        text: 'ADULT MOVES LIST:\n\n\
 - WIELD YOUR POWERS: !wield\n\
 - OVEERWHELM A VULNERABLE FOE: !overwhelm\n\
 - PERSUADE WITH BEST INTERESTS: !persuade\n\
 - EMPATHIZE: !empathize\n\
 - STAND UP FOR SOMETHING: !stand',
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
                DANGER: ['dan', 0],
                FREAK: ['fre', 0],
                SAVIOR: ['sav', 0],
                SUPERIOR: ['sup', 0],
                MUNDANE: ['mun', 0],
                CONDITIONS: ['con', ''],
                POTENTIAL: ['pot', '0 / 5']
        },
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
!set name+Me dan-2 fre-1 sav+0 sup+1 mun+2',
        error: 'Incorrect input, use the format: !set name+bambino sav+1 dan-1 etc...',
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
        text: 'SHIFT LABELS OR STATS: !shift label+/-num...\nTo shift your character labels\
 or stats by a certain amount, enter the command followed by the label you want to shift\
 and the amount to change them.\n\
EXAMPLE: !shift dan+1 will increase your Danger by 1, !shift pot+1 will add 1 to your Potential,\
 !shift team+3 will add 3 to the Team Pool.',
        error: 'Incorrect input, use the format: !shift dan+1 pot+1 team+3 etc...\
 (this only works for numerical values)',
        method: functions.shift
    },
    roll: {
        key: ['roll'],
        text: 'ROLL DICE: !roll xdy +z\n\
Use the format !roll xdy +z where x = number of die, y = faces on die, and z = a positive\
 or negative modifier, a label, another +xdy, or any combination.\n\
EXAMPLE: !roll 2d6 +1  OR  !roll 2d6 +fre  OR  !roll 2d6 +1d4\n(SPACES MATTER!)',
        error: 'INCORRECT INPUT: Please use the format !roll xdy +z where x = number\
 of die, y = faces on die, and z = additional num, label, or xdy.\n\
EXAMPLE: !roll 2d6 +1  OR  !roll 2d6 +sup  OR  !roll 2d6 +1d4\n(SPACES MATTER!)',
        method: functions.xdyRoll
    },
    conditions:{
        key: ['con', 'conditions'],
        text: 'CONDITIONS: !mark or !clear\n\
Use the commands !mark or !clear to add or subtract conditions from your stat sheet.\
 Conditions on your stat sheet will automatically subtract -2 from the appropriate moves\
 and Take a Powerful Blow will automatically add the number of conditions marked.\n\
EXAMPLE: !mark afraid *or* !clear insecure\n\n\
TO CLEAR CONDITIONS:\n\
 • __To clear Angry__, hurt someone or break something important.\n\
 • __To clear Afraid__, run from something difficult.\n\
 • __To clear Guilty__, make a sacrifice to absolve your guilt.\n\
 • __To clear Hopeless__, fling yourself into easy relief.\n\
 • __To clear Insecure__, take foolhardy action without talking to your team.',
        method: function(){return this.text}
    },
    mark: {
        key: ['mark'],
        text: 'MARK CONDITION: !mark +condition\n\
When you mark a condition, enter the command plus the condition name. Marked conditions will\
 be listed on your character sheet.\n\n\
CONDITIONS:\n\
 • Angry\n\
 • Afraid\n\
 • Guilty\n\
 • Hopeless\n\
 • Insecure',
        error: 'To mark a condition: !mark afraid angry guilty hopeless insecure',
        method: functions.markCondition
    },
    clear: {
       key: ['clear'],
       text: 'CLEAR CONDITION: !clear +condition\n\
When you clear a condition, enter the command plus the condition name. Marked conditions will\
 be removed from your character sheet.\n\
TO CLEAR CONDITIONS:\n\
 • __To clear Angry__, hurt someone or break something important.\n\
 • __To clear Afraid__, run from something difficult.\n\
 • __To clear Guilty__, make a sacrifice to absolve your guilt.\n\
 • __To clear Hopeless__, fling yourself into easy relief.\n\
 • __To clear Insecure__, take foolhardy action without talking to your team.',
       error: 'To mark a condition: !clear afraid angry guilty hopeless insecure',
       method: functions.clearCondition
    },
    endOfSession: {
        key: ['end', 'endsession', 'session', 'endofsession', 'eos'],
        text: 'At the end of every session, choose one:\n\
 • __Grow closer to the team:__ Explain who made you feel welcome;\
 give Influence to that character and clear a condition or mark potential.\n\
 • __Grow into your own image of yourself.__ Explain how you see yourself and why;\
 shift one Label up and another down\n\
 • __Grow away from the team.__ Explain why you feel detached. Take Influence\
 over you away from another character.',
        method: function(){return this.text}
    },
    team: {
        key: ['team'],
        text: 'TEAM POOL: !set team+/-num *or* !shift team+/-num\n\
The Team stat is shared across all players (inlcuding the GM character), so any player\
 can !set the team pool to a certain amount (like at the start of a battle) or !shift\
 the team pool (if you use up a team point for one of your rolls).\n\
EXAMPLE: __!set team+2__ will set the Team stat to 2. __!shift team-1__ will subtract 1\
 from the Team stat.',
        method: function(){return this.text}
    },
    directlyEngageAThreat: {
        name: "Directly Engage A Threat",
        key: ['engage', 'directlyengage', 'engagethreat', 'directlyengagethreat', 'deat'],
        text: 'DIRECTLY ENGAGE A THREAT: !engage\n\
When you *directly engage a threat*, roll + Danger.',
        success: 'On a 10+, trade blows and pick two:\n\
 • Resist or avoid their blows\n\
 • Take something from them\n\
 • Create an opportunity for your allies\n\
 • Impress, surprise, or frighten the opposition',
        mixed: 'On a 7–9, trade blows and pick one:\n\
 • Resist or avoid their blows\n\
 • Take something from them\n\
 • Create an opportunity for your allies\n\
 • Impress, surprise, or frighten the opposition',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'danger',
        method: functions.moveRoll
    },
    unleashYourPowers: {
        name: 'Unleash Your Powers',
        key: ['unleash', 'unleashyourpowers', 'unleashpowers', 'uyp'],
        text: 'UNLEASH YOUR POWERS: !unleash\n\
When you *unleash your powers* to overcome an obstacle,\
 reshape your environment, or extend your senses, roll + Freak',
        success: 'On a 10+, you do it!',
        mixed: 'On a 7–9, mark a condition or the GM will tell you how\
 the effect is unstable or temporary.',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'freak',
        method: functions.moveRoll
    },
    comfortOrSupport: {
        name: 'Comfort Or Support',
        key: ['comfort', 'support', 'comfortorsupport', 'cos'],
        text: 'COMFORT OR SUPPORT: !comfort *or* !support\n\
When you *comfort or support someone*, roll + Mundane.',
        success: 'On a 10+, they hear you: they mark potential, clear a condition,\
 or shift Labels if they open up to you. You can also add a Team to the pool\
 or clear a condition yourself.',
        mixed: 'On a 7–9, they hear you: they mark potential, clear a condition,\
 or shift Labels if they open up to you.',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'mundane',
        method: functions.moveRoll
    },
    pierceTheMask: {
        name: 'Pierce The Mask',
        key: ['pierce', 'piercemask', 'piercethemask', 'ptm'],
        text: 'PIERCE THE MASK: !pierce\n\
 When you *pierce someone’s mask* to see the person beneath, roll + Mundane. You can ask:\n\
 • What are you really planning?\n\
 • What do you want me to do?\n\
 • What do you intend to do?\n\
 • How could I get your character to ______?\n\
 • How could I gain Influence over you?',
        success: 'On a 10+, ask 3:\n\
 • What are you really planning?\n\
 • What do you want me to do?\n\
 • What do you intend to do?\n\
 • How could I get your character to ______?\n\
 • How could I gain Influence over you?',
        mixed: 'On a 7-9, ask 1:\n\
 • What are you really planning?\n\
 • What do you want me to do?\n\
 • What do you intend to do?\n\
 • How could I get your character to ______?\n\
 • How could I gain Influence over you?',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'mundane',
        method: functions.moveRoll
    },
    defend: {
        name: 'Defend',
        key: ['defend'],
        text: 'DEFEND: !def\n\
 When you *defend someone or something from an immediate threat*, roll + Savior.',
        success: 'For *NPC threats*: On a 10+, you keep them safe and choose one:\n\
 • Add a Team to the pool\n\
 • Take Influence over someone you protect\n\
 • Clear a condition\n\n\
For *PC threats*: on a 10+, give them -2 to their roll.',
        mixed: 'For *NPC threats*: On a 7-9, you keep them safe and choose one:\n\
 • Add a Team to the pool\n\
 • Take Influence over someone you protect\n\
 • Clear a condition\n\
But it costs you: *expose yourself to danger or escalate the situation*.\n\n\
For *PC threats*: on a 7-9, give them -2 to their roll but you expose yourself\
 to cost, retribution, or judgment..',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'savior',
        method: functions.moveRoll
    },
    assessTheSituation: {
        name: 'Assess The Situation',
        key: ['assess', 'assesssituation', 'assessthesituation', 'ats'],
        text: 'ASSESS THE SITUATION: !assess\n\
When you *assess the situation*, roll + Superior. You can ask:\n\
 • What here can I use to ______?\n\
 • What here is the biggest threat?\n\
 • What here is in the greatest danger?\n\
 • Who here is most vulnerable to me?\n\
 • How could we best end this quickly?',
        success: 'On a 10+, ask two questions from the list below and take\
 +1 while acting on the answers.\n\
 • What here can I use to ______?\n\
 • What here is the biggest threat?\n\
 • What here is in the greatest danger?\n\
 • Who here is most vulnerable to me?\n\
 • How could we best end this quickly?',
        mixed: 'On a 7-9, ask one question from the list below and take\
 +1 while acting on the answer.\n\
 • What here can I use to ______?\n\
 • What here is the biggest threat?\n\
 • What here is in the greatest danger?\n\
 • Who here is most vulnerable to me?\n\
 • How could we best end this quickly?',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'superior',
        method: functions.moveRoll
    },
    provokeSomeone: {
        name: 'Provoke Someone',
        key: ['provoke', 'provokesomeone'],
        text: 'PROVOKE SOMEONE: !provoke\n\
When you *provoke someone* susceptible to your words, say what you’re\
 trying to get them to do and roll + Superior.',
        success: 'For *NPCs*: on a 10+, they rise to the bait and do what you want.\n\n\
For *PCs*: On a 10+, both:\n\
 • If they do it, add a Team to the pool\n\
 • If they don’t do it, they mark a condition',
        mixed: 'For *NPCs*: on a 7-9, they can instead choose one:\n\
 • They stumble: you take +1 forward against them\n\
 • They err: you gain a critical opportunity\n\
 • They overreact: you gain Influence over them\n\n\
For *PCs*: On a 7-9, choose one:\n\
 • If they do it, add a Team to the pool\n\
 • If they don’t do it, they mark a condition',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'superior',
        method: functions.moveRoll
    },
    takeAPowerfulBlow: {
        name: 'Take A Powerful Blow',
        key: ['take', 'blow', 'takeblow', 'takeablow', 'powerful', 'powerfulblow', 'takeapowerfulblow', 'tapb'],
        text: 'TAKE A POWERFUL BLOW: !blow\n\
When you *take a powerful blow*, roll + conditions marked.',
        success: 'On a 10+, choose one:\n\
 • You must remove yourself from the situation: flee, pass out, etc.\n\
 • You lose control of yourself or your powers in a terrible way\n\
 • Two options from the list below:\n\n\
 • You lash out verbally: provoke a teammate to foolhardy action or\
 take advantage of your Influence to inflict a condition\n\
 • You give ground; your opposition gets an opportunity\n\
 • You struggle past the pain; mark two conditions',
        mixed: 'On a 7–9, choose one:\n\
 • You lash out verbally: provoke a teammate to foolhardy action or\
 take advantage of your Influence to inflict a condition\n\
 • You give ground; your opposition gets an opportunity\n\
 • You struggle past the pain; mark two conditions',
        fail: 'On a 6-, you stand strong. Mark potential as normal,\
 and say how you weather the blow.',
        stat: 'con',
        method: functions.moveRoll
    },
    rejectSomeonesInfluence: {
        name: 'Reject Someone\'s Influence',
        key: ['reject', 'rejectinfluence', 'rejectsomeonesinfluence', 'rsi'],
        text: 'REJECT SOMEONE\'S INFLUENCE: !reject\n\
When you *reject someone’s Influence*, roll.',
        success: 'On a 10+, you successfully hold to yourself and tune them out.\
 Choose two:\n\
 • Clear a condition or mark potential by immediately acting to prove them wrong\n\
 • Shift one Label up and one Label down, your choice\n\
 • Cancel their Influence and take +1 forward against them',
        mixed: 'On a 7–9, you successfully hold to yourself and tune them out.\
 Choose one:\n\
 • Clear a condition or mark potential by immediately acting to prove them wrong\n\
 • Shift one Label up and one Label down, your choice\n\
 • Cancel their Influence and take +1 forward against them',
        fail: 'On a 6-, their words hit you hard. Mark a condition,\
 and the GM will adjust your Labels.',
        stat: 'num',
        method: functions.moveRoll
    },
    wieldYourPowers: {
        name: 'Wield Your Powers',
        key: ['wield', 'wieldpowers', 'wieldyourpowers', 'wyp'],
        text: 'WIELD YOUR POWERS: !wield\n\
When you *wield your powers* with precision or grace, roll + Freak.',
        success: 'On a 10+, choose two:\n\
 • Take hold of something vulnerable to you\n\
 • Create something useful from your environment\n\
 • Neutralize an opponent or threat, at least for now',
        mixed: 'On a 7–9, choose one:\n\
 • Take hold of something vulnerable to you\n\
 • Create something useful from your environment\n\
 • Neutralize an opponent or threat, at least for now',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'freak',
        method: functions.moveRoll
    },
    overwhelmAVulnerableFoe: {
        name: 'Overwhelm A Vulnerable Foe',
        key: ['overwhelm', 'overwhelmfoe', 'overwhelmafoe', 'over', 'whelm', 'oavf'],
        text: 'OVERWHELM A VULNERABLE FOE: !overwhelmWhen you *overwhelm a\
 vulnerable foe*, roll +Danger.',
        success: 'On a 10+, the fight\'s over. They\'re done. Choose one:\n\
 • You take a powerful blow in turn\n\
 • You hurt your foe more than you intended\n\
 • You cause serious collateral damage',
        mixed: 'On a 7-9, the fight\'s over. They\'re done. Choose two:\n\
 • You take a powerful blow in turn\n\
 • You hurt your foe more than you intended\n\
 • You cause serious collateral damage',
        stat: 'danger',
        fail: 'on a 6-, be prepared for the worst...',
        method: functions.moveRoll
    },
    persuadeWithBestInterest: {
        name: 'Persuade With Best Interest',
        key: ['persuade', 'pwbi'],
        text: 'PERSUADE WITH BEST INTEREST: !persuade\n\
When you *persuade someone with their best interests*, roll + Superior.',
        success: 'If they’re an *NPC*, on a 10+, they buy it and act accordingly.\n\
If they’re a PC, on a 10+, they can mark potential or shift their own Labels\
 if they do what you want. Take Influence over them as well.',
        mixed: 'If they’re an *NPC*, on a 7-9, they need concrete assurance right now.\n\
 If they’re a PC, on a 7-9, they can mark potential or shift their own Labels\
 if they do what you want.',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'superior',
        method: functions.moveRoll
    },
    empathize: {
        name: 'Empathize',
        key: ['empathize'],
        text: 'EMPATHIZE: !empathize\n\
When you openly *empathize with someone*, roll +Mundane.',
        success: 'On a 10+, they must reveal a vulnerability or mark a condition.\
 Take Influence over them as well.',
        mixed: 'On a 7-9, they must reveal a vulnerability or mark a condition.',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'mundane',
        method: functions.moveRoll
    },
    standUpForSomething: {
        name: 'Stand Up For Something',
        key: ['stand', 'standup', 'standupforsomething', 'sufs'],
        text: 'STAND UP FOR SOMETHING: !stand\n\
When you *stand up for something*, roll + Savior.',
        success: 'On a 10+, choose two:\n\
 • Listeners can’t keep doing what they’re doing\n\
 • Listeners can’t flee without addressing you\n\
 • Listeners can’t attack you without losing status or position',
        mixed: 'On a 7–9, choose one:\n\
 • Listeners can’t keep doing what they’re doing\n\
 • Listeners can’t flee without addressing you\n\
 • Listeners can’t attack you without losing status or position',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'savior',
        method: functions.moveRoll
    },
    influence: {
       key: ['inf', 'influence'],
       text: 'You can track influence by adding or removing other characters from two lists:\n\
 • INFLUENCE OVER ME: lists the PCs and NPCs who have influence over you.\n\
 • INFLUENCE OVER THEM: lists the PCs and NPCs who you have influence over.\n\n\
To manage your influence lists, enter:\n • __!overme/overthem add/remove name__ (where *name* is the other character\'s name)\n\
If you try and add a character to you list who is already on it, or remove a character who is not\
 on the list already, the bot will instruct you what to do.\n\n\
EXAMPLES:\n\
__!overme add pooky__ will add Pooky to your INFLUENCE OVER ME list.\n\
__!overthem remove limbo__ will remove Limbo from your INFLUENCE OVER THEM list.',
       method: functions.influence
   },
   overMe: {
       key: ['overme'],
       text: 'To mark that another PC or NPC has influence over you:\n\
 • Enter __!overme add name__ (where *name* in the other character\'s name)\n\n\
To remove their influence over you:\n\
 • Enter __!overme remove name__ (where *name* in the other character\'s name)',
       method: functions.overMe
   },
   overThem: {
       key: ['overthem'],
       text: 'To mark that you have influence over another PC or NPC:\n\
 • Enter __!overthem add name__ (where *name* in the other character\'s name)\n\n\
To remove your influence over them:\n\
 • Enter __!overthem remove name__ (where *name* in the other character\'s name)',
       method: functions.overThem
   },
   setExpOnAMiss: {
       key: ['potonmiss', 'potentialonamiss', 'potentialonmiss', 'potonamiss'],
       text: 'Set the rule for Potential on a Miss.\n\nTo set the rule, enter __!potOnMiss__ followed by yes or no.\n\
• yes: Whenever a miss is rolled using a move command, a reminder will be displayed to mark Potential.\n\
• no: No reminder will be displayed.',
       method: functions.setExpOnAMiss
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
 • roll+"xdy +stat" __OR__ roll+"xdy" (for statless rolls)\n\
 • text+"Description of move"\n\
 • success+"this happens when you succeed..."\n\
 • mixed+"this happens on a mixed success..."\n\
 • fail+"this happens on a failure..."\n\n\
**Spaces between each parameter. Double quotes around all custom text. Command+ must be one word, letters only.**\n\n\
**EXAMPLE: (you may copy/paste and edit the example text)**\n!newmove name+"Fly High" command+"fly" roll+"2d6 +fre" text+"When\
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