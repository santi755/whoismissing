import './config/config.js'
import { Client, Intents, MessageEmbed } from 'discord.js';
import { GetUsersFromFile, people } from './services/manageFile.js'

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
        let users = getConnectedUsers(message);

        let missing = getMissingPeople(users);

        let msg = getMissingMessage(missing)

        const embed = new MessageEmbed()
        .setColor('#ae2c72')
        .setTitle('Who is missing in Daily?')
        .setDescription(msg);

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

function getMissingPeople(users) {
    let missing = [];
    Object.keys(people).forEach(key => {
        if (!((Array.isArray(users) && users.length) && users.includes(key))) {
            missing.push(people[key])
        }
    });

    return missing;
}

function getMissingMessage(missing) {
    let msg = '';

    if (!(Array.isArray(missing) && missing.length)) {
        msg = 'No one is missing in the daily!';
    }

    missing.forEach(user => {
       msg += user.name + '\n';
    });

    return msg;
}

client.login(process.env.DISCORDJS_BOT_TOKEN);

