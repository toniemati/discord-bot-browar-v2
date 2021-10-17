import dotenv from 'dotenv';
import { Client, Intents } from 'discord.js';

dotenv.config();

const client = new Client({ 
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES
  ] 
});

//* Client ready
client.on('ready', () => {
  console.log(`${client.user.username} is ready...`);

  const guildId = '797429914503610370';
  const guild = client.guilds.cache.get(guildId);

  let commands;
  commands = guild ? guild.commands : client.application?.commands;

  commands.create({
    name: 'piwo',
    description: 'Replies to you with random beer name'
  })
});

//* Client interaction
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'piwo') {
    interaction.reply({
      content: 'Żywiec',
    })
  }
});

client.login(process.env.TOKEN);