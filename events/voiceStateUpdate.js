const { MessageEmbed } = require('discord.js');
const Discord = require("discord.js"),
      noblox = require("noblox.js");
module.exports = {
  name: "voiceStateUpdate",
  run: async (oldState, newState, client) => {
    {
      let guild = oldState.guild.id ? oldState.guild.id : newState.guild.id;
      if(guild !== "527289061329731587" && guild !== "315982987298603018") return;
      let newUserChannel = newState.channelID
      let oldUserChannel = oldState.channelID
      //841131387422638150
      if(newUserChannel === "746118431476154540" || oldUserChannel === "746118431476154540" || newUserChannel === "841131387422638150" || oldUserChannel === "841131387422638150") return;
      const logChannel = client.guilds.cache.get("485928637162455060").channels.cache.get("827663456392052817");
      let msg = new MessageEmbed().setTimestamp();
      let newName = newUserChannel !== null ? client.channels.cache.get(newUserChannel).name : false;
      let oldName = oldUserChannel !== null ? client.channels.cache.get(oldUserChannel).name : false;
      
      if(oldUserChannel === null && newUserChannel !== null) {
        if(guild !== "315982987298603018"){ 
          msg.setColor("93c47d").setDescription("<@!"+newState.id+"> **has joined** `"+newName+"`");
        logChannel.send(msg);
        }
        /*if(newState.id === "686025058090745901" || newState.id === "412123592969420800" /*|| newState.id === "649405544662171649" || newState.id === "705250938428063804" 
           || newState.id === "834480002389114880" || newState.id === "658822911213436939" || newState.id === "334011027479855105" || newState.id === "818307786941136936"){
           console.log("new plyr of interest detected") //834480002389114880
          const trackChannel = client.guilds.cache.get("485928637162455060").channels.cache.get("839646413612515378");
            let trackMsg = new Discord.MessageEmbed().setTimestamp().setDescription(`<@!${newState.id}> **has joined** \`${newName}\``);
          trackChannel.send("<@&485930041272827914> <@&754211281065476107> <@&518560251822211085> <@!693400459628511293>")
          trackChannel.send(trackMsg);
        }*/
        
      } else if(newUserChannel === null){
        if(guild !== "315982987298603018"){
        msg.setColor("ff0000").setDescription("<@!"+newState.id+"> **has left** `"+oldName+"`");
        logChannel.send(msg);
        }
        // console.log("User left " + oldUserChannel);
        /*if(newState.id === "686025058090745901" || newState.id === "412123592969420800" /*|| newState.id === "649405544662171649" || newState.id === "705250938428063804" 
           || newState.id === "834480002389114880" || newState.id === "658822911213436939" || newState.id === "334011027479855105" || newState.id === "818307786941136936"){
          console.log("tracked")
          const trackChannel = client.guilds.cache.get("485928637162455060").channels.cache.get("839646413612515378");
         //   noblox.get
            let trackMsg = new Discord.MessageEmbed().setTimestamp().setDescription(`<@!${newState.id}> **has left** \`${oldName}\``).setThumbnail(``);
        trackChannel.send("<@&485930041272827914> <@&754211281065476107> <@&518560251822211085> <@!693400459628511293>")
        trackChannel.send(trackMsg);
        }*/
      }
        else{
        if(newUserChannel === oldUserChannel) return;
        if(guild !== "315982987298603018"){
        msg.setColor("fada5e").setDescription("<@!"+newState.id+"> **has switched channels** `"+oldName+"` **->** `"+newName+"`")
        logChannel.send(msg);
        }
        /*if(newState.id === "686025058090745901" || newState.id === "412123592969420800" /*|| newState.id === "649405544662171649" || newState.id === "705250938428063804" 
           || newState.id === "834480002389114880" || newState.id === "658822911213436939" || newState.id === "334011027479855105" || newState.id === "818307786941136936"){
         
          const trackChannel = client.guilds.cache.get("485928637162455060").channels.cache.get("839646413612515378");
         //   noblox.get
            let trackMsg = new Discord.MessageEmbed().setTimestamp().setDescription(`<@!${newState.id}> **has switched channels** \`${oldName}\` **->** \`${newName}\``).setThumbnail(``);
          trackChannel.send("<@&485930041272827914> <@&754211281065476107> <@&518560251822211085> <@!693400459628511293>")
          trackChannel.send(trackMsg);
        }*/
        // console.log("User switched from " + oldUserChannel + " to " + newUserChannel);
          
        }
      }
    
  }
};