const {MessageAttachment} = require('discord.js');

module.exports = {
  name: "capy",
  description: "pastes a video of a capybara",
  async execute(bot, message, args) {
    if (
      message.member.hasPermission("MANAGE_ROLES", "ADMINISTRATOR") ||
      //(message.guild.id === "527289061329731587") ||
      (message.member.id === "672229135644491796") ||
      (message.member.id === "203347959503388672") ||
      (message.member.id === "184548861224681472") ||
      (message.member.id === "693400459628511293") ||
      (message.member.id === "502913098894540830") ||
      (message.member.id === "160730859975081986")
    ) {
      if (message.guild.id === "527289061329731587") {
        const picture = new MessageAttachment('https://cdn.discordapp.com/attachments/945113926713114654/945195304330883082/Capybara.mp4');
        //amongus
        message.channel.send(picture);
      }
      else {
        message.channel.send(
        "Command issued by an invalid user or in an invalid server. Try again with proper authorization."
      );
      }
    } else {
      message.channel.send(
        "Command issued by an invalid user or in an invalid server. Try again with proper authorization."
      );
    }
  },
};