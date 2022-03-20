const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "ready",
  once: true,
  run: async (client) => {
    client.user.setActivity(`over ${client.users.cache.size} users`, {type: "WATCHING"}).catch(console.error);
    console.log(`Ready! Logged in as ${client.user.tag}`);
  }
};
