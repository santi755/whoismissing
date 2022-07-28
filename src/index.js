import './config/config';
import {Client, Intents, MessageEmbed, MessageButton, MessageActionRow, ButtonInteraction} from 'discord.js';
import GetUsersFromDrive from './services/manageFile.service';
import people from '../config/people.json' assert { type: "json" };

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

client.on('messageCreate', async (message, channel) => {
  if (message.content === '/whoismissing') {
    // List of connected users to channel voice
    const connectedUsers = getConnectedUsers(message);

    // List of missing people
    const missing = await getMissingPeople(connectedUsers);

    const msg = getMissingMessage(missing);

    let button = null;
    if (missing.length) {
      button = new MessageActionRow()
          .addComponents(
              new MessageButton()
                  .setCustomId('R')
                  .setLabel('R')
                  .setStyle('DANGER')
          );
    }

    const embed = new MessageEmbed()
      .setColor('#ae2c72')
      .setTitle('Who is missing in Daily?')
      .setDescription(msg);

    missing.length ? message.reply({ ephemeral: true, embeds: [embed], components: [button] }) : message.reply({ ephemeral: true, embeds: [embed] });
  } else if (message.content === '/whosbirthdayistoday') {
    const keys = Object.keys(people);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];

    const birthdayName = people[randomKey].name;

    const embed = new MessageEmbed()
      .setColor('#ae2c72')
      .setTitle('Quién cumple años hoy?')
      .setDescription(`${birthdayName} cumple años hoy. Felicidades ${birthdayName}!!! :birthday: :partying_face: :partying_face:`);

    message.reply({ ephemeral: true, embeds: [embed] });
  } else if(message.content === '/tellmeajoke') {
    // TODO: Download this in local folder
    const jokes1 = await fetch('https://raw.githubusercontent.com/elijahmanor/devpun/master/jokes.json').then(res => res.json());
    const jokes2 = await fetch('https://raw.githubusercontent.com/ABSphreak/readme-jokes/master/src/jokes.json').then(res => res.json());

    const jokes = []
    jokes1.forEach((joke) => {
      const _joke = {
        question: joke.question,
        answer: joke.answer,
      }
      jokes.push(_joke);
    });

    Object.values(jokes2).forEach((joke) => {
      const _joke = {
        question: joke.q,
        answer: joke.a,
      }
      jokes.push(_joke);
    });

    const keys = Object.keys(jokes);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    const joke = jokes[randomKey];

    const embed = new MessageEmbed()
    .setColor('#ae2c72')
    .setTitle(joke.question)
    .setDescription(joke.answer);

    message.reply({ ephemeral: true, embeds: [embed] });
  }
});

client.on('interactionCreate', async interaction => {
    if (interaction.isButton()) {
      if (interaction.customId === 'R') {
        sendWarningToMissing(interaction);
        await interaction.reply({content: `They have received a warning by ${interaction.user.username}`});
      }
    }
});

function getConnectedUsers(message) {
  const users = [];
  message.guild.channels.cache.get(channelID).members.forEach((member) => {
    users.push(member.id);
  });

  return users;
}

async function sendWarningToMissing(message) {
  const connectedUsers = getConnectedUsers(message);

  // List of missing people
  const missing = await getMissingPeople(connectedUsers);

  missing.forEach((member_data) => {
    let member_id = member_data.id;
    let member = message.guild.members.cache.get(member_id);
    console.log(member_id);
    console.log(member);

    //console.log(`Message sent to ${member.id}`);
    member.send('R');
  });
}

async function getMissingPeople(connectedUsers) {
  const usersOnVacation = await GetUsersFromDrive();

  const missing = [];

  // Loop entire users list
  Object.keys(people).forEach((peopleId) => {
    // User is not on vacation
    if (!usersOnVacation.includes(people[peopleId].initials)) {
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

  msg = !msg.length ? 'Nobody is missing, well done' : msg;

  return msg;
}

client.login(process.env.DISCORDJS_BOT_TOKEN);
