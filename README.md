# ApocaBot - A Discord Bot for PbtA Games

To add ApocaBot to your Discord server, click [Add ApocaBot](https://discord.com/api/oauth2/authorize?client_id=723981824455344180&permissions=3072&scope=bot). Once the bot is logged in, type `!` in the chat to get started.

ApocaBot is a bot designed to streamline PbtA gameplay on a Discord server by allowing players to create functional in-chat character sheets and deploy their stats for rolls or basic moves. Though it's not intended to fully replace traditional character sheets, ApocaBot lets you focus more on your game and less on referencing the text. ApocaBot currently supports *Apocalypse World 2e, Burned Over (AW Hackbook), Dungeon World, Masks, Monsterhearts, MotW, The Sprawl, The Veil, Uncharted Worlds, and Urban Shadows.* 

### Support

Althought this project is a labor of love, it's still labor. If you'd like to support ApocaBot, access update info, and have a say in which PbtA games get included next, consider [BECOMING A PATRON](https://www.patreon.com/apocabot). Thanks for your support!

## Commands

For full tutorials, instructions, and special content, visit the [ApocaBot Site](https://www.patreon.com/apocabot).

Once the bot is logged in, any command beginning with `!` will activate ApocaBot. First you'll need to select the PbtA game you want to play, with the command `!setgame` followed by the hyphenated game name.  
EXAMPLE: `!setgame dungeon-world` *or* `!setgame motw`  

Once you've selected a game, you'll be able to access the game `!menu`, or `!setprefix` to change the bot prefix (ApocaBot defaults to commands with the prefix `!`). From the menu you can find all the other game commands, and any command information can be looked up with the format `!command?` (prefix/command/?).  

Before you can *use* any of the commands (like `!roll`), you must create a character sheet. If you try to use a command before setting up a character sheet the bot will prompt you to enter `!newcharacter` and learn how to `!set` your stats. After you've done so, you will have access to all the bot commands, dice roller with stat integration, and game info.  

### Generic Commands

 * `!newcharacter` - Use this command to create a new blank character or to zero out your character stats. Each player must create their own character. Sometimes creating a new blank character sheet will be necessary for updates in the bot to be visible.
 * `!character` - Enter this command at any time to check on your character stats.
 * `!set stat+value` - To set your character stats, enter the command `!set` followed by all the STAT MODIFIERS you want to set. Use the stat name +/- stat value. Unentered stats will default to zero or their existing value. If you enter `name+nickname` it will enter your Discord Channel nickname.  
 Example: `!set name+bambino str+1 wis+2 cha-1 ... etc`
 * `!shift stat+value` - Use this command to change your character stats by a certain amount. This is useful if you want to subtract from your hp, or when leveling up. The stat will shift up or down by the value amount.  
 Example: `!shift hp-5` will remove 5 from your character's current hp.
 * `!roll` - If you don't specify a die type, the `!roll` command automatically rolls 2d6. You can add any additional number or stat to that roll to handle moves without their own command.  
 EXAMPLE: `!roll +1` *will roll 2d6 and add 1,* `!roll +stat` *will roll 2d6 and add the named stat value from your character sheet.*  
 * `!roll xdy +z` - Use the format !roll xdy +z where x = number of die, y = faces on die, and z = a positive or negative modifier, a stat, another +/-xdy roll, or any combination.  
 EXAMPLE: `!roll 1d8 +1` OR `!roll 3d6 +wis` OR `!roll 1d6 +1d4` OR `!roll 1d10 -1 +str +1d4`
 * `!setprefix` - Use this command followed by `newprefix` and a non-alphanumeric character to set a new bot prefix.  
 EXAMPLE: `!setprefix newprefix$` (will change the bot prefix from ! to $).  
 * `!setgame` - Use this command follloed by the name of the game you'll be playing to change ApocaBot from the current game to a different PbtA game.  
 WARNING: Setting a new game will erase all current character sheets and data. If you'd like to play a different game with ApocaBot and keep all your current data, simply create a new channel or server for your new game and leave the current one as is.  
EXAMPLE: `!setgame apocalypse-world` *or* `!setgame motw`  
 * `!session` - Enter this command when you've reached the end of a session. It will bring up information about xp, advancement, or any other end-of-session rules.  

### Game-specific Commands

 * Each PbtA game supported by ApocaBot has commands for all basic and advanced moves. Class-specific moves are not supported (because there are just too many), but can be handled with a simple `!roll +stat` command.  
 * Pledge your support for [ApocaBot on Patreon](https://www.patreon.com/apocabot) (even just $1 a month) for access to the complete moves list for each PbtA game, ability to request edits or flag errors, and to give your input for future PbtA games that will be added to ApocaBot. Thanks for your support!

## Acknowledgments

Special thanks to the friends and developers who inspired and helped this project:
* https://github.com/evanfeenstra
* https://github.com/brandonjackson
* https://github.com/dyerw
* https://github.com/duanbailey
* Tam
* Dobsonfly
* Janilyn
* Rezart
* AdriaticTitan45
* Luinger
* All our supporters on Patreon
* And many more...