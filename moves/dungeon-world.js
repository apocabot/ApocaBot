const functions = require('./../functions/dungeon-world.js');

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
 - SPECIAL MOVES LIST: !special\n\
 - TPW MOVES LIST: !tpw\n\
 - CUSTOM MOVES: !custom\n\
 - SET APOCABOT PREFIX: !setprefix\n\
 - SET APOCABOT GAME: !setgame',
        method: function(){return this.text}
    },
    basicMoves: {
        key: ['basic', 'basicmoves'],
        text: 'BASIC MOVES LIST:\n\n\
 - ROLL DAMAGE: !dam\n\
 - DEFY DANGER: !defy\n\
 - HACK AND SLASH: !hack\n\
 - VOLLEY: !volley\n\
 - DEFEND: !defend\n\
 - SPOUT LORE: !spout\n\
 - DISCERN REALITIES: !discern\n\
 - PARLEY: !parley\n\
 - AID OR INTERFERE: !aid',
        method: function(){return this.text}
    },
    specialMoves: {
        key: ['special', 'specialmoves'],
        text: 'SPECIAL MOVES LIST:\n\n\
 - ROLL LAST BREATH: !breath\n\
 - TAKE WATCH: !watch\n\
 - UNDERTAKE A PERILOUS JOURNEY: !journey\n\
 - TRAILBLAZER: !trailblazer\n\
 - SCOUT: !scout\n\
 - QUARTERMASTER: !quarter\n\
 - CAROUSE: !carouse\n\
 - END OF SESSION: !session',
       method: function(){return this.text}
    },
    tpwMoves: {
       key: ['tpw', 'tpwmoves'],
       text: 'THE PERILOUS WILDS MOVES LIST:\n\n\
 - CAVING: !cave\n\
 - OBSCURED PITS/FALLS: !pitfall\n\
 - FORAGING: !forage\n\
 - MAKE CAMP: !camp\n\
 - SCOUT AHEAD: !ahead\n\
 - NAVIGATE: !nav\n\
 - MANGAE PROVISIONS: !manage\n\
 - HUNKER DOWN: !hunker\n\
 - FORGE AHEAD: !forge',
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
                STR: ['str', 0],
                DEX: ['dex', 0],
                CON: ['con', 0],
                INT: ['int', 0],
                WIS: ['wis', 0],
                CHA: ['cha', 0],
                DAM: ['dam', '!set dam+(d4 : d6 : d8 : d10 : d12)'],
                HP: ['hp', 0]
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
 enter the command followed by all the stat modifiers you want to set.\n• Use the 3-letter\
 stat type +/- stat value.\n• Unentered stats will default to zero or their\
 existing value.\n• !set name+nickname will use your Discord channel nickname\
 as your character name.\n\n\
EXAMPLE: **(You can copy/paste and edit the stats)**\n\
!set name+Me str+0 dex+1 con-1 int-2 wis+2 cha+0 dam+d8 hp+19',
        error: 'Incorrect input, use the format: !set name+bambino str+1 cha-1 etc...',
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
        key: ['shift'],
        text: 'SHIFT STATS: !shift stat+/-num...\nTo shift your character stats\
 by a certain amount, enter the command followed by the stats you want to shift\
 and the amount to change them.\n\
EXAMPLE: !shift str+1 will increase your strength by 1.\
 !shift hp-5 will remove 5 from your hp.',
        error: 'Incorrect input, use the format: !shift str+1 hp-5 etc...\
 (this only works for numerical values)',
        method: functions.shift
    },
    roll: {
       key: ['roll'],
       text: 'ROLL DICE: !roll xdy +z\n\
Use the format !roll xdy +z where x = number of die, y = faces on die, and z = a positive\
or negative modifier, a stat, another +xdy, or any combination.\n\
EXAMPLE: !roll 2d6 +1  OR  !roll 2d6 +wis  OR  !roll 2d6 +1d4\n(SPACES MATTER!)',
       error: 'INCORRECT INPUT: Please use the format !roll xdy +z where x = number\
of die, y = faces on die, and z = additional num, stat, or xdy.\n\
EXAMPLE: !roll 2d6 +1  OR  !roll 2d6 +str  OR  !roll 2d6 +1d4\n(SPACES MATTER!)',
       method: functions.xdyRoll
   },
    damage: {
        key: ['dam', 'damage'],
        text: 'ROLL DAMAGE: !dam +num\n\
 After setting your damage die with !set dam+(d4, d6, d8 or d10), you can easily\
 roll damage after an attack with !dam plus or minus any modifiers from weapons, etc.\
 You can also add additional rolls such as !dam +1d4 which will roll your damage die\
 and add an additional 1d4 roll.\n\
EXAMPLE: !dam  OR  !dam +1  OR  !dam +1d4  OR  !dam -1 +1d4',
        error: 'INCORRECT INPUT:\n\
Set a damage die value (d4 : d6 : d8 : d10 : d12) in your CHARACTER SHEET.\n\
EXAMPLE: !set dam+d4',
        method: functions.damage
    },
    hackAndSlash: {
        key: ['hack', 'hackandslash', 'slash'],
        text: 'HACK AND SLASH: !hack\n\
When you attack an enemy in melee, roll +STR.',
        greatSuccess: 'On a 10+, you deal your damage to the enemy and avoid their attack.\
 At your option, you may choose to do +1d6 damage but expose yourself\
 to the enemy’s attack.',
        success: 'On a 10+, you deal your damage to the enemy and avoid their attack.\
 At your option, you may choose to do +1d6 damage but expose yourself\
 to the enemy’s attack.',
        mixed: 'On a 7–9, you deal your damage to the enemy and the enemy makes an attack against you.',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'str',
        method: functions.moveRoll
    },
    volley: {
        key: ['volley'],
        text: 'VOLLEY: !volley\n\
 When you take aim and shoot at an enemy at range, roll +DEX.',
        greatSuccess: 'On a 10+, you have a clear shot—deal your damage.',
        success: 'On a 10+, you have a clear shot—deal your damage.',
        mixed: 'On a 7–9, choose one (whichever you choose you deal your damage):\n\
 - You have to move to get the shot, placing you in danger as described by the GM\n\
 - You have to take what you can get: -1d6 damage\n\
 - You have to take several shots, reducing your ammo by 1',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'dex',
        method: functions.moveRoll
    },
    defyDanger: {
        key: ['defy', 'defydanger', 'danger'],
        text: 'DEFY DANGER: !defy +STAT\n\
When you act despite an imminent threat or suffer a calamity,\
 say how you deal with it and roll. If you do it:\n\
 - by powering through, +STR\n\
 - by getting out of the way or acting fast, +DEX\n\
 - by enduring, +CON \n - with quick thinking, +INT\n\
 - through mental fortitude, +WIS\n\
 - using charm or social grace, +CHA',
        greatSuccess: 'On a 10+, you do what you set out to, the threat doesn’t come to bear.',
        success: 'On a 10+, you do what you set out to, the threat doesn’t come to bear.',
        mixed: 'On a 7–9, you stumble, hesitate, or flinch: the GM will offer you\
 a worse outcome, hard bargain, or ugly choice.',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'stat',
        method: functions.moveRoll
    },
    defend: {
        key: ['defend'],
        text: 'DEFEND: !defend\n\
When you stand in defense of a person, item, or location under attack, roll +CON. You may:\n\
 - Redirect an attack from the thing you defend to yourself\n\
 - Halve the attack’s effect or damage\n\
 - Open up the attacker to an ally giving that ally +1 forward against the attacker\n\
 - Deal damage to the attacker equal to your level',
        greatSuccess: 'On a 10+, hold 3. As long as you stand in defense,\
 when you or the thing you defend is attacked you may spend hold, 1 for 1, to choose an option:\n\
 - Redirect an attack from the thing you defend to yourself\n\
 - Halve the attack’s effect or damage\n\
 - Open up the attacker to an ally giving that ally +1 forward against the attacker\n\
 - Deal damage to the attacker equal to your level',
        success: 'On a 10+, hold 3. As long as you stand in defense,\
 when you or the thing you defend is attacked you may spend hold, 1 for 1, to choose an option:\n\
 - Redirect an attack from the thing you defend to yourself\n\
 - Halve the attack’s effect or damage\n\
 - Open up the attacker to an ally giving that ally +1 forward against the attacker\n\
 - Deal damage to the attacker equal to your level',
        mixed: 'On a 7-9, hold 1. As long as you stand in defense,\
 when you or the thing you defend is attacked you may spend hold, 1 for 1, to choose an option:\n\
 - Redirect an attack from the thing you defend to yourself\n\
 - Halve the attack’s effect or damage\n\
 - Open up the attacker to an ally giving that ally +1 forward against the attacker\n\
 - Deal damage to the attacker equal to your level',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'con',
        method: functions.moveRoll
    },
    spoutLore: {
        key: ['spout', 'spoutlore', 'lore'],
        text: 'SPOUT LORE: !spout\n\
When you consult your accumulated knowledge about something, roll +INT.',
        greatSuccess: 'On a 10+, the GM will tell you something interesting\
 and useful about the subject relevant to your situation.',
        success: 'On a 10+, the GM will tell you something interesting\
 and useful about the subject relevant to your situation.',
        mixed: 'On a 7–9, the GM will only tell you something interesting —\
 it’s on you to make it useful.',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'int',
        method: functions.moveRoll
    },
    discernRealities: {
        key: ['discern', 'discernrealities', 'realities'],
        text: 'DISCERN REALITIES: !discern\n\
 When you closely study a situation or person, roll +WIS. You may ask:\n\
 - What happened here recently?\n\
 - What is about to happen?\n\
 - What should I be on the lookout for?\n\
 - What here is useful or valuable to me?\n\
 - Who’s really in control here?\n\
 - What here is not what it appears to be?',
        greatSuccess: 'On a 10+, ask the GM 3 questions from the list below.\
 Take +1 forward when acting on the answers.\n\
 - What happened here recently?\n\
 - What is about to happen?\n\
 - What should I be on the lookout for?\n\
 - What here is useful or valuable to me?\n\
 - Who’s really in control here?\n\
 - What here is not what it appears to be?',
        success: 'On a 10+, ask the GM 3 questions from the list below.\
 Take +1 forward when acting on the answers.\n\
 - What happened here recently?\n\
 - What is about to happen?\n\
 - What should I be on the lookout for?\n\
 - What here is useful or valuable to me?\n\
 - Who’s really in control here?\n\
 - What here is not what it appears to be?',
        mixed: 'On a 7-9, ask the GM 1 question from the list below.\
 Take +1 forward when acting on the answers.\n\
 - What happened here recently?\n\
 - What is about to happen?\n\
 - What should I be on the lookout for?\n\
 - What here is useful or valuable to me?\n\
 - Who’s really in control here?\n\
 - What here is not what it appears to be?',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'wis',
        method: functions.moveRoll
    },
    parley: {
        key: ['parley'],
        text: 'PARLEY: !parley\n\
When you have leverage on a GM Character and manipulate them, roll +CHA.',
        greatSuccess: 'On a 10+, they do what you ask if you first promise what they ask of you.',
        success: 'On a 10+, they do what you ask if you first promise what they ask of you.',
        mixed: 'On a 7–9, they will do what you ask, but need some concrete assurance\
 of your promise, right now.',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'cha',
        method: functions.moveRoll
    },
    aidOrInterfere: {
        key: ['aid', 'interfere', 'aidorinterfere'],
        text: 'AID OR INTERFERE !aid +/-BOND\n\
When you help or hinder someone you have a bond with, roll + the number of bonds\
 you have with that character',
        greatSuccess: 'On a 10+ the character you chose takes +1 or -2, your choice.',
        success: 'On a 10+ the character you chose takes +1 or -2, your choice.',
        mixed: 'On a 7–9, the character you chose takes +1 or -2, your choice.\
 You also expose yourself to danger, retribution, or cost.',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'num',
        method: functions.moveRoll
    },
    lastBreath: {
        key: ['last', 'breath', 'lastbreath'],
        text: 'LAST BREATH: !breath\n\
When you’re dying you catch a glimpse of what lies beyond the Black Gates of Death’s Kingdom\
 (the GM will describe it). Then roll (just roll, + NOTHING — yeah, Death doesn’t care\
 how tough or cool you are)',
        greatSuccess: 'On a 10+, you’ve cheated Death — you’re in a bad spot but you’re still alive.',
        success: 'On a 10+, you’ve cheated Death — you’re in a bad spot but you’re still alive.',
        mixed: 'On a 7–9, Death himself will offer you a bargain. Take it and stabilize\
 or refuse and pass beyond the Black Gates into whatever fate awaits you.',
        fail: 'On a 6-, your fate is sealed...',
        stat: 'num',
        method: functions.moveRoll
    },
    takeWatch: {
        key: ['take', 'watch', 'takewatch'],
        text: 'TAKE WATCH: !watch\n\
When you’re on watch and something approaches the camp roll +WIS.',
        greatSuccess: 'On a 10+, you’re able to wake the camp and prepare a response,\
 everyone in the camp takes +1 forward.',
        success: 'On a 10+, you’re able to wake the camp and prepare a response,\
 everyone in the camp takes +1 forward.',
        mixed: 'On a 7–9, you react just a moment too late; your companions in camp\
 are awake but haven’t had time to prepare. They have weapons and armor but little else.',
        fail: 'On a 6-, whatever lurks outside the campfire’s light has the drop on you...',
        stat: 'wis',
        method: functions.moveRoll
    },
    undertakeAPerilousJourney: {
        key: ['undertake', 'journey', 'perilous', 'perilousjourney', 'undertakeaperilousjourney'],
        text: 'UNDERTAKE A PERILOUS JOURNEY: !trailblazer, !scout, !quartermaster\n\
When you travel through hostile territory, choose one member of the party to be Trailblazer,\
 one to be Scout, and one to be Quartermaster. Each character with a job to do rolls\
 their job title +WIS.',
        method: function(){return this.text}
    },
    trailblazer: {
        key: ['trailblazer'],
        text: 'TRAILBLAZER: !trailblazer',
        greatSuccess: 'On a 10+, the trailblazer reduces the amount of time it takes\
 to reach your destination (the GM will say by how much).',
        success: 'On a 10+, the trailblazer reduces the amount of time it takes\
 to reach your destination (the GM will say by how much).',
        mixed: 'On a 7–9, the journey takes about as long as expected.',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'wis',
        method: functions.moveRoll
    },
    scout: {
        key: ['scout'],
        text: 'SCOUT: !scout',
        greatSuccess: 'On a 10+, the scout will spot any trouble quick enough to let you\
 get the drop on it.',
        success: 'On a 10+, the scout will spot any trouble quick enough to let you\
 get the drop on it.',
        mixed: 'On a 7–9, no one gets the drop on you but you don’t get the drop on them either.',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'wis',
        method: functions.moveRoll
    },
    quartermaster: {
        key: ['quartermaster'],
        text: 'QUARTERMASTER: !quartermaster',
        greatSuccess: 'On a 10+, the quartermaster reduces the number of rations required by one.',
        success: 'On a 10+, the quartermaster reduces the number of rations required by one.',
        mixed: 'On a 7–9, the normal number of rations are consumed.',
        fail: 'On a 6-, be prepared for the worst...',
        stat: 'wis',
        method: functions.moveRoll
    },
    carouse: {
        key: ['carouse'],
        text: 'CAROUSE: !carouse +/-COIN\n\
When you return triumphant and throw a big party, spend 100 coins and roll +1 for every\
 extra 100 coins spent. It\'s possible that:\n\
 - You befriend a useful NPC.\n\
 - You hear rumors of opportunity.\n\
 - You gain useful information\n\
 - You are not entangled, ensorcelled, or tricked.',
        greatSuccess: 'On a 10+, choose 3.\n\
 - You befriend a useful NPC.\n\
 - You hear rumors of opportunity.\n\
 - You gain useful information\n\
 - You are not entangled, ensorcelled, or tricked.',
        success: 'On a 10+, choose 3.\n\
 - You befriend a useful NPC.\n\
 - You hear rumors of opportunity.\n\
 - You gain useful information\n\
 - You are not entangled, ensorcelled, or tricked.',
        mixed: 'On a 7-9, choose 1.\n\
 - You befriend a useful NPC.\n\
 - You hear rumors of opportunity.\n\
 - You gain useful information\n\
 - You are not entangled, ensorcelled, or tricked.',
        fail: 'On a 6-, you still choose one, but things get really out of hand (the GM will say how).',
        stat: 'num',
        method: functions.moveRoll
    },
    caving: {
       key: ['cave', 'caving'],
       text: 'CAVING: !cave\n\
When you venture into the caves, roll +WIS',
       success: 'On a 10+, you find your way to the vein of precious metal deep within,\
 but getting out is another matter.',
       mixed: 'On a 7–9, you encounter a foul denizen or deadly hazard (as the GM what).',
       fail: 'On a 6-, be prepared for the worst...',
       stat: 'wis',
       method: functions.moveRoll
   },
   obscuredPitsFalls: {
       key: ['pitfall', 'pitfalls', 'pits', 'pit', 'fall', 'falls', 'obscured', 'obscurdpitsandfalls'],
       text: 'OBSCURED PITS/FALLS: !pitfall\n\
When you cross dangerous terrain, roll +WIS',
       success: 'On a 10+, you notice the drop, and not a moment too soon.',
       mixed: 'On a 7–9, you step into it, but you have a split-second to save yourself\
 from falling to a fate of the GM\'s choosing. What do you do?',
       fail: 'On a 6-, be prepared for the worst...',
       stat: 'wis',
       method: functions.moveRoll
   },
   foraging: {
       key: ['forage', 'foraging'],
       text: 'FORAGING: !forage\n\
When you spend a day seeking food in the wild, and your surroundings are not Barren, roll +WIS.',
       success: 'On a 10+, you gain 1d4 rations if you have the knowledge and gear\
 needed to trap or hunt.',
       mixed: 'On a 7–9, you gain 1d4 rations if you have the knowledge and gear\
 needed to trap or hunt, but first face a Discovery or Danger of the GM\'s choice.',
       fail: 'On a 6-, be prepared for the worst...',
       stat: 'wis',
       method: functions.moveRoll
   },
   makeCamp: {
       key: ['makecamp', 'camp', 'make'],
       text: 'MAKE CAMP: !camp\n\
When you settle in to rest, choose one member of the party to Manage Provisions.\
 Then, if you eat and drink, and have enough XP, you may level up. If you\'re\
 bedding down in dangerous lands, decide on a watch order. Then, the GM\
 chooses one person on watch during the night to roll !camp +nothing.',
       success: 'On a 10+, the night passes without incident.',
       mixed: 'On a 7–9, the GM chooses 1 from the list below:\n\
 - The person on watch notices a nearby Discovery.\n\
 - One party member of the GM’s choice suffers a restless night.\n\
 - One or more followers causes trouble.\n\
 - A Danger approaches — it’s not immediately hostile, but whoever’s\
 on watch had better Stay Sharp anyway.',
       fail: 'On a 6-, everyone marks XP, and a Danger manifests. You’d better Stay Sharp!',
       stat: 'num',
       method: functions.moveRoll
   },
   scoutAhead: {
       key: ['scouthead', 'ahead'],
       text: 'SCOUT AHEAD: !ahead\n\
When you take point and look for anything out of the ordinary, roll +WIS.',
       success: 'On a 10+, choose 2 from the list below:\n\
 - You get the drop on whatever lies ahead.\n\
 - You discern a beneficial aspect of the terrain — shortcut, shelter, or \
 tactical advantage (describe it).\n\
 - You make a Discovery (ask the GM).\n\
 - You notice sign of a nearby Danger — ask the GM what it is, and what it might signify.',
       mixed: 'On a 7–9, choose 1 from the list below:\n\
 - You get the drop on whatever lies ahead.\n\
 - You discern a beneficial aspect of the terrain — shortcut, shelter, or \
 tactical advantage (describe it).\n\
 - You make a Discovery (ask the GM).\n\
 - You notice sign of a nearby Danger — ask the GM what it is, and what it might signify.',
       fail: 'On a 6-, mark XP and the GM makes a move.',
       stat: 'wis',
       method: functions.moveRoll
   },
   navigate: {
       key: ['nav', 'navigate'],
       text: 'NAVIGATE: !nav\n\
When you plot the best course through dangerous or unfamiliar lands, roll +INT.',
       success: 'On a 10+, You avoid dangers and distractions and make good time,\
 reaching a point of the GM’s choosing before you need to Make Camp.',
       mixed: 'On a 7–9, choose 1 from the list below:\n\
 - You happen upon a Discovery missed by the scout.\n\
 - The going is slow, or you wander off course. The GM says which,\
 and where you end up on the map.\n\
 - You encounter a Danger; whether or not you’re surprised depends on whether\
 the scout has the drop on it.',
       fail: 'On a 6-, mark XP and the GM makes a move.',
       stat: 'int',
       method: functions.moveRoll
   },
   manageProvisions: {
       key: ['manage', 'provisions', 'manageprovisions'],
       text: 'MANAGE PROVISIONS: !manage\n\
When you prepare and distribute food for the party, roll +WIS.',
       success: 'On a 10+, choose 1 from the list below\n\
 - Careful management reduces the amount of rations consumed (ask the GM by how much)\n\
 - The party consumes the expected amount and the food you prepare is excellent —\
 describe it, and everyone who licks their lips takes +1 forward.',
       mixed: 'The party consumes the expected amount of rations\
 (1 per person if Making Camp, 1 per person per day if making a Journey).',
       fail: 'On a 6-, mark XP and the GM makes a move.',
       stat: 'int',
       method: functions.moveRoll
   },
   hunkerDown: {
       key: ['hunker', 'hunkerdown', 'down'],
       text: 'HUNKER DOWN: !hunker\n\
When you take shelter to wait out the elements, choose 1 party member to roll !hunker +nothing.',
       success: 'On a 10+, It doesn\'t take long for things to clear up.',
       mixed: 'On a 7–9, Things aren’t going to change any time soon.\
 You can Forge Ahead, or Make Camp here for the night and hope things have\
 changed by morning.',
       fail: 'On a 6-, mark XP, and the GM makes a move.',
       stat: 'num',
       method: functions.moveRoll
   },
   forgeAhead: {
       key: ['forge', 'forgeahead'],
       text: 'FORGE AHEAD: !forge\n\
When you push on despite powerful opposition from the elements, roll +CON.',
       success: 'On a 10+, you go as far as you are able before needing to pause for a rest.',
       mixed: 'On a 7–9, choose 1 from the list below:\n\
 - You go as far as you are able, but overtax yourself and become weak, shaky, or sick (choose one).\n\
 - You go as far as you are able, but the weather takes its deepest toll on your gear (ask the GM how).\n\
 - On second thought, maybe you’re better off staying put.',
       fail: 'On a 6-, mark XP and the GM makes a move.',
       stat: 'con',
       method: functions.moveRoll
   },
    endOfSession: {
       key: ['sessionend', 'endsession', 'endofsession', 'session'],
       text: 'When you reach the end of a session, choose one of your bonds\
 that you feel is resolved (completely explored, no longer relevant, or otherwise).\
 Ask the player of the character you have the bond with if they agree. If they do,\
 mark XP and write a new bond with whomever you wish.\n\n\
Once bonds have been updated look at your alignment. If you fulfilled that alignment\
 at least once this session, mark XP. Then answer these three questions as a group:\n\
 - Did we learn something new and important about the world?\n\
 - Did we overcome a notable monster or enemy?\n\
 - Did we loot a memorable treasure?\n\
**For each “yes” answer everyone marks XP.**',
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
**EXAMPLE: (you may copy/paste and edit the example text)**\n!newmove name+"Fly High" command+"fly" roll+"2d6 +dex" text+"When\
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