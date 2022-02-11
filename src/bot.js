import people from '../config/people.json';
import dotenv from 'dotenv';
import { Client, Intents, MessageEmbed } from 'discord.js';

dotenv.config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

console.log('peopleJson is ', people)

client.on('ready', () => {
    console.log(`${client.user.username} is Connected!`)
})

client.on('messageCreate', async message => {
    if (message.content === '/whoismissing') {
        
        const embed = new MessageEmbed()
        .setColor('#ae2c72')
        .setTitle('Who is missing in Daily?')
        .setDescription('Some description here');

        message.reply({ content: 'Pong!', ephemeral: true, embeds: [embed] });
/*
        message.reply('Loading who is missing...')
        
        let channel = client.channels.cache.get("237324836333027329")
        console.log(`Channel is ${channel}`)

        channel.members.forEach(member => {
            let userData = client.users.fetch(member).then(data => {
                console.log("userData.username => ", data.username)
            })
            
        }) 
        */
    }
})

client.login(process.env.DISCORDJS_BOT_TOKEN);

