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
    client.user.setActivity("patreon.com/apocabot for info");
})

//stores characters locally
let userData = {};
let counter

//main program, divided into prefixes ! and ?
client.on('message', async message => {
    if (message.author.bot) return;
    if (message.webhookID) return;

//establish universal variables regarding message
    const userId = message.member.id;
    const channelId = message.channel.id;
    const userNickname = message.member.nickname;
    let gameList = [
        'apocalypse-world',
        'burned-over',
        'dungeon-world',
        'masks',
        'monsterhearts',
        'motw',
        'the-sprawl',
        'uncharted-worlds'
    ];
    let iconList = {
        "apocalypse-world": "https://i.imgur.com/axsiHTi.png",
        "burned-over": "https://i.imgur.com/t4RSNmg.png",
        "dungeon-world": "https://i.imgur.com/rffkAsW.png",
        "masks": "https://i.imgur.com/ThMlFyE.png",
        "monsterhearts":"https://i.imgur.com/Me2kjro.png",
        "motw": "https://i.imgur.com/a9Bi8zM.jpg",
        "the-sprawl": "https://i.imgur.com/qwbb6vQ.jpg",
        "uncharted-worlds": "https://i.imgur.com/MJB1dGn.png"
    }

    //load existing userData
        userData = await storage.get(channelId);
        userData = userData || {}
        if(userData[userId]){
            if(!userData[userId]['NAME']){
                messageName = ``
            } else {messageName = `• ${userData[userId]['NAME']} •`}           
        } else {messageName = ``}
        
        if(!userData['GAME']){
            if(message.content.startsWith("!setgame")){
                let gameSetMessage = ''
                gameList.forEach(i => {
                    if(message.content.toLowerCase().endsWith(i)){
                        userData['GAME'] = i
                        gameSetMessage = `You've selected __${i.toUpperCase()}__, now use the command __!menu__ to see the list of moves, learn how to set a custom prefix, and create character sheets.`
                        storage.set(channelId, userData);
                    }
                })
                if(!gameSetMessage){
                    let embed = new Discord.MessageEmbed()
                            .setColor(000000)
                            .setDescription("To begin using ApocaBot, enter the command __!setgame__ followed by a space and one of the supported games:\n • apocalypse-world\n • burned-over\n • dungeon-world\n • masks\n • monsterhearts\n • motw\n • the-sprawl\n • uncharted-worlds\nEXAMPLE: !setgame apocalypse-world")
                            .setThumbnail("https://i.imgur.com/a5p2OaU.png")
                    message.channel.send({embed})
                } else {
                    let embed = new Discord.MessageEmbed()
                            .setColor(000000)
                            .setDescription(gameSetMessage)
                            .setThumbnail("https://i.imgur.com/a5p2OaU.png")
                    message.channel.send({embed})
                }           
            }   else if(message.content.startsWith('!')) { 
                let embed = new Discord.MessageEmbed()
                            .setColor(000000)
                            .setDescription("Welcome to ApocaBot, a Discord Bot for Powered by the Apocalypse (PbtA) games.\nApocaBot currently supports the following games:\n • apocalypse-world\n • burned-over\n • dungeon-world\n • masks\n • monsterhearts\n • motw\n • the-sprawl\n • uncharted-worlds\nTo begin using ApocaBot, enter the command __!setgame__ followed by the hyphenated name of the PbtA game you\'ll be playing.\nEXAMPLE: !setgame apocalypse-world *or* !setgame motw")
                            .setThumbnail("https://i.imgur.com/a5p2OaU.png")
                message.channel.send({embed})
                return
                } else {return}
        } else {

                camelGame = userData['GAME'].replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
                let moves = movesFolder[camelGame]
                let functions = functionsFolder[camelGame]
                if(!userData['gameIcon']){
                    userData['gameIcon'] = "https://i.imgur.com/a5p2OaU.png"
                } 

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
                counter = await storage.get('COUNTER')
                if(!counter){counter = 0}
                counter++
                if((counter%10)===0){console.log(counter)}

                for await(let [key, value] of Object.entries(iconList)){
                    if(key === userData['GAME']){
                        userData['gameIcon'] = value
                    }
                }
                if(userMessage[0] === 'setgame'){
                    userData['gameIcon'] = "https://i.imgur.com/a5p2OaU.png"
                    messageName = ``
                }

                for (i in moves) {
                    if (moves[i]['key'].includes(userMessage[0])){
                        if(query){
                            finalMessage = moves[i].text
                            const embed = new Discord.MessageEmbed()
                            .setAuthor(messageName)
                            .setColor(000000)
                            .setDescription(finalMessage)
                            .setThumbnail(userData['gameIcon'])
                            message.channel.send({embed})
                            storage.set('COUNTER', counter)
                        } else {
                            finalMessage = moves[i].method(userMessage, userId, channelId, userNickname, moves, userData, i, gameList)
                            const embed = new Discord.MessageEmbed()
                            .setAuthor(messageName)
                            .setColor(000000)
                            .setDescription(finalMessage)
                            .setThumbnail(userData['gameIcon'])
                            message.channel.send({embed})
                        storage.set(channelId, userData);
                        storage.set('COUNTER', counter)
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
