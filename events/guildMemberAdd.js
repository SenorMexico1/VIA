const { MessageEmbed } = require('discord.js');

const Discord = require("discord.js");
module.exports = {
  name: "guildMemberAdd",
  run: async (member, client) => {
    if (member.guild.id !== "315982987298603018" && member.guild.id !== "527289061329731587") return;
    let joinLeaveLog = client.guilds.cache.get("315982987298603018").channels.cache.get("467504425213231128");
    const joinMsg = new MessageEmbed()
      .setColor("00b35a")
      .setDescription("<@" + member.user.id + "> aka " + member.displayName + " has joined the " + member.guild.name)
      .setTimestamp();
    await joinLeaveLog.send(joinMsg);
    //console.log(member.guild.cache.get("485928637162455060").members.cache.get(member.user.id));
  }
}