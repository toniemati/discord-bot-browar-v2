import dotenv from 'dotenv';
import { Client, Intents, InteractionCollector, MessageEmbed } from 'discord.js';
import cmds from './commands.js'
import Bot from './src/Bot.js';

const client = new Client({ 
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES
  ] 
});

const bot = new Bot(client);

//* Client ready
client.on('ready', () => {
  bot.ready();
  bot.setupCommands();
});


//* Client interaction
client.on('interactionCreate', async (interaction) => {
  bot.newInteraction(interaction);
});

dotenv.config();
client.login(process.env.TOKEN);