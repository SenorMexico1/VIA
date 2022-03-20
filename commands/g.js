const categories = require("../storage/blacklistCategories.json"),
      mongo = require("../mongo"),
      blacklistSchema = require("../schemas/blacklist-schema.js"),
      userSchema = require("../schemas/user-schema"),
      moment = require("moment"),
      timeBetweenDates = require("time-between-dates"),
      getUser = require("roblox-user-information"),
      { GoogleSpreadsheet } = require("google-spreadsheet"),
      creds = require("../client_secret.json"),
      doc = new GoogleSpreadsheet("1EB38DtdF2WBAU4QNrZoGKFY5j3adqh8CTaZQy7f8oE4"),
      {MessageEmbed} = require('discord.js');

module.exports = {
  name: "g",
  description: "new blacklist function",
  async execute(bot, message, args, Discord, Roblox, categoryId) {
    
    //Invalidation checkers
    if ( !args[0] ){ message.channel.send("No person indicated. Please try again."); return; }
    console.log(message.guild.id);
    console.log(message.channel.id)
    if ( message.guild.id == "527289061329731587" && !(message.channel.id == "632086649483952148")){ message.channel.send("Please use <#632086649483952148> for this command."); return; }

    //Initial arguments;
    var isBlacklist = false;
    var categoryHeader, blacklistedGroups = "";
    const msg = new MessageEmbed().setColor("#ffffff").setFooter("Made by Constellium"); //Sets color to Black and initiates the Discord Embedded message.
      
      
      
      Roblox.getIdFromUsername(args[0]).then(id =>{
        const fetch = require("node-fetch");
        let url = `https://groups.roblox.com/v2/users/${id}/groups/roles`;
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
            if(blacklistedGroups=="") blacklistedGroups="None."
              //console.log(json.data)

              }
            });
          });
    
    //Roblox API & Arguments => MongoDB Database
    Roblox.getIdFromUsername(args[0]).then(id =>{
      const connectToMongoDB = async () => {
        await mongo().then(async mongoose => {
          try {
            const blacklistdata = await blacklistSchema.findOne({robloxid: id});
            //console.log(blacklistdata)
              if(blacklistdata.categoryNum) {
              categoryHeader = blacklistdata.categoryNum.length > 1 ? "Categories" : "Category";
              isBlacklist = true;
              toDiscord(blacklistdata);
            }
            else if(!blacklistdata.categoryNum) {
              const suspensiondata = await userSchema.findOne({robloxid: id});
              if(suspensiondata.robloxid) {
                toDiscord(suspensiondata);
              }
            }
          } catch {
            const historyMessage = await accessSpreadsheet(id); 
            message.channel.send("This person wasn't found on the blacklist or suspension sheet.");
            msg.addField("Blacklisted Groups","```" + blacklistedGroups + "```");
            if (historyMessage.length > 0) msg.addField("History","```" + historyMessage + "```");
            else msg.addField("History","```None```");
            message.channel.send(msg);
          } finally {
            mongoose.connection.close();
          }
        });
      };
      //Connects to MongoDB & sends confirmation message to Discord
      connectToMongoDB();
    }).catch(err =>{
      message.channel.send(args[0] + " was not found on Roblox.");
    });
    //Sends embedded message to Discord
   async function toDiscord(data) {
          msg.setThumbnail(`https://www.roblox.com/Thumbs/Avatar.ashx?x=500&y=500&userId=${data.robloxid}`) //Sets thumbnail to Roblox's Avatar
          .setURL(`https://www.roblox.com/users/${data.robloxid}/profile`) //Sets URL on to the Title
          .setAuthor( //Sets Author as the person who used the command, 2nd argument is their avatar URL.
            "Command used by: " + message.member.displayName,
            message.author.avatarURL()
          );
      const historyMessage = await accessSpreadsheet(data.robloxid); 
     
      if(isBlacklist) {
        msg.setTitle(`Blacklist Database | ${data.username}`) //Sets Title
          .addFields( //Adds embed fields
            { name: "Roblox ID" , value: "```" + data.robloxid + "```" },
            { name: categoryHeader , value: "```" + data.categoryString + "```" },
            { name: "Blacklisted by" , value: "```" + data.punisher + "```" },
            { name: "Evidence" , value: data.link === "Not publicly available." ? "```" + data.link + "```" : data.link },
            { name: "Reason" , value: "```" + data.reason + "```" }
            )
          msg.addField("Blacklisted Groups","```" + blacklistedGroups + "```");
          msg.addField("History","```" + historyMessage + "```");
          message.channel.send(msg);
      }
      else {
          let tierNum = data.tierNum, link = data.link === "-" ? "Not publicly available." : data.link;
          if (typeof data.tierDuration === "string") tierNum = data.tierString;
        
          msg.setTitle(`Suspension Database | ${data.username}`) //Sets Title
          .addFields( //Adds embed fields
            { name: "Roblox ID" , value: "```" + data.robloxid + "```" },
            { name: "Tier Information" , value: "```Tier " + tierNum + " (" + data.tierString + ")```" },
            { name: "Date Suspended" , value: "```" + moment(data.startDate).format("MMMM Do, YYYY") + "```" },
            { name: "Date Expiration" , value: "```" + moment(data.endDate).format("MMMM Do, YYYY") + "```" },
            { name: "Suspended by" , value: "```" + data.punisher + "```" },
            { name: "Evidence" , value: link === "Not publicly available." ? "```" + link + "```" : link },
            { name: "Reason" , value: "```" + data.reason + "```" }
            )
          msg.addField("Blacklisted Groups","```" + blacklistedGroups + "```");
          msg.addField("History","```" + historyMessage + "```");
          message.channel.send(msg);
      }
    }
    
    async function accessSpreadsheet(id) {
      await doc.useServiceAccountAuth({
        client_email: creds.client_email,
        private_key: creds.private_key
      });
      await doc.loadInfo();
      const sheet = await doc.sheetsById[750157401];
      const rows = await sheet.getRows();
      const historyArray = rows.filter(e => e.robloxid == id && e.symbol === "-");
      let historyMessage = "";
      historyArray.forEach(e => {
        historyMessage += `• ${e.updatedate} - ${e.updateinfo}\n`
      });
      return historyMessage || "None.";
    }
  }
};

