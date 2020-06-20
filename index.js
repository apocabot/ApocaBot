require('dotenv').config();
let storage
require('./mungu.js').then(s => storage = s)
const Discord = require('discord.js');
let movesFolder = require('./moves');
let functionsFolder = require('./functions');
const client = new Discord.Client();
client.login(process.env.BOT_TOKEN)

//bot responds to being logged in
client.on('ready', () => {
    console.log('Logged in as ApocaBot!');
})

//stores characters locally
let userData = {};

//main program, divided into prefixes ! and ?
client.on('message', async message => {
    if (message.author.bot) return;
    if (message.webhookID) return;

//establish universal variables regarding message
    const userId = message.member.id;
    const channelId = message.channel.id;
    const userNickname = message.member.nickname;
    let gameList = ['apocalypse-world', 'burned-over', 'dungeon-world', 'masks', 'motw', 'uncharted-worlds'];

    //load existing userData
        userData = await storage.get(channelId);
        userData = userData || {}
        
        if(!userData['GAME']){
            if(message.content.startsWith("!setgame")){
                let gameSetMessage = ''
            gameList.forEach(i => {
                if(message.content.toLowerCase().endsWith(i)){
                    userData['GAME'] = i
                    gameSetMessage = `You've selected __${i}__, you can now use the command !menu to see the list of moves, learn how to set a custom prefix, and create character sheets.`
                    storage.set(channelId, userData);
                }
            })
            if(!gameSetMessage){message.channel.send("To begin using ApocaBot, enter the command !setgame followed by a space and one of the supported games:\n\
apocalypse-world\n\
burned-over\n\
dungeon-world\n\
masks\n\
motw\n\
uncharted-worlds\n\
EXAMPLE: !setgame apocalypse-world")} else {message.channel.send(gameSetMessage)}
           
            } else if(message.content.startsWith('!')) { message.channel.send("Welcome to ApocaBot, a Discord Bot for Powered by the Apocalypse (PbtA) games.\n\
ApocaBot currently supports the following games:\n\
 • Apocalypse World\n\
 • Burned Over\n\
 • Dungeon World,\n\
 • Masks\n\
 • MotW\n\
 • Uncharted Worlds\n\
To begin using ApocaBot, enter the command __!setgame__ followed by the hyphenated name of the PbtA game you\'ll be playing.\n\
EXAMPLE: !setgame apocalypse-world *or* !setgame motw");
            return
            } else {return}
        } else {

                camelGame = userData['GAME'].replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
                let moves = movesFolder[camelGame]
                let functions = functionsFolder[camelGame]

                const unPrefixed = functions.removePrefix(message.content, userData);
                const userMessage = unPrefixed[0]
                let query = unPrefixed[1]

                if(!userData[userId]){
                    if(userMessage[0] === 'newcharacter' ||
                       userMessage[0] === 'menu' ||
                       userMessage[0] === 'setprefix' ||
                       userMessage[0] === 'setgame' ||
                       query === true){
                    } else {userMessage[0] = 'nocharacter'}
                }
            if(!userData['PREFIX']){
                    userData['PREFIX'] = '!';
                }

            if(message.content.startsWith(userData['PREFIX'])){
                //counts the number of total user messages
                functions.messageCounter(userData)

                for (i in moves) {
                    if (moves[i]['key'].includes(userMessage[0])){
                        if(query){
                            message.channel.send(moves[i].text)
                        } else {
                            message.channel.send({embed: {
                                color: 000000,
                                description: moves[i].method(userMessage, userId, channelId, userNickname, moves, userData, i, gameList)
                            }
                        })
                        storage.set(channelId, userData);
                        }
			        };
		        };
            }
        }
})

client.on("guildCreate", guild => {
    console.log("Joined a new guild: " + guild.name);
    console.log(client.guilds.cache.size)
})

client.on("guildDelete", guild => {
    console.log("Left a guild: " + guild.name);
    console.log(client.guilds.cache.size)
})
