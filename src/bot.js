const people = require('../config/people.json');
require('dotenv').config();
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

console.log('peopleJson is ', people)

client.on('ready', () => {
    console.log(`${client.user.username} is Connected!`)
})

client.on('messageCreate', async message => {
    if (message.content === '/who-is-missing') {
        
        message.reply('Loading who is missing...')

        let channel = client.channels.cache.get("237324836333027329")
        console.log(`Channel is ${channel}`)

        channel.members.forEach(member => {
            let userData = client.users.fetch(member).then(data => {
                console.log("userData.username => ", data.username)
            })
            
        }) 
    }
})

client.login(process.env.DISCORDJS_BOT_TOKEN);

