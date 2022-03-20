const Discord = require("discord.js");
      //client = new Discord.Client();
module.exports = {
  name: "guildBanAdd",
  run: async (guild, user) => {
    
      setTimeout(async function(){
        
        const fetchedLogs = await guild.fetchAuditLogs({
          limit: 1,
          type: 'MEMBER_BAN_ADD',
        });
        const banLog = fetchedLogs.entries.first();


        let VIADiscord = guild.client.guilds.cache.get("485928637162455060");
        let logChannel = VIADiscord.channels.cache.get("743233196963004436");


        if (!banLog) return logChannel.send(`${user.id} | ${user.tag} | Was banned but no log could be found.`);


        const { executor, target } = banLog;
        const exec = guild.members.cache.get(executor.id).displayName || executor.tag;


        if (target.id === user.id) {
          logChannel.send(`${user.id} | ${user.tag} | ${banLog.reason} | Banned by: ${exec}`);
        } else {
          logChannel.send(`${user.id} | ${user.tag} | Was banned but no log could be found.`);
        }
      },1025)
  }
}