const fetch = require("node-fetch"),
      getUser = require("roblox-user-information");
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "sweep",
  description: "checks for a group of people whether they're in vak",
  async execute(bot, message, args, Discord, Roblox, categoryId) {
    message.channel.send("Scanning members...");
    const userData = bot.guilds.cache.get("527289061329731587").members.cache.array();
    const userList = userData.filter( member => member.roles.cache.find(role => role.name === "Civilian") === undefined && member.roles.cache.find(role => role.name === "Retired Vaktovian") === undefined && member.roles.cache.find(role => role.name === "Bot") === undefined && member.roles.cache.filter(role => role.name !== "@everyone").size > 0);
    message.channel.send("Sweeping members...");
    let nonVAK = 0;
    let count = 0;
    let interval = 3000;
    let loopCount = 0; 
    userList.forEach(async member => {
      loopCount++;
      setTimeout(function() {  
        count++;
        let url = `https://verify.eryn.io/api/user/${member.user.id}`;
        let settings = { method: "Get" };  
        fetch(url, settings)
          .then(res => res.json())
          .then(async json => {
            if(!json.error){
              await Roblox.getRankNameInGroup(131688, json.robloxId).then(async rank => {
                loopCount++; 
                if(rank==="Guest"){ 
                  
                    await Roblox.getRankNameInGroup(262619,json.robloxId).then(async nrank=>{
                    if(nrank=="Guest") { 
                      nonVAK++;
                      const role1 = member.roles.cache.find(role => role.name === 'Trooper') || member.roles.cache.find(role => role.name === 'VAC') || member.roles.cache.find(role => role.name === 'Noncommisioned Officer');
                      if (role1) await member.roles.remove(role1); 
                      if(member.roles.cache.has("632071023814246450")) await member.roles.remove("632071023814246450");
                      if(member.roles.cache.has("694950201252773938")) await member.roles.remove("694950201252773938");
                      if(member.roles.cache.has("829089412985782292")) await member.roles.remove("829089412985782292");
                      if(member.roles.cache.has("632071710975459328")) await member.roles.remove("632071710975459328"); 
                      if(member.roles.cache.has("722892943655960708")) await member.roles.remove("722892943655960708");
                      await member.roles.add("619777740903546920");
                      message.channel.send(`❌ | **${json.robloxUsername}** (Roblox ID: ${json.robloxId}) is **not** in Vaktovia. Rank: ${rank}. Non-count: ${nonVAK}. Count: ${count}. <@!${member.user.id}>`); }
                    else message.channel.send(`✅ | ${json.robloxUsername} (Roblox ID: ${json.robloxId}) is in the Vaktovian Army Corps. Rank: **${nrank}**. Count: ${count}.`);
                  }) 
                  
                } 
                else message.channel.send(`✅ | ${json.robloxUsername} (Roblox ID: ${json.robloxId}) is in Vaktovia. Rank: **${rank}**. Count: ${count}.`);
              }).catch(err => {
                message.channel.send(`❌ | ${json.robloxUsername} (Roblox ID: ${json.robloxId}) is not in Vaktovia. Non-count: ${nonVAK}. Count: ${count}. <@!${member.user.id}>`);
              }) 
              //await console.log({json});  
            } 
            else message.channel.send(`❌ | **${member.user.username}** -- (Discord ID: ${member.user.id}) (Discord Tag: ${member.user.tag}) is not verified`); 

          }).catch(err =>{
          console.log(err);  
          message.channel.send(`${member.user.username} is returning an error. API Overload.`)
        }) 
        console.log(interval * loopCount + "Interval: " + interval + " | Loop: " + loopCount);
      }, interval * loopCount); 
    }); 
    setTimeout(function(){
      message.channel.send(`Sweep concluded. Users with illegal roles: ${nonVAK} | Users scanned: ${count}.`)
      //bot.guilds.cache.get("485928637162455060").channels.cache.get("869396944848580668").send(`Sweep concluded. Nicknames changed: ${ncount + 106} | Users with illegal roles: ${rcount}.`)
    },interval*loopCount+5000)
  } 
};  
