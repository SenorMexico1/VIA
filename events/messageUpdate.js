const { MessageEmbed } = require('discord.js');
const Discord = require("discord.js");
module.exports = {
  name: "messageUpdate",
  run: async (oldMessage, newMessage, client) => {
    if (oldMessage.content === newMessage.content) return;
    if(oldMessage.channel.id === "482548800771194880" || oldMessage.channel.id === "585963924436811794" || oldMessage.channel.id === "485524658590973986" 
    || oldMessage.channel.id === "485523376576921601" || oldMessage.channel.id === "586657643041390603" ) return;
    const logChannel = client.guilds.cache.get("485928637162455060").channels.cache.get("797918504875458580");
    const GeneralLogs = client.guilds.cache.get("707535612365897790").channels.cache.get("817573961990537271");
    const VIALogs = client.guilds.cache.get("707535612365897790").channels.cache.get("817576467151454230");
    let username = oldMessage.member ? oldMessage.member.displayName : oldMessage.author.tag;
    let notificationMsg = new MessageEmbed()
      .setColor("93c47d")
      .setDescription("Message updated in " + oldMessage.channel.guild.name)
      .addFields({
        name: "Username",
        value: "```" + username + "```"
      }, {
        name: "Discord ID",
        value: "```" + oldMessage.author.tag + " (" + oldMessage.author.id + ")```"
      }, {
        name: "Channel:",
        value: "```" + oldMessage.channel.name + "```"
      }, {
        name: "Old Message:",
        value: "```" + oldMessage.content + "```"
      }, {
        name: "New Message:",
        value: "```" + newMessage.content + "```"
      })
      .setFooter("Made by ConsteIIium");
    if (oldMessage.guild.id === "527289061329731587" || oldMessage.guild.id === "315982987298603018") {
      await logChannel.send(notificationMsg);
      await GeneralLogs.send(notificationMsg);
      return;
    } else if(oldMessage.guild.id === "485928637162455060") {
      await VIALogs.send(notificationMsg);
      return;
    } else {
      await GeneralLogs.send(notificationMsg);
      return;
    }
  }
};