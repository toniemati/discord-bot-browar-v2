import { MessageEmbed } from 'discord.js';
import COMMANDS from '../commands.js';
import BEERS from '../beers.js';

class Bot {

  constructor(client) {
    this.client = client;
  }

  //* When bot is ready
  ready() {
    console.log(`${this.client.user.username} is ready...`);
  }

  //* Setting commands
  setupCommands() {
    const guilds = this.client.guilds.cache.map((guild) => guild.id);

    guilds.forEach((guildId) => {
      const guild = this.client.guilds.cache.get(guildId);
      const commands = guild ? guild.commands : this.client.application.commands;

      COMMANDS.forEach((cmd) => commands.create(cmd));
    });
  }

  //* New interaction related
  newInteraction(interaction) {
    const { commandName, channelId } = interaction;

    if (!interaction.isCommand()) return;
    if (!this.checkChannels(channelId)) return;

    switch (commandName) {
      case 'piwo': {
        this.piwoCommand(interaction);
        break;
      }
      default: {
        console.log('Wrong command!');
        break;
      }
    }
  }

  //* Piwo command
  piwoCommand(interaction) {
    const beer = BEERS[Math.floor(Math.random() * BEERS.length)];

    const piwoEmbed = new MessageEmbed()
        .setColor(beer.color)
        .setTitle(beer.name)
        .setDescription(beer.desc)
        .setImage(beer.imgUrl);
    
    interaction.reply({ embeds: [piwoEmbed] })

    this.deleteInteraction(interaction, 10);
  }
  
  //* If wrong channel don't reply
  checkChannels(channelId) {
    const channels = [
      '798496100856102922', //! Testing bot - bot-browar
      '798498303859752960' //! sławni pijacy - browar
    ];

    return channels.includes(channelId) ? true : false;
  }

  //* Delete interaction after given time
  deleteInteraction(interaction, time) {
    setTimeout(() => {
      interaction.channel.messages
        .fetch()
        .then((msgs) => msgs.forEach((msg) => {
          if (msg.interaction?.id === interaction.id) {
            interaction.channel.bulkDelete([msg]);
          }
        }));
    }, 1000 * time);
  }

}

export default Bot;