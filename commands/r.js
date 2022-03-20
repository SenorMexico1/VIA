const categories = require("../storage/blacklistCategories.json"),
      mongo = require("../mongo"),
      blacklistSchema = require("../schemas/blacklist-schema.js"),
      userSchema = require("../schemas/user-schema"),
      { GoogleSpreadsheet } = require("google-spreadsheet"),
      creds = require("../client_secret.json"),
      doc = new GoogleSpreadsheet("1EB38DtdF2WBAU4QNrZoGKFY5j3adqh8CTaZQy7f8oE4");
const { MessageEmbed } = require('discord.js');
const formatString = "```";

module.exports = {
  name: "r",
  description: "new remove function",
  async execute(bot, message, args, Discord, Roblox, categoryId) {
    
    //Autentication
    if ( message.channel.id !== "662217319489208330" ) { message.channel.send("Improper authorization, try again in <#662217319489208330>."); return; }
    
    //Invalidation checkers
    if ( !args[0] ){ message.channel.send("No person indicated. Please try again."); return; }
    
    //Notifiers
    let toAdmissionsLogs = (isBlacklist, name, id, data) => {
      if (isBlacklist) { bot.guilds.cache.get("411315317709602830").channels.cache.get("718350351614607390").send(`**${name}** (Roblox ID: ${id}) has been removed from their blacklist:\n${formatString}\n${data}\n${formatString}\nEnsure to notify <@!200759762625888256> before acceptance.`); return; }
      bot.guilds.cache.get("411315317709602830").channels.cache.get("718350351614607390").send(`**${name}** (Roblox ID: ${id}) has been removed from their tier ${data} suspension. Ensure they're added to the <#411316671861620737> for one month upon acceptance.`); return;
    }
    let toBlacklistLogs = (isBlacklist, name, data) => {
      if (isBlacklist) { bot.guilds.cache.get("485928637162455060").channels.cache.get("485951274249093132").send(`**${name}** | Blacklist removed. (Categor${data.length > 1 ? "ies" : "y"} ${data})`); return; }
      bot.guilds.cache.get("485928637162455060").channels.cache.get("485951274249093132").send(`**${name}** | Suspension expired. (Tier ${data}).`); return;
    }
    Roblox.getIdFromUsername(args[0]).then(async id =>{
      Roblox.getUsernameFromId(id).then(name => {
        const connectToMongoDB = async () => {
          await mongo().then(async mongoose => {
            try {
              let blacklistdata = await blacklistSchema.findOne({robloxid: id});
                if(blacklistdata.categoryNum) {
                  let blacklistdata = await blacklistSchema.findOneAndDelete({robloxid: id});
                  message.channel.send(`**${name}** (Roblox ID: ${id}) was successfully removed from the blacklist sheet.`);
                  toAdmissionsLogs(true,name,id,blacklistdata.categoryString);
                  toBlacklistLogs(true,name,blacklistdata.categoryNum);
                  accessSpreadsheet(id,true,blacklistdata.categoryNum,blacklistdata.reason);
                }
                else if(!blacklistdata.categoryNum) {
                  const suspensiondata = await userSchema.findOneAndDelete({robloxid: id});
                  message.channel.send(`**${name}** (Roblox ID: ${id}) was successfully removed from the suspension sheet.`);
                  toAdmissionsLogs(false,name,id,suspensiondata.tierNum);
                  toBlacklistLogs(false,name,suspensiondata.tierNum);
                  accessSpreadsheet(id,false,suspensiondata.tierNum,suspensiondata.reason);
                }
            } catch {
              message.channel.send("This person wasn't found on the blacklist or suspension sheet.");
            } finally {
              mongoose.connection.close();
            }
          });
      };
      //Connects to MongoDB & sends confirmation message to Discord
      connectToMongoDB();
      })
      
    }).catch(err => {
      message.channel.send(`${args[0]} is not a Roblox User.`);
    });
     async function accessSpreadsheet(id,isBlacklist,dataNumber,reason) {
        await doc.useServiceAccountAuth({
          client_email: creds.client_email,
          private_key: creds.private_key
        });
        
        await doc.loadInfo();
       let updateInfo = "";
       console.log({updateInfo});
       if(!isBlacklist) {
         const suspensionSheet = doc.sheetsById[1152075367];
         const rows = await suspensionSheet.getRows();
         const target = await rows.filter(async function(element){
          if(element.roblox_id == id){ 
          await element.delete();
          updateInfo = await `Suspension expired or removed (Tier ${dataNumber}). ${reason}`
          console.log("inside the if");
          console.log({updateInfo});
          const sheet = doc.sheetsById[750157401];
          const today = new Date();
          const larryRow = await sheet.addRow({
            symbol: '="-"',
            robloxid: id,
            storedusername: args[0],
            updatedate: new Date().toLocaleDateString('en-US', { timeZone: 'America/New_York',hour12: false }),
            updateinfo: updateInfo
          });
          }
        });
       }
       else {
         const blacklistSheet = doc.sheetsById[1398269168];
         const bRows = await blacklistSheet.getRows();
         const bTarget = await bRows.filter(async function(element){
          if(element.roblox_id == id){ 
            updateInfo = await `"Blacklist successfully appealed or changed. Previously charged under ${dataNumber.length > 1 ? "categories" : "category"} ${dataNumber}`
            await element.delete();
            const sheet = doc.sheetsById[750157401];
            const today = new Date();
            const larryRow = await sheet.addRow({
              symbol: '="-"',
              robloxid: id,
              storedusername: args[0],
              updatedate: new Date().toLocaleDateString('en-US', { timeZone: 'America/New_York',hour12: false }),
              updateinfo: updateInfo
         });
         }
       });
      }
    }
  }
}
    
