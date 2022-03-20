const {MessageAttachment} = require('discord.js');

module.exports = {
  name: "prayer",
  description: "pastes a picture of prayer",
  async execute(bot, message, args) {
    /*if (
      message.member.hasPermission("MANAGE_ROLES", "ADMINISTRATOR") ||
      //(message.guild.id === "527289061329731587") ||
      (message.member.id === "672229135644491796") ||
      (message.member.id === "203347959503388672") ||
      (message.member.id === "184548861224681472") ||
      (message.member.id === "693400459628511293") ||
      (message.member.id === "502913098894540830")
    ) {*/
      if (message.guild.id === "527289061329731587") {
        const picture = new MessageAttachment('https://cdn.glitch.global/54f650ba-2daf-41be-9784-6d03e12c9873/thumbnails%2Fnonsensebrother.png?1646148709983');
        // Join me in prayer
        message.channel.send(picture);
      }
      else {
        message.channel.send(
        "Command issued by an invalid user or in an invalid server. Try again with proper authorization."
      );
      }
    /*} else {
      message.channel.send(
        "Command issued by an invalid user or in an invalid server. Try again with proper authorization."
      );
    }*/
  },
};