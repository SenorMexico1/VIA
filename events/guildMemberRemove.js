const Discord = require("discord.js"),
      getUser = require("roblox-user-information"),
      noblox = require("noblox.js"),
      fetch = require("node-fetch");
const { MessageEmbed } = require('discord.js');
require("dotenv").config();
module.exports = {
  name: "guildMemberRemove",
  run: async (member, client) => {
    if (member.guild.id !== "315982987298603018" && member.guild.id !== "527289061329731587") return;
    const leaveMsg = new MessageEmbed()
      .setColor("ff0000")
      .setDescription("<@!" + member.user.id + "> aka " + member.displayName + " has left the " + member.guild.name)
      .setTimestamp();
    let logChannel = client.guilds.cache.get("315982987298603018").channels.cache.get("467504425213231128");
    await logChannel.send(leaveMsg);
    if (member.guild.id == "315982987298603018" && member.roles.cache.filter(role => role.name !== "@everyone").size > 0) {
      const { GoogleSpreadsheet } = require("google-spreadsheet");
      const doc = new GoogleSpreadsheet("1qqqBZ8qD1btguVx-VTQyx_Rgt5dtWyKW8-Y2tJSTb2c");
      const creds = require("../client_secret.json");
      async function accessSpreadsheet(id, name) {
        await doc.useServiceAccountAuth({
          client_email: creds.client_email,
          private_key: creds.private_key
        });
        await doc.loadInfo();
        var sheet = doc.sheetsById[0];
        var addrow = sheet.addRow({
          name: name,
          robloxid: id,
          date: new Date().toLocaleString('en-US', {
            timeZone: 'America/New_York',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: false
          }).split(",").join("")
        });
      }
      
        const VIA = client.guilds.cache.get("485928637162455060").channels.cache.get("662217319489208330");
        let url = `https://verify.eryn.io/api/user/${member.user.id}`;
        let settings = { method: "Get" };  
        fetch(url, settings)
          .then(res => res.json())
          .then(async json => {
            if(!json.error){
          let memberName = member.displayName.toString().split("] ")[1];
          if(!json.robloxId) { VIA.send(memberName + " does not exist."); return; } 
            var blacklistedGroups = "";
            const roblox_id = json.robloxId;
            //const msg = new Discord.MessageEmbed().setColor("#ffffff").setFooter("Made by Constellium"); //Sets color to Black and initiates the Discord Embedded message.
            noblox.getUsernameFromId(json.robloxId).then(async username => {
              const fetch = require("node-fetch");
              let url = `https://groups.roblox.com/v2/users/${json.robloxId}/groups/roles`;
              let settings = { method: "Get" };
              fetch(url, settings)
                .then(res => res.json())
                .then(async json => {
                  //console.log(json);
                if(json.error){
                }
                else{
                  let groups = await json.data;
                  for(const element of groups){
                    if(element.group.name == "The Insurgent Ascension Program" ||
                          element.group.name == "Imperial Ascension Program" ||
                          element.group.name == "Sol Imperialis" ||
                          element.group.name == "Imperium of Vaktovia" || 
                          element.group.name == "The Vaktoviаn Confederation" ||
                          element.group.name == "Vaktovian Auxiliаry Corps" ||
                          element.group.name == "Solar Militarum" ||
                          element.group.name == "Insurgеnt Ascension Program" ||
                          element.group.name == "Imperium of Arcon" ||
                          element.group.name == "Valania"){
                      blacklistedGroups += `${element.group.name}\n`;
                    }
                  }
                    //console.log(json.data)
                    if(blacklistedGroups=="") blacklistedGroups="None."
              accessSpreadsheet(json.robloxId, username);
              let msg = new MessageEmbed()
                .setTitle(username + " has been noted down.")
                .addField("Roblox ID", roblox_id)
                .setThumbnail("https://www.roblox.com/Thumbs/Avatar.ashx?x=500&y=500&userId=" + roblox_id)
                if(blacklistedGroups!=="None."){ msg.addField("Blacklisted Groups",`\`\`\`${blacklistedGroups}\`\`\``).setColor("#fc1303") }
                else msg.setColor("#93c47d");
              VIA.send(msg);
                    }
                  });
            
  
            
          })
        }
      })
      
    }
  }
}