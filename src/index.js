import './config/config.js'
import { Client, Intents, MessageEmbed } from 'discord.js';
import { GetUsersFromFile } from './services/manageFile.js';

const usersFromFile = GetUsersFromFile()

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_VOICE_STATES,
    ],
});

let channelID = process.env.DISCORDJS_CHANNEL_ID

client.on('ready', () => {
    console.log(`${client.user.username} is Connected!`)
})

client.on('messageCreate', message => {
    if (message.content === '/whoismissing') {

        // List of connected users to channel voice
        let users = getConnectedUsers(message)

        const embed = new MessageEmbed()
        .setColor('#ae2c72')
        .setTitle('Who is missing in Daily?')
        .setDescription('- Some description here\n- Second line');

        message.reply({ ephemeral: true, embeds: [embed] });
    }
})

function getConnectedUsers(message) {
    let users = [];
    message.guild.channels.cache.get(channelID).members.forEach((member) => {
        // member.send('R!');
        users.push(member.id);
    });

    return users;
}

client.login(process.env.DISCORDJS_BOT_TOKEN);

