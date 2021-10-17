import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { Client, Intents, InteractionCollector, MessageEmbed } from 'discord.js';
import Bot from './src/Bot.js';

const app = express();
app.use(express.static(path.join(process.cwd(), 'public')));

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


//* Client message
client.on('messageCreate', (message) => {
  bot.newMessage(message);

  //* Clear channel messages
  bot.clearChannel(message);
});

dotenv.config();

app.listen(process.env.PORT, () => {
  console.log(`Server listening on ${process.env.PORT}`)

  client.login(process.env.TOKEN);
});