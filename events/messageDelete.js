const { MessageEmbed } = require('discord.js');
const Discord = require("discord.js");
module.exports = {
  name: "messageDelete",
  run: async (message, client) => {
    if (message === "" || message.content === "") return;
    if(message.channel.id === "482548800771194880" || message.channel.id === "585963924436811794" || message.channel.id === "485524658590973986" 
    || message.channel.id === "485523376576921601" || message.channel.id === "586657643041390603" ) return;
    const logChannel = client.guilds.cache.get("485928637162455060").channels.cache.get("797918504875458580");
    const GeneralLogs = client.guilds.cache.get("707535612365897790").channels.cache.get("817573961990537271");
    const VIALogs = client.guilds.cache.get("707535612365897790").channels.cache.get("817576467151454230");
    let username = message.member ? message.member.displayName : message.author.tag;
    let content = removeExtra(message.content);
    let notificationMsg = new MessageEmbed()
      .setColor("ff0000")
      .setDescription("Message deleted in " + message.channel.guild.name)
      .addFields({
        name: "Username",
        value: "```" + username + "```"
      }, {
        name: "Discord ID",
        value: "```" + message.author.tag + " (" + message.author.id + ")```"
      }, {
        name: "Channel:",
        value: "```" + message.channel.name + "```"
      }, {
        name: "Message:",
        value: "```" + content + "```"
      })
      .setFooter("Made by ConsteIIium"); 
    if (message.guild.id === "527289061329731587" || message.guild.id === "315982987298603018") {
      await logChannel.send(notificationMsg);
      await GeneralLogs.send(notificationMsg);
      return;
    } else if(message.guild.id === "485928637162455060") {
      await VIALogs.send(notificationMsg);
      return;
    } else {
      await GeneralLogs.send(notificationMsg);
      return;
    }
  }
}

function removeExtra(content){
  if(content==="") return;
  if(content.indexOf('`') >-1){
    content = content.replace(/`/g,'')
    console.log(content);
    return content;  
  } else {
    return content;
  }
  return content;
}