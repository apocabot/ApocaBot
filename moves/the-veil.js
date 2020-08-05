const functions = require('./../functions/the-veil.js');

//text library object
module.exports = moves = {
    menu: {
        key: ['help', 'menu',],
        text: 'ALL APOCABOT COMMANDS BEGIN WITH PREFIX (default ! ).\n\
ADD SUFFIX ? TO ANY COMMAND FOR MORE INFO:\n\n\
 - NEWCHARACTER: !newcharacter\n\
 - CHECK YOUR CHARACTER STATS: !character\n\
 - SET CHARACTER STATS: !set\n\
 - SHIFT CHARACTER STATS: !shift\n\
 - ROLL SOME DICE: !roll\n\
 - BASIC MOVES LIST: !basic\n\
 - OTHER MOVES LIST: !other\n\
 - RANDOMIZERS/TOOLS: !rand\n\
 - SET APOCABOT PREFIX: !setprefix\n\
 - SET APOCABOT GAME: !setgame',
        method: function(){return this.text}
    },
    basicMoves: {
        key: [`basic`, 'basicmoves'],
        text: 'BASIC MOVES LIST:\n\n\
 - RISK: !risk\n\
 - PROBE: !probe\n\
 - LIFT THE VEIL: !lift\n\
 - ANALYZE: !analyze\n\
 - SWAY: !sway\n\
 - DIVERT: !divert\n\
 - ULTIMATUM: !ult\n\
 - NEUTRALIZE: !neut\n\
 - HELP OR HINDER: !hoh\n\
 - SPIKE/ALLEVIATE: !spike\n\
 - DUEL: !duel',
        method: function(){return this.text}
   },
    otherMoves: {
        key: ['other', 'othermoves'],
        text: 'GIRI AND PERIPHERAL MOVES LIST:\n\n\
 - GIRI: !giri\n\
 - STRING: !string\n\
 - LEAN ON: !lean\n\
 - REFUTE: !refute\n\
 - LEVERAGE: !lever\n\
 - STRATEGIZE: !strat\n\
 - LINK: !link\n\
 - EMPORIUM: !emp\n\
 - PROXY: !proxy',
        method: function(){return this.text}
    },
    randomizers: {
        key: ['rand', 'random', 'randomizers'],
        text: 'RANDOMIZERS AND MC TOOLS:\n\n\
 - RANDOM NPC: !npc\n\
 - RANDOM DRONE: !drone\n\
 - RANDOM WEAPON: !weapon\n\
 - RANDOM CORPORATION: !corp',
        method: function(){return this.text}
    },
    abilities: {
        key: 'abilities',
        stats: {
                NAME: ['name', ''],
                MAD: ['mad', 0, 0],
                PEACEFUL: ['peace', 0, 0],
                SAD: ['sad', 0, 0],
                JOYFUL: ['joy', 0, 0],
                SCARED: ['scared', 0, 0],
                POWERFUL: ['power', 0, 0],
                HARM: ['harm', '0 / 5'],
                XP: ['xp', '0 / 5']
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
!set name+Me mad-1 peace+0 sad+0 joy+1 scared+1 power+2',
        error: 'Incorrect input, use the format: !set name+Me mad-1 peace+0 sad+0 joy+1 scared+1 power+2',
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
        error: 'Incorrect input, use the format: !shift sad+1 etc...\
 (this only works for numerical values)',
        method: functions.shift
    },
    roll: {
        key: ['roll'],
        text: 'ROLL DICE: !roll xdy +z\n\
Use the format !roll xdy +z where x = number of die, y = faces on die, and z = a positive\
 or negative modifier, a stat, another +xdy, or any combination.\n\
EXAMPLE: !roll 2d6 +1  OR  !roll 2d6 +sad  !roll 2d6 +1d4 (SPACES MATTER!)',
        error: 'INCORRECT INPUT: Please use the format !roll xdy +z where x = number\
 of die, y = faces on die, and z = positive or negative modifier, if any.\n\
EXAMPLE: !roll 2d6 +1  OR  !roll 2d6 +sad (SPACES MATTER!)',
        method: functions.xdyRoll
    },
    risk: {
        name: 'Risk',
        key: ['risk'],
        text: 'RISK: When you are aware of and act to avoid imminent danger, say how you do it and roll +STATE.',
        success: 'On a 10+, you do as you describe and the danger doesn’t come to bear.',
        mixed: 'On a 7–9, in the doing of it there will be a cost, complication, or choice introduced by the MC.',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'stat',
        method: functions.moveRoll
    },
    probe: {
        name: 'Probe',
        key: ['probe'],
        text: 'PROBE: When you pay attention, study, or examine someone’s reactions during\
 an interaction in an attempt to learn more about them, roll +STATE. You may be able to ask:\n\
 • Are you telling the truth?\n\
 • What are you really feeling?\n\
 • What do you intend to do?\n\
 • What do you wish I’d do?\n\
 • How could I get you to _____?',
        success: 'On a 10+, hold 3. Spend hold 1 for 1 to ask the following questions.\
 When the interaction ends the hold expires.\n\
 • Are you telling the truth?\n\
 • What are you really feeling?\n\
 • What do you intend to do?\n\
 • What do you wish I’d do?\n\
 • How could I get you to _____?',
        mixed: 'On a 7–9, hold 1. Spend hold 1 for 1 to ask the following questions.\
 When the interaction ends the hold expires.\n\
 • Are you telling the truth?\n\
 • What are you really feeling?\n\
 • What do you intend to do?\n\
 • What do you wish I’d do?\n\
 • How could I get you to _____?',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'stat',
        method: functions.moveRoll
    },
    liftTheVeil: {
        name: 'Lift The Veil',
        key: ['ltv', 'lift', 'liftveil', 'veil', 'lifttheveil'],
        text: 'RISK: When you try to pierce the constant illusion of The Veil, search for\
 information, or recall something you may already be privy to, roll +STATE.',
        success: 'On a 10+, the MC will tell you something new and interesting about the current situation.\
 The MC will give you good detail. On any roll the MC will ask you a question or two; answer them.',
        mixed: 'On a 7–9, the MC will tell you something new and interesting about the current situation.\
 The MC will give you an impression. On any roll the MC will ask you a question or two; answer them.',
        fail: 'On a 6-, the MC will ask you a question or two; answer them.',
        stat: 'stat',
        method: functions.moveRoll
    },
    analyze: {
        name: 'Analyze',
        key: ['analyze', 'ana'],
        text: 'ANALYZE: When you use what you have at your disposal to assess a place or situation, roll +STATE.\
 You may be able to ask:\n\
 • Where’s my best way out/way in/way past?\n\
 • How is ____ vulnerable to me?\n\
 • Which enemy is the biggest threat?\n\
 • What, if anything appears out of place?\n\
 • What’s my enemy’s true position?\n\
 • Is this going to get worse before it gets better?',
        success: 'On a 10+, ask 3. When you act on the answers given to you by the MC, take +1 forward.\n\
 • Where’s my best way out/way in/way past?\n\
 • How is ____ vulnerable to me?\n\
 • Which enemy is the biggest threat?\n\
 • What, if anything appears out of place?\n\
 • What’s my enemy’s true position?\n\
 • Is this going to get worse before it gets better?',
        mixed: 'On a 7–9, ask 2. When you act on the answers given to you by the MC, take +1 forward.\n\
 • Where’s my best way out/way in/way past?\n\
 • How is ____ vulnerable to me?\n\
 • Which enemy is the biggest threat?\n\
 • What, if anything appears out of place?\n\
 • What’s my enemy’s true position?\n\
 • Is this going to get worse before it gets better?',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'stat',
        method: functions.moveRoll
    },
    sway: {
        name: 'Sway',
        key: ['sway'],
        text: 'SWAY: When you want to get an NPC to do something you want and their motivations\
 don’t line up with yours, roll +STATE.',
        success: 'On a 10+, they do it and choose 1.\n\
 • You’re gonna owe them some serious Cred.\n\
 • Your own Giri is in question now.\n\
 • You’re gonna need to give them something now instead of later.\n\
 • You need to do them a favor first.\n\
 • You need to give a piece of yourself to them, body or heart.',
        mixed: 'On a 7–9, they do it and choose 2.\n\
 • You’re gonna owe them some serious Cred.\n\
 • Your own Giri is in question now.\n\
 • You’re gonna need to give them something now instead of later.\n\
 • You need to do them a favor first.\n\
 • You need to give a piece of yourself to them, body or heart.',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'stat',
        method: functions.moveRoll
    },
    divert: {
        name: 'Divert',
        key: ['divert', 'div'],
        text: 'DIVERT: When you engage with someone in an attempt to distract, misdirect,\
 or otherwise direct attention to yourself or elsewhere, roll +STATE.',
        success: 'On a 10+, pick 3.\n\
 • Your actions create an opportunity for you or someone else.\n\
 • You glean a flaw or weakness.\n\
 • They become confused or flustered.\n\
 • You’re able to slip away.',
        mixed: 'On a 7–9, pick 2.\n\
 • Your actions create an opportunity for you or someone else.\n\
 • You glean a flaw or weakness.\n\
 • They become confused or flustered.\n\
 • You’re able to slip away.',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'stat',
        method: functions.moveRoll
    },
    ultimatum: {
        name: 'Ultimatum',
        key: ['ultimatum', 'ult'],
        text: 'ULTIMATUM: When you say what you want and what you will do if you don’t get it, roll +STATE.',
        success: 'On a 10+, they have to choose: make you carry out your threat, or back down\
 and give you what you want.',
        mixed: 'On a 7–9, they have to choose: make you carry out your threat, or back down\
 and give you what you want. They also have these options:\n\
 • Clearly remove themselves as a threat.\n\
 • Fortify themselves.\n\
 • Give you something they think you want.\n\
 • Attempt to remove you as a threat, after taking the established consequences.\n\
 • Tell you what you want to know (or what you want to hear).',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'stat',
        method: functions.moveRoll
    },
    neutralize: {
        name: 'Neutralize',
        key: ['neutralize', 'neut', 'neutral'],
        text: 'NEUTRALIZE: When you use force to attempt to neutralize a threat, take control\
 of a situation, or maintain hold of something you have with the chance of taking harm yourself, roll +STATE.',
        success: 'On a 10+, you generate 3 hold and take no harm in the doing. Spend your hold\
 1 for 1 during the scene to:\n\
 • Inflict harm.\n\
 • Take away an advantage (requires 2 hold to be spent).\n\
 • Suffer little harm.\n\
 • Force a change of location (1 hold and the MC chooses the new location, 2 and you do).\n\
 • Impress, dismay or frighten your opponent.',
        mixed: 'On a 7–9, you generate 2 hold and you will take harm in the doing.\
 Spend your hold 1 for 1 during the scene to:\n\
 • Inflict harm.\n\
 • Take away an advantage (requires 2 hold to be spent).\n\
 • Suffer little harm.\n\
 • Force a change of location (1 hold and the MC chooses the new location, 2 and you do).\n\
 • Impress, dismay or frighten your opponent.',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'stat',
        method: functions.moveRoll
    },
    helpOrHinder: {
        name: 'Help Or Hinder',
        key: ['hoh', 'helporhinder'],
        text: 'HELP OR HINDER: When you act to help or impede another player character, say how you do so and roll +STATE.',
        success: 'On a 10+, they take +1 (assist) or -2 (impede) to their roll.',
        mixed: 'On a 7–9, they take +1 (assist) or -2 (impede) to their roll.\
 You also expose yourself to danger, retribution or a cost.',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'stat',
        method: functions.moveRoll
    },
    duel: {
        name: 'Duel',
        key: ['duel'],
        text: 'DUEL: When you initiate single combat with another, answer the following questions\
 and take +1 forward for each answer in the affirmative. Then, roll +STATE +FORWARD.\n\
 • Do you currently have the upper hand?\n\
 • Are you better trained than them?\n\
 • Does your equipment give you a particular advantage for this conflict?',
        success: 'On a 10+, you generate 3 hold and your opponent generates 1.\
 You may spend hold 1 for 1 at any time to do one thing on the following list as long\
 as you justify your choice in the fiction.\n\
 • Inflict harm (minus armor if applicable).\n\
 • Block harm (reduces harm by half rounded down).\n\
 • Deflect all harm (choose twice).\n\
 • Force a change of location, or use the environment to an advantage (generates +1 hold for the next bout).',
        mixed: 'On a 7–9, both of you generate 2 hold. You may spend hold 1 for 1 at any time to do one thing\
 on the following list as long as you justify your choice in the fiction.\n\
 • Inflict harm (minus armor if applicable).\n\
 • Block harm (reduces harm by half rounded down).\n\
 • Deflect all harm (choose twice).\n\
 • Force a change of location, or use the environment to an advantage (generates +1 hold for the next bout).',
        fail: 'On a 6-, your opponent generates 3 hold and you generate 1. You may spend hold 1 for 1 at any\
 time to do one thing on the following list as long as you justify your choice in the fiction.\n\
 • Inflict harm (minus armor if applicable).\n\
 • Block harm (reduces harm by half rounded down).\n\
 • Deflect all harm (choose twice).\n\
 • Force a change of location, or use the environment to an advantage (generates +1 hold for the next bout).',
        stat: 'stat',
        method: functions.moveRoll
    },
    string: {
        name: 'String',
        key: ['string'],
        text: 'STRING: When you deliberately go out of your way to do someone a solid, get them out of a tough spot,\
 or anything else where both parties agree they are in your debt, mark down that you have 1 Giri (!addgiri?) on them.',
        method: function(){return this.text}
    },
    leanOn: {
        name: 'Lean On',
        key: ['lean', 'leanon'],
        text: 'LEAN ON: When you ask someone to do something you want and use Giri you have on them to make things\
 square between yourselves while doing so, if they do it, you erase 1 Giri (!subgiri?) you marked with them for each\
 thing you ask of them. Other characters might try to get out of debt with you, or you could cash in by having them:\n\
 • Bring you something they know you want.\n\
 • Fight for you, or put themselves in harm’s way.\n\
 • Transfer Giri owed to them to you.\n\
 • Answer questions or provide information you want.',
        method: function(){return this.text}
    },
    refute: {
        name: 'Refute',
        key: ['refute', 'ref'],
        text: 'REFUTE: When an NPC or a PC has Giri on you and they use it in order to ask you to do something\
 they want but you can’t or won’t do it, roll and add the number of Giri they have on you. You’ll have to make\
 a promise in order to avoid your obligations; make it clear to them what your promise is. If they have 3 Giri\
 or more on you, you cannot refuse them.',
        success: 'On a 10+, they get an additional 2 Giri from you and need a concrete assurance right now to\
 back up the promise.',
        mixed: 'On a 7–9, they get an additional 1 Giri from you and it’s up to you whether or not you keep\
 your promise later.',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'num',
        method: functions.moveRoll
    },
    leverage: {
        name: 'Leverage',
        key: ['lev', 'leverage', 'lever'],
        text: 'LEVERAGE: When you name someone who you have Giri on in order to get something you want,\
 roll +the Giri you have on them (!lever +NAME).',
        success: 'On a 10+, their name is enough to get you what you need and the Giri is still owed you.',
        mixed: 'On a 7–9, in order for you to get what you want the debt might be considered settled if word\
 gets back to them. The MC will tell you how much Giri is settled if it does.',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'stat',
        method: functions.moveRoll
    },
    strategize: {
        name: 'Strategize',
        key: ['strat', 'prep', 'strategize', 'prepare', 'preparation'],
        text: 'STRATEGIZE: When you scrutinize, plan ahead, or confer with each other to achieve a common goal,\
 you gain Preparation. If you prepare for a day or two in the fiction, take 1 Preparation. If you prepare for\
 a week or longer, take 3. Whenever you enact your stratagem, any of you may spend 1 Preparation to take +1 forward\
 on any roll when carrying out your plan.\n\nPreparation is a shared stat: any character can use !shift prep+/-NUM\
 to add or subtract from the group Preparation.',
        method: function(){return this.text}
    },
    link: {
        name: 'Link',
        key: ['link'],
        text: 'LINK: When you introduce a new NPC to the game by name, look, and outlook, decide how you know them\
 and feel about them and roll.',
        success: 'On a 10+, the relationship is in good standing.',
        mixed: 'On a 7–9, the relationship is strained or frayed in some way and they have 1 Giri on you.',
        fail: 'On a 6-, in addition to what the MC says, they also have 1 Giri on you.',
        stat: 'stat',
        method: functions.moveRoll
    },
    emporium: {
        name: 'Emporium',
        key: ['emp', 'empor', 'emporium'],
        text: 'EMPORIUM: When you enter a place in order to find something not readily available, answer the following\
 questions and take +1 for each:\n\
 • Is it a part of a corporation?\n\
 • Is it filled with a wide variety of merchants?\n\
 • Is it policed in some way?\n\n\
The, answer the following questions and take -1 for each:\n\
 • Are thieves and urchins circulating here?\n\
 • Is there a gang presence or other form of oppression here?\n\
 • Are you known to the sellers here?',
        success: 'On a 10+, you find what you are looking for.',
        mixed: 'On a 7–9, the MC chooses one of the following:\n\
 • It costs 1 Cred more than you’d expect.\n\
 • They don’t have it, but they know someone who does.\n\
 • They just sold their last one to _____.\n\
 • They have something similar, but inferior.',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'num',
        method: functions.moveRoll
    },
    proxy: {
        name: 'Proxy',
        key: ['proxy', 'prox'],
        text: 'PROXY: When you exchange Cred in order to have something brought to you, roll and add the\
 number of Cred you spend doing so (max roll+3).',
        success: 'On a 10+, it comes to you, no strings attached.',
        mixed: 'On a 7–9, it comes to you, or something that is pretty close, but there is an additional\
 cost to the endeavor; the MC will tell you what it is.',
        fail: 'On a 6-, be prepared for the worst.',
        stat: 'num',
        method: functions.moveRoll
    },
    spikeState: {
        name: 'Spike',
        key: ['spike'],
        text: 'SPIKE STATE: Any time you roll a move with an emotional State, you gain a Spike in that State.\
 Spikes are represented by a • next to the State name in your character sheet. When you roll a State, it will also\
 show you the current number of Spikes on that State in the move print-out.\n\n\
After you resolve a move, you may choose an opposing State to mitigate, and remove an emotional Spike from that\
 State by using the command __!spike STATE-1__ (EX: __!spike sad-1__ if you just rolled with JOYFUL)\n\n\
When you hit five Spikes in one State (•••••), that State becomes locked at +1 and all other States locked at -2.\
 If you continue to use the Spiked State, it will roll as +1 and alleviate by one • each time you use it.\
 If you use a different State while Spiked, it will roll as -2. but will clear the locked State.\n\n\
You can also manually change your State Spikes up or down using the command __!spike STATE+/-NUM__ at any time.\n\n\
EXAMPLES:\n\
__!spike mad+2__ will add two •• to your MAD State.\n\
__!spike power-1__ will remove one • from your POWERFUL State.',
        method: functions.spikeState
    },
    addGiri: {
      key: ['addgiri'],
      text: 'To add 1 to your Giri stat with another character, use the command __!addgiri__ followed by the\
 other character\'s name. Enter __!giri__ to view your Giri list.\n\n\
EXAMPLE: It\'s the end of the session and you have to add Giri+1 to your Giri with Bucky. Enter __!addgiri bucky__ to shift\
 your Giri score up by one.',
      method: functions.addGiri
   },
   subGiri: {
      key: ['subgiri'],
      text: 'To subtract 1 from your Giri stat with another character, use the command __!subgiri__ followed by the\
 other character\'s name. Enter __!giri__ to view your Giri list.\n\n\
EXAMPLE: You accidentally have too many Giri with Lulu! Enter the command __!subGiri lulu__ to shift your Giri score\
 with Lulu down by one.',
      method: functions.subGiri
   },
   printGiri: {
      key: ['giri'],
      text: 'Giri is a commodity, except it tracks debts, obligations, social standing, and sometimes honor or face.\n\n\
 • To set your Giri stat with the other players, use the commands __!addgiri__ and __!subgiri__ followed by the other character\'s name.\n\n\
 • Giri will not automatically add to your **Leverage** move, but you can enter __!lever +name__ to use a stored Giri stat.\n\n\
 • If you want to remove a character entirely from your Giri list, enter __!removegiri__ followed by the character\'s name.\n\n\
EXAMPLES:\n\
 • You just saved Bucky’s life, and you need to add Giri+1 with Bucky. Enter __!addgiri bucky__ to shift\
 your Giri score up by one.\n\n\
 • You accidentally have too many Giri with Lulu! Enter the command __!subgiri lulu__ to shift your Giri score\
 with Lulu down by one.\n\n\
 • Your friend EagleEye just died. Though you\'ll never forget them, enter __!removegiri eagleeye__ to remove them\
 from your Giri list.\n\n\
 • You decide to **Leverage** Lucky. You don\'t remember what your Giri score with them is, but you\
 can just enter __!lever +lucky__ to automatically add your saved Giri score from the list.',
      method: functions.printGiri
   },
   removeGiri: {
      key: ['removegiri'],
      text: 'If you want to remove a character entirely from your Giri list, enter __!removegiri__ followed by the character\'s name.\
 Enter __!giri__ to view your Links list.\n\n\
EXAMPLE: Your friend EagleEye just died. Though you\'ll never forget them, enter __!removegiri eagleeye__ to remove them\
 from your Giri list.',
      method: functions.removeGiri
   },
   npcGenerator: {
    key: ['newnpc', 'npc'],
    text: 'To create a new randomized NPC, enter __!npc__ for some fresh meat.',
    name: ['Aziz', 'Cartman', 'Cowboy', 'Demon', 'Frank', 'Furiosa', 'Luka', 'Roadkill', 'Max',
'Roo', 'Rook', 'Squirrel', 'Tower', 'Gant', 'Hub', 'Intrigue', 'Jacinta', 'Jinx', 'Lilliana', 'Master D',
'Sally', 'Mr. Johnson', 'The Goto', 'Case', 'Core', 'Crowley', 'Dead Rob', 'Djinn', 'Frozz', 'Gaius Lupo',
'Hazer', 'Johnny', 'Nezumi', 'Patch', 'Wyldstyle', 'Archer', 'Boone', 'Deckard', 'Frost', 'Marîd',
'Markham', 'Mr. Black', 'Python', 'Quade', 'Richards', 'Ritter', 'Seamus Riley', 'Taylor', 'Bertrand',
'Blue', 'Kit', 'Loe Qi', 'Max', 'Nef', 'Smoke', 'Spectre', 'Zero', 'Angelo', 'Dead Eyes', 'John', 'LouLou',
'Kennedy', 'Knock', 'Mé Moì', 'Molly', 'Oakley', 'Sarah', 'Sleeper', 'Apostle', 'Chalice', 'Dancer',
'Dillon Vicara', 'Eleven', 'Nebula', 'Ice Smooth', 'Lola Chrome', 'Magnetic', 'Nigell', 'Prophet9',
'Relay', 'Sennheiser', 'Shard', 'Conduit', 'Farouk Dakins', 'Glass', 'Grant Access', 'Edison',
'Hoot', 'Madison Brookes-Watanabe', 'Parisa Zahed', 'Scoop', 'Spider', 'Witness', 'Alif', 'Armitage',
'Connomarah', 'Cortez', 'Grit', 'Mac', 'Sly', 'Turnus', 'Turner', 'Angel.1.3', 'AntiK-Tera', 'Bobby',
'Cathode', 'Eleni Larabee', 'Houwayyek', 'Mr. Wizard', 'Spanner', 'Transitivity', 'Continuity', 'IV ',
'Error', 'Buzz Scalar', 'Eisbock Kim', 'Dez Wei', 'Itch Azure', 'Violetta Kite', 'Bruce Monsoon',
'Tavi Cybilline', 'Dog Boson', 'Fifi Reason', 'Found Sadiq', 'Lin Burn', 'Weaver Anika', 'Lice Genome',
'Beastie Proper', 'Tai Specktor', 'Calendar Sweet', 'Peacock Circadian', 'Lucy Bom', 'Miquel Turn',
'Heron Luz', 'Starfish', 'Safia Rhiz', 'Dubious Hexa', 'Dominique Felix', 'Silk Razor', 'Linus Ideation',
'Crocodile Adi', 'Deneb Kraft', 'Omar D’rail', 'Bolo Chop', 'Gone-Case', 'Vincente Chin', 'Alonzo Fringe',
'Topaz Major', 'Ugo Ajit', 'Espen Whip', 'Tyko Bunko', 'Momo Volition', 'Rosamund Endowment', 'Katia Stematic',
'Shareese Bug', 'Doomsday Atrox', ' Adamanteus Wonk', 'Quiscula Standard', 'Solen Reaumur', 'Mephitis Rankine',
'Higgs Latranus', 'Dasypus Greenwich', 'Didelphis Dreyfus', 'Darling', 'Mother Superior', 'Superior Mother',
'Advantageous', 'Good Grief', 'Hertzsprung', 'Havoc Gwine', 'Arcturus Kirchoff', 'Tabula Rosellini',
'Summary Adulation', 'Thursday Praetorius', 'Nefarious Various', 'Symptom Punchgood', 'Possibility Advocate',
'Vigilant Hyper', 'Crisis Constant', 'Honest Inoki', 'Murphy Nyx', 'Occam Shibata', 'Mitsue Toten',
'Maddie Desai', 'Eladia Melchor', 'Robena Yuku', 'Calista Watanabe', 'Quintus Quint', 'Honda Acrid',
'Argent Esper', 'Signy Pixxal', 'Lilou Typhon', 'Tick Eight', 'Pilar Pronto', 'Glitch 1-1', 'Elai Zapotec',
'Iota Fuse', 'Kiri Lilit', 'June Yael', 'Orlando Dreamer', '#69', 'Vera Media', 'Elán Vitál', 'Arion Nazim',
'Helvetika Kerning', 'Honour McCoin', 'Finnian Skuldt', 'Mohammed Calub-Dupree', 'Eris Tate', 'Raj Ibushi',
'Lincoln Shimizu', 'Ars', 'Fairness Moravec', 'Prosperous', 'Tanith Doxx', 'Calico Annette', 'Nero Levine',
'Qualia De Quincey', 'Fatimah Planchette', 'Ocean Warlord', 'Compton Denholm', 'Trivia Everglade',
'Panic Phisher', 'Theora Largo', 'Auntie Gold', 'Pascal-6', 'Ice Think', 'Huxley Toussaint', 'NMC',
'Paladin', 'Simone Govinda', 'Escher Cobalt', 'Long Shot', 'Daring Singularity', 'Zeno Vantage',
'Lithium Ion', 'Swallowtail Nkoni', 'Teal Logical', 'Eustacia Chiba', 'Aziza Shore', 'Hanif Janani',
'Alexi Thymia', 'Q. Validity', 'Cogito Sum', 'Ax Matic', 'Cipher Congruence', 'Zeta Palladium',
'Clue Zubenel', 'Omen Alogl', 'Aster Thuban', 'Kai Calculia', 'Echo Allotrope', 'Fractious Asperity',
'Penury Ineluctable', 'Meretricious Adumbrate', 'Salubrious Fulmin', 'Inimical Monstrate', 'Salut Probit',
'Profligate Sedu', 'Vitiate Bellicose', 'Voluble Occlusion', 'Cavil Contumacious', 'Desuetude Encomium',
'Panegyric Pellucid', 'Prevaricating Obstreperous ', 'Obviate Expiate', 'Rarefy Salaciously',
'Tacit Soporific', 'JeJune Insouciant', 'Axiom Effrontery', 'Aver Meet', 'Apogee Pedant',
'Polemical Extempore', 'Prolix Apotheosis', 'Sentent Assid', 'Evanescent Descry', 'Plangent Inure',
'Perfunct Decor', 'Germane Torque', 'Grandiloquence Trench', 'Ennui Imbroglio', 'Halcyon Gainsay ',
'Tyro Glib', 'Paean Nadir', 'Exegesis Qualms', 'Allay Alloy', 'Pavonine Monocoque', 'Acumen Didact ',
'Wag Saturnine', 'Exigent Exit', 'Dahlia Recondite ', 'Misreason', 'Miss Rule', 'The Tin God', 'Eidolon',
'Harrier', 'Longshot', 'Sari Sprinter', 'Eratosthenes', 'The Triumphant', 'Compass Rose', 'Hornet', 'Cornet',
'Wallow', 'Scientia est Lux', 'Paani Voyager', 'Singularity', 'Daring', 'Occam’s Envoy', 'Honest Dealing',
'Democritus', 'Vajra', 'Gypsy Moth', 'Insured Asset', 'Profit Margin', 'Beast of Burden', 'Archimedes',
'Saracen', 'Sassanid', 'The Coffer of Carthage', 'Xian Courier', 'Salt Petre', 'Renown', 'Spirit of Inquiry',
'Alacrity', 'Endeavoring Ruin', 'Spirit of Havoc', 'Bene Elohim', 'La Petit Lorraine', 'Bi Xiu', 'Satori',
'Lithium', 'Shatabhisha', 'The Nautilus', 'Black Tortoise', 'Mulberry', 'Hydrae', 'Yao Gui', 'The Vielmond',
'Zeno', 'The Golden Age', 'Ofrenda', 'Ex Nihilo', 'Wu Li', 'Aporia', 'Wormwood', 'Garm', 'Geryon',
'Nomen nescio ', 'Gethsemane', 'Tamarisk', 'Swallowtail', 'Nkoni', 'Sancti', 'Jy’ha al-Sa',
'Muutaa idb Arooq', 'Paktong', 'Oneiroi', 'The Terror', 'Cai Shen', 'Eschatological', 'The Irregular',
'Aleph-Null', 'Zeno’s Paradox', 'Appeal to Mercy', 'Iconoclast', 'Windskip', 'Plague-bearer', 'Lambent',
'Teal Logical', 'Adulation', 'Blindcat', 'Tullbergia', 'The Trash Compactor', 'Whisper Trippingly',
'Hand-Sawn', 'Fall-off', 'The Duke of Seoul', 'Quite Deer', 'Gourmand', 'Satay', 'Chaat', 'Bagel',
'Cal Zone', 'Wurst', 'Funnel', 'Kosher', 'Kebab', 'Pepito', 'Pretzel', 'Bake & Shark', 'Gyro',
'Ham Taylor', 'Slider', 'Submarine', 'Counter-Map', 'Edgeland', 'Exurb', 'Hemisphere', 'Barkdust',
'Bioswale', 'Runoff', 'Waterbar', 'C-square', 'Geohash', 'OKATO', 'QDGC', 'LOCODE', 'Acre', 'Crosshead',
'Boundary Marker', 'Wire-drag', 'Albatross', 'Auk', 'Boobie', 'Cormorant', 'Gull', 'Pelican', 'Petrel',
'Shearwaters', 'Suliforme', 'Frigatebird', 'Fulmarine', 'Tropic', 'Borax', 'Animal machine', 'Conduit',
'Metameme', 'Orthotes', 'Paradigm Sift', 'PsyApp', 'Sublime', 'Tulpa', 'POV', 'Infinity Walk', 'Logovisual',
'THOG', 'Wicked Problem', 'Spiral Silence', 'Simula', 'Force Chain', 'Swarm', 'Kidult', 'CADRE', 'B3ta',
'Oxide', 'Junker', 'No Logo', '6G', 'Lux Flex', 'Blu Tack', 'Zodiaq', 'Brazen Volt', 'Ade/apt', 'SeeChange',
'Xbow', 'Slaybell', 'Wall_of_Death', 'Stanislas', 'Quinine', 'Felix Camonghe', 'Yosimar Hie Minh', 'Vuong',
'Kwame', 'Bozu Bennu', 'Hyrcanian Shimizu', 'Arcosanti Nak ', 'Philemon Bashir ', 'Enos Experience',
'Samson Prosperity', 'Denholm Dryden', 'Digital Ruin', 'Bit', 'Theora', 'Infinite Loop', 'Shady Demon',
'Null Razor', 'Lord Vagabond', 'Nikita', 'NIKE', 'Analog Exile', 'Tiamat', 'ChromeRat', 'Lady_Scoundrel',
'Rand0m 0racle', 'Largo', 'Phisher King', 'Bit Fiend', 'Prime Ruin', 'Neural Brandi', 'Cai Shen', '//GHOST//',
'Comrade Helix', 'Defcon Eris', 'Duke Blitz', 'Acid Sync', 'Trivia', 'Barry Manifold', 'Syntax Terror',
'Case Panic', 'Motoko Alloy', 'Silai Khanishcha', 'Ientis Seva', 'Gori Nova', 'Kofi Boklobe', 'Ofid Kovsky',
'Yentir Toeva', 'Olem Letdubria', 'Toni Teva', 'Ursuna Sharashcha', 'Nessa Cziakarpit', 'Antoria Provoi',
'Rina Oropov', 'Alco', 'Noize', 'Coil', 'Joliet Quozhenko', 'Murphy Embodian', 'Vox Torrent', 'Quartz',
'Booth Powers', 'Tisha Guardpiece', 'Venetia', 'Conal', 'Moses Amiri', 'Asema Walid', 'Izel', 'Julian Chin',
'Pavel', 'Rashid', 'Abiyah', 'Destiny ', 'Malik Caleb', 'Dasim', 'Coriander', 'Biyu', 'Xifeng', 'Iva', 'Abi',
'Oren', 'Tovia Yefet', 'Ilya', 'Anja Araka', 'Hideo', 'Keji', 'Kurt Bashir', 'Ennis Rose', 'Bronwen Omen',
'Quorra Clarke', 'Lenore Dahlia', 'Carmine Deneb', 'Thalassa Vox', 'Apophis', 'Concordia', 'Wendell Onfroi',
'Jian', 'Binh Thibaut', 'Ashur Criamon', 'Diondre Nero', 'Tyrus Talin', 'Ximena Telemachus', 'Erlea Kadence',
'Chimon Delphi ', 'Faustino Acaph', 'Plume Vitus', 'Alathea Le Fanu', 'Remedio Sophrosune,', 'Antimony Agasha',
'Ivy Aziz', 'Uncle Iron,', 'The Jacobin', 'Gargoyle', 'Strayhorn', 'Saris Smoke', 'Makayla Deion', 'Elon',
'Absalom Ajou', 'Casim Isiah', 'Miranda Vassago', 'Ipos Shax,', 'Tien Drake', 'Corentine Teale', 'Ravenna',
'Borvo,', 'Jakub Costa,', 'Valentin Barebone', 'Lapis Vesper', 'Dog-Day Solomon', 'Adur Ignis', 'Aldara ', 'Wren',
'Iodine', 'Calamity', 'Qadesh Constat', 'Lanka Red', 'Iblix,', 'Zlata Thrush', 'Bettelheim', 'Nevaeh Aurelia',
'Dedra Hyacinth,', 'Kina', 'Kala', 'Mishon', 'Ferric Murmur', 'Huo Aethon', 'Sullivan', 'Zev', 'Yew', 'Cedar,',
'Nox Nyx', 'Belkane Innogen', 'Andraste Cos,', 'Mirce Vesna', 'Leraje', 'Vanity', 'Penury Vug', 'Orlando Obex',
'Hallux Thorax Ceph', 'Pay-Not', 'Mallock Ordinary', 'Sketch', 'Sparrow', 'Dodge', 'Humble Farley', 'Shrike Nora'],
    gender: ['cis male', 'cis female', 'agender', 'androgynous', 'gender fluid', 'gender nonconforming',
'gender variant', 'non-binary', 'trans male', 'trans female', 'two-spirit', 'pan-gender', 'genderqueer',
'male', 'female', 'transgender', 'transmasculine', 'transfemenine', 'neutrois', 'bigender', 'polygender',
'gender apathetic', 'maverique', 'novigender', 'demigender', 'aliagender'],
    skin: ['artificial', 'asian or south asian', 'black', 'decorated', 'hispanic/latinx', 'indigenous',
'middle eastern', 'white', 'camouflaged', 'covered', 'changing', 'reinforced'],
    eyes: ['laughing', 'cool', 'hard', 'cold', 'distant', 'artificial', 'trustworthy', 'focused', 'young',
'smug', 'impatient', 'twitching', 'mocking', 'jaded', 'restless', 'penetrating', 'resigned', 'obscured',
'searching', 'black', 'cunning', 'dark', 'dead', 'manic', 'unhinged', 'mirrored', 'wild', 'passionate',
'shining', 'driven', 'sad', 'empathic', 'dejected', 'haunted', 'squinty', 'appraising', 'excited'],
    face: ['blank', 'thin', 'covered', 'attractive', 'decorated', 'rugged', 'scarred', 'hidden',
'friendly', 'sneering', 'smooth', 'nondescript', 'weathered', 'impassive', 'ambiguous', 'calm', 'serene',
'striking', 'alluring', 'sculpted', 'grim', 'composed', 'serious', 'expressive'],
    body: ['toned', 'lithe', 'compact', 'scarred', 'augmented', 'flabby', 'unfit', 'small', 'thin',
'bulky', 'fleshy', 'muscular', 'awkward', 'young', 'wiry', 'athletic', 'relaxed', 'soft', 'pudgy', 'tired',
'tense', 'graceful'],
    wear: ['flashy', 'formal', 'utility', 'scrounged', 'vintage', 'leather', 'military', 'corporate',
'street', 'punk', 'worn', 'faded', 'casual', 'high fashion', 'avant-garde', 'messy', 'outdated', 'plated',
'militarized', 'comfort-forward', 'vapor', 'Digital illusions', 'Stylized', 'Changeable', 'Utopian', 'Decaying',
'Contracted', 'Cheap', 'Shifting', 'Retro', 'Shimmer', 'Tourist-chic ', 'Mixed-media', 'Antagonistic', 'Free',
'Mod', 'Mal', 'Kitsch wear', 'Pop-culture ', 'Discreet ', 'Display', 'Structural', 'Lo-fi', 'Hi-def', 'Mirage',
'Retrotech wear', 'Share', 'Abandon', 'Scare', 'Spy', 'Smart'],
    cyberwear: ['cybereyes', 'cyberears', 'cybercoms', 'augmented strength', 'implanted tools',
'implanted weaponry', 'cyberlegs', 'dermal plating', 'retractable blades', 'holdout firearm',
'monofilament whip', 'internal assassin implant', 'muscle grafts', 'neural interface', 'synthetic nerves',
'skillwires', 'tactical computer', 'Vantablack skin', 'Facial Recognition Eyes', 'Glitchy Anima-Tattoos',
'NanoTech Blood', 'Cyberoptics', 'Cybertongue', 'Analytic Upgrade', 'Rad-Detector Implant', 'ChemSkins',
'Voice Synthesizer', 'Smell Modulator', 'Concealed micro-Fabricator (Forearm)', 'Prism Teeth',
'Toxin Binders', 'Subdermal Motion Detector', 'Teleoptics', 'Audio/Video Recorder & Generator',
'Lowgrade VR Palm Projectors', 'Cybersnake', 'Rippers', 'Reinforced bones', 'Muscle and Bone Lace',
'Sense Extensions', 'Subdermal Armor', 'Skin Weave', 'Machine Link', 'Techhair',
'Cyberaudio (Phone Splice, Scrambler)', 'Biometrics monitor', 'Independent Air Supply', 'Light Tattoo',
'SubDermal Pocket', 'Nasal Filters', 'Vehicle Link', 'Subdermal Cowl', 'Pain Editor', 'Nanosurgeons',
'Speedware', 'Torso plate', 'Neural-Implanted Infomorph', 'Enhanced Antibodies', 'Wrist-guns',
'Reinforced knuckles', 'Cybergills', 'Tactile Boost', 'Synthskins', 'Hidden Data-Cache',
'Jailbroken Neural Net-Hacker', 'Subdermal wallet', 'Radar Implant', 'Interface plugs', 'Chem Analyzer',
'Slice N’ Dice', 'Sonar Implant', '2 Detachable micro-Drones', 'Assault Nano-swarm', 'Skinwatch',
'Faceplate', 'Cybermodem', 'Adrenal boost', 'Audio Vox', 'Reinforced joints', 'Subdermal holster',
'Fear Antigens', 'Vocal Stunner', 'Snare-hands', 'Magnetic hand', 'Stunner-skin', 'Self-repairing Liver',
'Optical Cacher', 'Technoglands', 'Intrinsic Biosplicer', 'Cheap legs', 'Finger-blasters',
'Military-Grade Relay', 'Photonic display', 'Experimental Elbow', 'Titanium Greaves', 'Pauldron Implants',
'Armjack', 'Booster legs', 'Dermal Stapler', 'Interface cables', 'IR optics', 'Transdermal jammer',
'Medscanner', 'Spray-on skin', 'Implanted cutting torch', 'Palm TV'],
    method: functions.newNpc
},
droneGenerator: {
    key: ['newdrone', 'drone'],
    text: 'To create a new randomized drone, enter __!drone__ followed by the size: tiny, small, medium, large.\n\
EXAMPLE: !drone small',
    tinyName: ['Flitter Bug ', 'The Pepper Box Special ', 'Zoomba ', 'Malwaria ', 'The Gordian Gnat ',
'Hydrae Nano ', 'Crypsis', 'Dew-Claw', 'Epiphyte', 'Viral Louse', 'Emphyton', 'Rete Mirabile Nano-Net',
'Demodex', 'Periwinkle', 'Neuro-Linked Shrew', 'Technosphere', 'Longtail'],
    smallStrengths: ['fast', 'rugged', 'off-road', 'responsive', 'uncomplaining', 'easily repaired',
'stealthy', 'tight encryption', 'autonomous', 'robot armed', 'armed'],
    smallName: ['Tajong PAL Securit-Eye ', 'Hornet ', '"I See U" Biometric Rover ', 'La Petit Lorraine ',
'Windskipper ', 'Steiger "Blindcat-0" ', 'Brood-17', 'Crinoid', 'Helix', 'Carthusian Dart', 'Falconet',
'Pit-Viper ', 'Fifi', 'Hexa-gone', 'Zilch', 'E-null', 'Lesser Weevil', 'Panoptic', 'Chymera', 'Noughtalis',
'Hover Gremlin', 'Solar Swerve'],
    mediumStrengths: ['fast', 'rugged', 'off-road', 'responsive', 'uncomplaining', 'easily repaired',
'stealthy', 'tight encryption', 'autonomous', 'robot armed', 'armed'],
    mediumName: ['Dragnet Fly ', 'Polymer Slipper ', '5t33d ', 'Harrier ', 'Longshot ', 'Sari Sprinter ',
'Mercy Seat ', 'Xian Courier ', '"Guar Ant Tea" ', 'The Trash Compact ', 'Derecho', 'Stalking Horse',
'Bolthole', 'Oubliette', 'Biturong Barker', 'Kasai Royal', 'SBO', 'Vox Pop', 'Body Count', 'Indra-net',
'Auda Scrambler', 'Quiet Sonata', 'Cressida Gamma-Hybrid', 'Prizm Red', 'Sommerset Pacer', 'Optima Xtreme T&C',
'Omni Sunfire', 'Vulture-3 Gyre', 'Chevron Lux', 'Econolyte', 'Camino Real-Tek', 'Bronco Pulsar',
'Jackrabbit Special', 'Wildcat Trailblazer XV', 'Flicker Delux', 'Sapporo Reliant RE', 'Series 66',
'Streak Compensator', 'Topaz Newt', 'Hurricane Golf', 'Doppler Omega'],
    largeStrengths: ['fast', 'rugged', 'off-road', 'responsive', 'uncomplaining', 'easily repaired',
'stealthy', 'tight encryption', 'autonomous', 'robot armed', 'armed'],
    largeName: ['"Fool Me Once"', 'Bliss of the Screamer ', 'Counter Shade ', 'Misreason ', 'Miss Rule ',
'The Tin God ', 'Eidolon ', 'The Honda Triumphant ', 'Compass Rose ', 'Paani Voyager ', 'Occam’s Envoy ',
'Honest Dealing ', 'Profit Margin ', 'The Coffer of Carthage ', 'Spirit of Inquiry ', 'Endeavoring Ruin ',
'Spirit of Havoc ', 'Satori Lithium ', 'Black Tortoise ', 'The Golden Apple ', 'Hopepunk ', 'Poetic Discourse ',
'Goose Egg ', 'Quite Deer ', 'Nukewonk', 'C-14', 'Ovipositor', 'Lithobarge', 'Thermon', 'Living Rampart',
'The Conqueror Worm', 'Goondu XL', 'Beta-MAX', 'Corrado Ascender', 'Eurovan Titan', 'Sebring Wrecker',
'Cyclops 4000', 'Arcology Cube', 'Super-46', 'Apogee Lazer', 'Glitchmancer', 'Powerbroker'],
    sensors: ['magnification', 'thermographic', 'jamming', 'image enhancement', 'analysis software',
'sonar'],
    weaknesses: ['slow', 'fragile', 'unreliable', 'loud', 'loose encryption', 'obvious'],
    method: functions.newDrone
},
weaponGenerator: {
 key: ['newweapon', 'weapon'],
 text: 'To select a random weapon, enter __!weapon__\n(thanks to *Augmented Reality* by Paul D Gallagher)',
 weapons: ['Flechette pistols', 'Teleoperated drones', 'Hydraulic fists', 'Bites', 'Aware weapons LAN',
'Spider venom rounds', 'Ornate monokatana', 'Hunter-seeker rounds', 'Pearl handled Glock', 'Bulky laser rifle',
'Scoped needle-rifle', 'Monowire mines', 'Implanted zhi dao', 'Exploding munitions', 'Nerve-burner bombs',
'3D printed QBZ-95', 'Railgun sniper', 'Compound bow', 'Sleek microwavers', 'Dissolving Nanorounds',
'Martial art techniques', 'Antique uZI', 'SOPMODs', 'Auto grenade launcher', 'Drum-fed AK74',
'Self-destructing gun', 'Twin compact SMGs', 'Charm-covered Steyr', 'Liquid nitrogen rounds',
'Camo autoshotgun', 'Ornate bladed finger', 'Incendiary rounds', 'Flechette adapted M4', 'Screamer grenades',
'Big polymer revolvers', 'Hands-free trigger', 'Rifle with chatty AI',' Cortex bomb', 'Bright Plastic SMG',
'Chinese SMG clone', 'Caseless KrISS Vector', 'Brace of small pistols', 'Scanner shielded gun',
'Inbuilt Scorpion SMGs', 'Crippler rounds', 'Taser', 'Monoknives', 'Compact stutter-laser',
'Disposable pistols', 'Toxin-loaded needlers', 'Underslung blinder', 'Full spectrum targeter',
'Belt-fed chaingun', 'Vibro-Cleaver', 'Wet-Wired SMG', 'Neural-Linked Rifle', 'Implanted Holdout Pistols',
'Gravity Knives', 'Concentric Auto-Axes', 'Flechette Revolver', 'Folding Rifle ', 'Nano-Filament Wire',
'Orbital Daggers', 'Augmented Reality Razor', 'Vapor Thrower', 'Neuro-Wired Shotgun with a Jumpy AI',
'Fungicultured Whip', 'Brace of Fabricated Polymer Pistols', 'Modular Blade', 'Hail Rifle',
'Infused Thermal Throwing Stars', 'Scoped Thermal Rifle', 'Linked Smart Hammer', 'Mid-tier Pulse Rifle',
'Antiquated Plastic Pistol', '1st Generation Smart Pistol with an irascible Infomorph',
'Micro-missile Launcher', 'Amped SMG', 'Thermo-Triggered Auto-cannon', 'Budget Laser', 'Neuro-taser',
'Spawnblades', 'Auto-chainknife', 'Bionic-hammer', 'Autolathe', 'Particle saw', 'Incinerator Hands',
'Photonic whip', 'Crowd Control Restrainer', 'Assault Web Flayer', 'Cremator Magnum',
'Shortrange Ripper Rifle', 'In-Built Fabricator Pistol', 'Telescopic disruptor baton', 'Nanite rifle',
'Torque Handgun', "Club",  "Knife",  "Sword",  "Axe",  "Nunchaku/Tonfa",  "Naginata",  "Shuriken",  "Switchblade",
"Brass Knuckles",  "Sledgehammer",  "Chainsaw",  "Bayonet/Survival Knife",  "Entrenching Tool",
"Excalibur Nightstick (Taser-type)",  "Excalibur Nightstick (Mace-type)",  "Excalibur Nightstick (Basic-type)",
"IMI \"Chainknife\"",  "Kendachi M-33 Powersword",  "Kendachi Mono-Two",  "Kendachi MonoKatana®️",
"Kendachi Monoknife®️",  "Kendachi Monosword Cane",  "Kendachi Monowhip",  "Mystic Technologies Spring Knife",
"Mystic Technologies Nunchaku/Blade",  "Nomad Smartwhip",  "SPM-1 Battleglove",  "SlamDance, Inc. Spawnblade",
"Utility Sword/Machete",  "Arasaka Arms Half-Bow",  "Eagletech \"Bearcat\" Self Bow",
"Eagletech \"Tigercat\" Compound Bow",  "Eagletech \"Tomcat\" Compound Bow",  "Eagletech \"Wildcat\" Sport Bow",
"Eagletech \"Arbelest\" Crossbow",  "Eagletech \"Handbow\" Crossbow",  "Eagletech \"Scorpion\" Crossbow",
"Eagletech \"Stryker\" Crossbow",  "Nomad Hand Crossbow",  "Apex Mobile Point Defense System",
"Arasaka \"Nauseator\" Riot-Control Device",  "Arasaka Restraint Caster",  "Arasaka WXA Computer-Aimed Weapon",
"Avante P-1135 Needlegun",  "Dynatech Industries Hand Taser",  "Enertex AKM Power Squirt",  "Kendachi Dragon",
"Kendachi Monowire",  "Malorian Arms Sliver Gun",  "Militech Electronics LaserCannon",  "Militech Electronics Taser",
"Militech Electronics Taser II™️",  "Mitsubishi Taser",  "Mystic Technologies Arrow Gun",
"Nelspot \"Wombat\" Airpistol",  "Nomad Boomerang",  "Nomad Pneumatic Bolt Gun",  "Nomad Sling",
"Petrochem Drug-A-Thug™️",  "Pursuit Security, Incorporated Beanbag Gun",  "Pursuit Security, Incorporated Stundart Pistol",
"Pursuit Security, Incorporated Webgun",  "Skunker™️",  "Streettech \"Burst\"",  "Techtronica 15 Microwaver",
"Techtronica 20 Microwaver",  "Techtronica Black-Zap Glove",  "Techtronica M40 \"Pulse Rifle\"",
"Techtronica Model 009 Volt Pistol",  "Tsunami Arms \"Airhammer\" Air Pistol",
"Tsunami Arms Underbarrel Capacitor Lasers/Microwavers",  "UrbanTech \"Lance\" Mini-Missile",  "Astra Style-6",
"BudgetArms C-13",  "Dai Lung Cybermag 15",  "Federated Arms Impact",  "Federated Arms X-22",
"Federated Arms X-38",  "Towa Manufacturing Type-12 Police Pistol",  "Arasaka WSA Autopistol",  "BudgetArms C-41",
"BudgetArms Laser-Niner",  "Beretta M97P",  "CCMMC Goaxing Xiuxi CM-3",  "Colt Alpha-Omega Competition Pistol",
"Colt Enforcement 10 Sidearm",  "Dai Lung Streetmaster",  "FN Browning \"3-Spot\" Machine Pistol",
"Federated Arms X-9mm",  "Fashion Gun 9",  "Goncz-Taurus Pistol",  "Glock Thirty Machine Pistol",
"Hammer M-11 Bolt Pistol",  "IMI Gamad",  "Kang Tao Type 97",  "LeRoi Maxi-10",  "Militech Arms Avenger",
"Militech Black Widow Flechette Pistol",  "Militech Silver Shadow Flechette Pistol",  "Nomad .357 Magnum Autoloader",
"Nomad .357 Magnum Revolver",  "Sci Fi Starrior 4",  "Stein & Wasserman \"Tri-Star\" Revolver",
"Sternmeyer P-41 Autoloading Pistol",  "Stolbovoy St-2 Pistol",  "Surprising Stranger",  "Teen Dreem",
"Texas Arms Model-351 Gyrojet Pistol",  "Towa Manufacturing Type-13 Police Pistol",  "Towa Manufacturing Type-14 Pistol",
"Tsunami Express Racegun",  "Wondernines",  "BudgetArms Auto 3",  "Dai Lung Magnum",  "Espinoza One Shot",
"Malorian Arms Heavy Flechette Pistol",  "Mustang Arms \"Mark II\"",  "Nova Model 338 Citygun",  "Nova Model 757 Cityhunter",
"Stein & Wasserman Bi-Power Handcannon",  "Sternmeyer P-35",  "Tsunami Arms \"Raimei\" Ramjet Pistol",
"454 Magnum Disposable",  "Ameritech Magnum",  "Armalite 44",  "Colt AMT Model 2000",
"Constitution Arms Multi-Ammunition Pistol",  "Federated Arms 454 DA \"Super Chief\"",  "Malorian Arms 3516",
"Militech .477 Boomer Buster",  "Nomad .44 Magnum Revolver",  "Nova Arms Plasmatic™️ Revolvers",
"Royal Enfield Ordnance Spitfire 12mm Battle Pistol",  "Federated Arms Tech-Assault",  "Federated Arms Tech-Assault II",
"Heckler & Koch MPK-9",  "Militech Mini-Gat Machine Carbine",  "Setsuko-Arasaka \"PMS\" Sub-Machine Gun",
"Suranam Machine Pistol",  "Uzi Miniauto 9",  "Arasaka WMA \"Minami 10\"",  "Beretta 1010 Machine Pistol",
"Beretta M-24 Advanced Submachine Gun",  "Heckler & Koch MP-2013",  "IMI \"Gamdaii\"",
"Malorian Arms Sub-Flechette Gun",  "Militech 10 Submachine Gun",  "Militech Viper Submachinegun",
"Mustang Arms ARS-5C Submachinegun",  "\"Sten\"",  "Stolbovoy StS Submachinegun",  "CCMMC Tuzi-7",
"Chadran Arms City Reaper",  "Heckler & Koch MPK-11",  "Heckler & Koch MPK-2020 SMG",  "Ingram MAC 14",
"Sternmeyer SMG-21",  "Arasaka WCAA \"Rapid Assault Shot 12\"",  "CCMMC Qi-15",  "Constitution Arms Hurricane Assault Weapon",
"Enfield-Ubichi LastChance",  "Luigi Franchi P.16",  "Luigi Franchi \"King Buck\" Multi-Magnum",
"MetaCorp Warhammer™️ Assault Shotgun",  "Military M-12 Close Assault Weapon",  "Militech Bulldog Compact Assault Shotgun",
"Militech Crusher SSG",  "Militech Military/Police Shotgun",  "Mustang Arms Close-Control 20",
"Mustang Arms \"Raider\" Riot Shotgun",  "Sternmeyer Stakeout 10",  "Tsunami Arms \"Ragnarok\" Close Assault Weapon",
"AKR-20 Medium Assault",  "Arasaka WAA Bullpup Assault Weapon",  "CCMMC Jinhua M-9",  "Chadran Arms Jungle Reaper",
"Colt M-18 Assault Weapon",  "Darra-Polytechnic M-9 Assault Rifle",  "FN-RAL Heavy Assault Rifle",
"Federated Arms Light Assault 15",  "Fábrica de Armes M-2012",  "Kalashnikov A-80 Heavy Assault Rifle",
"Militech Dragon Light Assault Weapon",  "Militech M-31a1 Advanced Infantry Combat Weapon",  "Militech Mk IV Assault Weapon (Revised)",
"Militech Ronin Light Assault",  "Royal Enfield Ordnance Liquid Propellant Assault Rifle LPA1",
"Sternmeyer M-95A4 (CG-13B) Assault Weapon",  "Stolbovoy St-5 Assault Rifle",  "Towa Manufacturing Type-20 Advanced Infantry Combat Weapon",
"Towa Manufacturing Type-99 Assault Rifle",  "Arasaka WSSA Sniper System",  "Barrett M-90 Sniper Rifle",
"Barrett-Arasaka Light-20",  "FR-F6",  "Nomad 15mm \"Long Rifle\"",  "Remington Gyro-Sniper Rifle",
"Towa Manufacturing Type-00-Kai",  "Heckler & Koch HK77UK",  "Hughes Rocket Rifle",  "M-99 EVAW",
"Militech Cyborg Rifle",  "Militech Ninja",  "Nomad .357 Magnum Automatic Carbine",  "Nomad .357 Magnum Lever-Action Carbine",
"Nomad .44 Magnum Lever-Action Rifle",  "Nomad 7.62mm Bolt-Action Rifle",  "Nomad \"Personal Weapon\" Derivatives",
"Polymer One-Shot Cannon",  "Stein & Wasserman Model F \"Cyborg Assault\" Weapon System",
"Tsunami Arms Ramjet Rifle",  "Setsuko-Arasaka WSE \"Kajiya\"",  "Barrett-Arasaka WSSE \"Hiyari\"",
"Arasaka WSS/R \"Dahiyari\"",  "Malorian Arms Assault Cannon",  "Militech Mark V Assault Rifle",  "Militech XR-1 MAG- PULSE Gun",
"Arasaka WXXS Multi-Role Sniper System",  "Hecker & Koch HK77SD3",  "Constitution Arms Cyclone Squad Support Weapon",
"Constitution Arms Deluge Crowd Control Weapon",  "Dover GA-1112 Autogun",  "FN MG-6 \"One-on-One\"",
"Fábrica de Armes M-2012HB SAW",  "Heckler & Koch G-6 Advanced Squad Automatic",  "M2A5HB Browning .50cal HMG",
"M-60D Medium Machine Gun",  "Militech High Power 15",  "Militech M-232 Squad Assault/Automatic Weapon",
"Militech Renegade Squad Automatic Weapon",  "Militech 20L Autocannon",  "Sternmeyer M-5A Squad Automatic Weapon",
"Towa Manufacturing Type-8 Medium Machine Gun",  "60mm Light Mortar",  "Colt-Mauser M2X Cannon",  "Commercial Grenade Launchers",
"Kenshiri-Adachi F-253 Flamethrower",  "Light Anti-tank Weapon",  "M-32 Automatic Grenade Launcher",
"M-205 Grenade Launcher",  "M-212 Grenade Launcher",  "Militech AM-3 \"Anti-Matter Rifle\"",  "Militech \"Cowboy\" U-55 Grenade Launcher",
"Militech Hotshot L-ATGM",  "Militech Mini-Grenade Launcher",  "Militech RPG-A Grenade Launcher",
"Militech Scorpion 16 Surface-To-Air Missile",  "Militech Urban Missile Launcher",  "Rhinemetall EMG-85 Railgun",
"Rostovic Wrist Racate",  "Royal Enfield Ordnance 25mm Cockerill Assault Cannon",  "Towa Manufacturing Type-9 Grenade Launcher",
"Tsunami Arms Type-17 Anti-Armor Rifle",  "Tsunami Arms Type-18 Automatic Grenade Launcher",  "Arasaka WCCA \"Susano-0\" Grenade Rifle",
"Militech RRCR \"Archer\" Machine-Rifle",  "Militech BMFG 30mm \"Plasma Cannon\"",  "Setsuko-Arasaka \"Nova\" One-Shot Photon Cannon",
"Arasaka EMF Launchers",  "Militech \"Sure-Shot\" All Purpose Missile",  "Militech Backpack Mortar",
"Militech MAN-PACK Artillery Rocket",  "Militech \"4-Pack\" Missile Pack Launcher",  "14mm Handgun-Magnum Opus \"Big Government\"",
"12-Gauge \"Pistol\"",  "5.56mm caseless \"SMG\"",  "12.7mm \"Assault Rifle\"",  "14.5mm \"Assault Rifle\"",
"30mm HiVel caseless Auto-GL",  "Arasaka \"Pocket Tsunami\" Grenade Launcher",  "Arasaka \"Rage\" 15mm Submachinegun",
"Magnum Opus \"Hellbringer\".666 Magnum Revolver",  "Malorian 3600 Super-SMG",  "SlamDance, Inc. Hyper-Hammer",
"Tsunami Arms Helix",  "United Armaments CLAW",  "Basic Commercial, Corp & Military Grenades",
"Biotech-Askari Motion Restraint Bomb",  "DutchArms GPz-78 Mini-Grenade",  "EMP Grenade",  "FEN Dz 22 \"Saucer Grenades\"",
"Ninja Smoke Pellets",  "Scatter Grenade",  "Spraypaint Grenade",  "Stench Bomb",  "Classic Rifle Grenades",
"DCR Rifle Grenades",  "Militech 25mm Launched Grenades",  "Militech 25mm Pistol Grenades",  "Military 40mm Launched Grenades",
"Antipersonnel Mine",  "Antitank Mine",  "C-6 \"Flatfire\" Plastic Explosive",  "Claymore Mine",
"Explosives Field Kit",  "FEN Dz 25 \"Det Card™️\"",  "Militech PDU-3 Multi-Purpose Perimeter Defense Unit",
"S&W Combat Magnum",  "Llama Commanche",  "Colt .45 \"Peacemaker\"",  "Colt .38 Detective",
"C.O.P. .357 Derringer",  "UZI",  "Vz61 Skorpion",  "Ingram MAC 10",  "H&K MP5 & MP5K",  "Thompson M1",
"Bushmaster",  "FN-FAL",  "AK 47, AKM, AKMS",  "M-16A & M-16A2",  "Styer Aug",  "Winchester M70",  "CAWS",
"Militech UAW Speargun",  "Arasaka Stingray II",  "Militech MTL-1 \"Manhunter\"",  "Arasaka APW Mk IV",
"Multi-Torpedo Platform"],
 method: functions.newWeapon
 },
 corpGenerator: {
       key: ['corp', 'corporation', 'newcorp', 'newcorporation'],
       text: 'To generate a random Corporation, enter __!corp__.',
       name: ['Ecliptics', 'Tipasa', 'Meridian-Azimuth', 'MODALIS', 'Argosy', 'Intra-Lyf',
'Markov-Kornova', 'Edenkov', 'Caldera', 'Apse', 'Wildner-Chao', 'Diseth', 'Omega', 'Vanth', 'Toto Berhad',
'Lingshu', 'Madinat', 'al-Hareer', 'Modern Autonomous', 'Umwelt', 'Weltumspannend', 'Mitamashiro', 'Holbach',
'AOS', 'TerraCom', 'Fangyu', 'Harcrow', 'Higi-Steiger', 'ISO', 'Stoyer & Stoyer', 'Rooke', 'Utopia',
'Hedron', 'Escher', 'Quaintance', 'Occam', 'Toyol', 'Thackery-Hanif-Boaz', 'Hornet', 'Singularity',
'Alacrity', 'Celestine', 'Aporia', 'Paktong', 'Lambent', 'Huxley', 'Pascal', 'Gingko', 'Mercator',
'Everglade', 'Naga', 'Hie Minh', 'Tarragon', 'Phobos', 'Deimos', 'Asch', 'Tate-Emrit', 'Crepitus',
'Advanced', 'Parallax', 'IV', 'Azure', 'Kite', 'Cobalt', 'Prosper', 'Paladin', 'Congruence', 'Swallowtail',
'Zeno', 'Osprey', 'Novo', 'Cortical', 'Indigo', 'Photonic', 'Beltway', 'Kinetics', 'Borges', 'Chaordic',
'Emergent', 'Hemisphere', 'CADRE', 'PsyApp', 'Tulpa', 'Fulmarine', 'B3eta', 'No Logo', 'Ade/apt', 'Geohash',
'Okato', 'Calico', 'Fairness', 'Exurb', 'Crosshead', 'Wire Drag', 'Simula', 'Oxize', 'Lux-Flex', 'Turn Key',
'Gordian', 'Winter', 'Hexagon', 'Ithaca', 'Pretext', 'Conduit', 'Echo', 'Iko', 'Arion', 'Ramsauer', 'Latranus',
'Spektor', 'Boson', 'Acumen', 'JeJune', 'Vantage', 'Encomium', 'Fulmin', 'Raj', 'Hertzsprung', 'Zubenel',
'Saturnine', 'Recondite', 'Argent Esper', 'Signy', 'ProtoPixal', 'Typhon', 'Momo', 'Volente', 'Circadian',
'Cyballine', 'Atrox', 'sPiral', 'Pelican', 'Conduit', 'Orthotes', 'Metameme', 'C-square', 'Albatross',
'Didact', 'Germane', 'Plangent', 'Ennui', 'Calculia', 'Inimical', 'Toten', 'Vera', 'Melchor', 'Watanabe',
'Constant', 'Quintus', 'Rhiz', 'Reason', 'Ideation'],
       trade: ['Surveillance', 'Cybernetics', 'Agri-Tek', 'Robo-Bio', 'Infotechnical', 'Biomedical',
'Research', 'Security', 'Logistics', 'Nano-tech', 'Industrial Transport', 'Development', 'Power', 'Analytics',
'Biotech', 'Construction', 'Demolition', 'Genetics', 'Pharma', 'Armaments', 'Finance', 'A.I.', 'GeoMICS',
'Research & Development', 'Biohacking', 'Cyber-Armaments', 'Automated Leisure', 'World Services',
'PsiTechnics', 'A.R.', 'Fungiculture', 'Hydro-Power', 'Neuro Resources', 'Cosmonautics', 'Oneirautics',
'Modular Robotics', 'Orbital Design', 'Cultivar', 'Arcological Design', 'Air Farming', 'Bioengineering',
'Genetic Modification', 'Hydroponics', 'GMO', 'Import Export', 'Banking', 'Hardware', 'Software',
'Confectioners', 'Cryptodigital', 'Data Equity', 'Atomic', 'Delivery', 'Innovations', 'Communications',
'Defense', 'Media', 'Genomics', 'Technology', 'Data', 'Municipal', 'Engineering', 'Biotics', 'NeuFi',
'Neural Networking', 'Heavy Armaments', 'Hybrid Realities', 'Fabrication', 'Robo-Cyber', 'Eco-Design',
'Nutriments', 'Edutainment', 'Infotainment', 'Negotiations', 'Data Mining', 'Vending', 'Hospitality',
'Public Transport', 'VR', 'Excavation', 'Mech Fabrication', 'RetroTechnics', 'Legal Defense',
'Corporate Espionage', 'Waste Management', 'Manufacturing', 'Electronics', 'Renewable Energy', 'Marketing',
'Solar Energy', 'Hydro Electric', 'Adult Entertainment', 'Wrestling', 'Arts', 'Agri Industrial',
'Outsourcing', 'Education', 'Ergonomics', 'GeoData', 'Proxies', 'Mediation', 'Virtual Law', 'Metrics',
'Infrastructure', 'Horticulture', 'Mining', 'Navigations', 'Intermediaries', 'Anti-Corporate Activism',
'Utilities', 'Photovoltaics ', 'Entertainment', 'Mnemo-Technics', 'Seasteading', 'Tactical Media'],
       suffix: ['Foundation', 'Corp.', 'Division', 'Solutions', 'Ltd.', 'Fund', 'Chartered', 'Amalgamated',
'Contracts', 'Specialists', 'GmBH', 'Institute', 'Consolidated', 'Diversified', 'Concordant', 'Agenda',
'Commission', 'Tetrarchy', 'Syndicate', 'LLC', 'Nonprofit', 'Subsidiaries', 'S.E. (State-Owned Enterprise)',
'Incorporated', 'Pty.', 'Cooperative ', 'Collective', 'OEG', 'Joint Venture', 'GP', 'SP', 'ULC',
'Association', 'Mutual Org.', 'Micro-Enterprise', 'Trust', 'C.I.C.', 'Industrial & Provident Society',
'Ultd.', 'Natl. Assoc.', 'LLP', 'LLLP', 'PLLC', 'Society', 'Union', 'Dynamics', 'Multinational',
'Corporation', 'Cult', 'Agency', 'Club', 'Consortium', 'Council', 'SIG', 'Order', 'Network', 'Presidium',
'Confederation', 'Supraorganization'],
       method: functions.newCorp
 }

}    