const { MessageEmbed } = require('discord.js');
require("dotenv").config();

module.exports = {
  name: "verify",
  description: "verifies people",
  async execute (bot, message, args, Discord, Roblox, categoryId)  {
     if (categoryId === "715876947460096021" || categoryId === "793187164656893952" || message.author.id === process.env.OWNER_ID) {
    const discordid = message.author.id;
    if(discordid ==="236611237570412544"){ message.channel.send(`Back to the zoo you go, Lethal. 🦍 <#946919702729465896>`); return; }
    let posted = false;
    let userRank = "Civilian";
    let color = "a84300";
    let VIA = bot.guilds.cache.get("485928637162455060").channels.cache.get("825565450418389002");
    try {
    const role6 = message.member.roles.cache.find(role => role.name === 'Retired Vaktovian');
    if (role6) await message.member.roles.remove(role6);
    const role5 = message.member.roles.cache.find(role => role.name === 'Officer');
    if (role5) await message.member.roles.remove(role5);
    const role4 = message.member.roles.cache.find(role => role.name === 'Noncommisioned Officer');
    if (role4) await message.member.roles.remove(role4);
    const role3 = message.member.roles.cache.find(role => role.name === 'Trooper');
    if (role3) await message.member.roles.remove(role3);
    const role2 = message.guild.roles.cache.find(role => role.name === 'Civilian');
    if (role2) await message.member.roles.remove(role2);
    const role1 = message.member.roles.cache.find(role => role.name === 'VAC');
    if (role1) await message.member.roles.remove(role1); 
  } catch(err) {
    console.error(err);
  }
   const fetch = require("node-fetch");
    let url = "https://verify.eryn.io/api/user/" + discordid;
    let settings = { method: "Get" };
    /** DISCORD ID & ROLE NAMES
      692112945878007838 = Officer
      619770180339236865 = Non-Comissioned Officer
      619770187998035968 = Trooper
      619770189290012702 = Retired Vaktovian
      619770188488769548 = VAC
      619777740903546920 = Civilian
      **/
    fetch(url, settings)
      .then(res => res.json())
      .then(async json => {
        console.log(json);
      if(json.error){
        message.channel.send("Hello, please verify using the following link: https://verify.eryn.io/")
        VIA.send(message.author.tag +" ("+message.author.id+") attempted to verify but is not recognized.")
      }
      else{
          let usersId = json.robloxId;
          
          Roblox.getRankNameInGroup(131688, usersId).then(async rank => {
          console.log(rank)
          if(rank.indexOf("Legate")>-1){
            message.channel.send("I do not have the authorization to provide Legate roles, please message a High Command member or the Overseer of Internal Affairs.")
            userRank = await "Legate";
          }
          else if(rank.indexOf("Captain") > -1 || rank.indexOf("Major")>-1 || rank.indexOf("Lieutenant")>-1){
            let role = message.member.guild.roles.cache.find(role => role.id === "692112945878007838");
            await message.guild.members.cache.get(message.author.id).roles.add(role);
            //await message.channel.send("Successfully verified!")
            userRank = await "Officer";
            color = await "992d22";
          }
          else if(rank.indexOf("Retired")>-1){
            let role = message.member.guild.roles.cache.find(role => role.id === "619770189290012702");
            await message.guild.members.cache.get(message.author.id).roles.add(role);
            //await message.channel.send("Successfully verified!")
            userRank = await "Retired Vaktovians";
            color = await "041140";
          }
          else if(rank.indexOf("Sergeant") > -1){
            let role = message.member.guild.roles.cache.find(role => role.id === "619770180339236865");
            await message.guild.members.cache.get(message.author.id).roles.add(role);
           // await message.channel.send("Successfully verified!")
            userRank = await "Non-Commissioned Officer";
            color = await "eb1119";
          }
          else if(rank.indexOf("Corporal") > -1 || rank.indexOf("Private") > -1  ){
            let role = message.member.guild.roles.cache.find(role => role.id === "619770187998035968");
            await message.guild.members.cache.get(message.author.id).roles.add(role);
            //await message.channel.send("Successfully verified!");
            userRank = await "Trooper"
            color = await "7c0e0e";
          }
          else{
             Roblox.getRankNameInGroup(262619, json.robloxId).then(async nrank => {
              console.log(nrank)
               console.log(nrank.indexOf("Level")>-1);
              if(nrank.indexOf("Level")>-1){
                let role = message.member.guild.roles.cache.find(role => role.id === "619770188488769548");
                await message.guild.members.cache.get(message.author.id).roles.add(role);
                //await message.channel.send("Successfully verified!")
                userRank = await "VAC"
                color = await "546e7a";
              }
              else{
                let role = message.member.guild.roles.cache.find(role => role.id === "619777740903546920");
                await message.guild.members.cache.get(message.author.id).roles.add(role);
                //await message.channel.send("Successfully verified!")
              }
            });
          }
        await Roblox.getUsernameFromId(usersId).then(async name =>{
          await message.guild.members.cache.get(message.author.id).setNickname(name);
          await VIA.send(message.author.tag +" ("+message.author.id+") has been verified as " + json.robloxUsername + "/"+name+" ("+usersId+")\nRole received: " +userRank)
          const msg = new MessageEmbed()
            .setTitle(name)
            .setURL(`https://www.roblox.com/users/${usersId}/profile`)
            .setThumbnail(`https://www.roblox.com/Thumbs/Avatar.ashx?x=500&y=500&userId=${usersId}`)
            .setDescription(`Welcome to the Vaktovian Civilian Network, ${name}`)
            .setColor(color)
            .addFields({name: "Role Assigned", value: userRank, inline: true},
                       {name: "Roblox User", value: `${name} (${usersId})`, inline: false},
                       {name: "Discord User", value: `${message.author.tag} (${message.author.id})`, inline: true },
                       {name: "Created At", value: message.member.user.createdAt, inline:false});
          await message.channel.send(msg);
          return;
        })
        });
      }
      })
      .catch(err => {
        console.log(err);
      });
     }
      else {
      console.log("Heard a verify command, but not in the right category!");
     }
       
  }
};
