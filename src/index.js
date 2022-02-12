import './config/config';
import { Client, Intents, MessageEmbed } from 'discord.js';
import { GetUsersFromFile, people } from './services/manageFile';

const usersFromFile = GetUsersFromFile();

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
});

const channelID = process.env.DISCORDJS_CHANNEL_ID;

client.on('ready', () => {
  console.log(`${client.user.username} is Connected!`);
});

function getConnectedUsers(message) {
  const users = [];
  message.guild.channels.cache.get(channelID).members.forEach((member) => {
    users.push(member.id);
  });

  return users;
}

function getMissingPeople(users) {
  const missing = [];
  Object.keys(people).forEach((key) => {
    if (!((Array.isArray(users) && users.length) && users.includes(key))) {
      missing.push(people[key]);
    }
  });

  return missing;
}

function getMissingMessage(missing) {
  let msg = '';

  if (!(Array.isArray(missing) && missing.length)) {
    msg = 'No one is missing in the daily!';
  }

  missing.forEach((user) => {
    msg += `${user.name} \n`;
  });

  return msg;
}

client.on('messageCreate', (message) => {
  if (message.content === '/whoismissing') {
    usersFromFile();

    // List of connected users to channel voice
    const users = getConnectedUsers(message);

    const missing = getMissingPeople(users);

    const msg = getMissingMessage(missing);

    const embed = new MessageEmbed()
      .setColor('#ae2c72')
      .setTitle('Who is missing in Daily?')
      .setDescription(msg);

    message.reply({ ephemeral: true, embeds: [embed] });
  }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);
