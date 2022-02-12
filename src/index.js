import './config/config';
import { Client, Intents, MessageEmbed } from 'discord.js';
import GetUsersFromDrive from './services/manageFile.service';
import people from '../config/people.json';

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

function getMissingPeople(connectedUsers) {
  const usersOnVacation = GetUsersFromDrive();

  const missing = [];

  // Loop entire users list
  Object.keys(people).forEach((peopleId) => {
    // User is not on vacation
    if (!usersOnVacation.includes(people[peopleId])) {
      // User is not connected
      if (!connectedUsers.includes(peopleId)) {
        missing.push(people[peopleId]);
      }
    }
  });

  return missing;
}

function getMissingMessage(missing) {
  let msg = '';

  missing.forEach((user) => {
    msg += `${user.name} \n`;
  });

  return msg;
}

client.on('messageCreate', (message) => {
  if (message.content === '/whoismissing') {
    // List of connected users to channel voice
    const connectedUsers = getConnectedUsers(message);

    // List of missing people
    const missing = getMissingPeople(connectedUsers);

    const msg = getMissingMessage(missing);
    const embed = new MessageEmbed()
      .setColor('#ae2c72')
      .setTitle('Who is missing in Daily?')
      .setDescription(msg);

    message.reply({ ephemeral: true, embeds: [embed] });
  }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);
