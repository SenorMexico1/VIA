const { GoogleSpreadsheet } = require("google-spreadsheet"), 
      creds = require("../client_secret.json"), 
      doc = new GoogleSpreadsheet("1Lel96IAeT53Xc2B4v_nMixchJ1EA2OzWHyoKqv_PXEE");
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "update",
  description: "updates people's promotion date",
  async execute(bot, message, args, Discord, Roblox, categoryId) {
    
    //Invalidation checkers
    if ( message.guild.id == "527289061329731587" ) { message.channel.send("If you are trying to update your roles, use this channel <#583390022410174465>."); return; }
    if ( !args[0] ){ message.channel.send("No person indicated. Please try again.\nAlternatively, if you are trying to promote more than one person format it like this `!update name,name,name (date - optional)`."); return; }
    if ( isNaN(Date.parse(args[1])) && args[1] ){ message.channel.send("Invalid date. Please try again using MM/DD/YYYY.\nAlternatively, if you are trying to promote more than one person format it like this `!update name,name,name (date - optional)`"); return; }
    
    let toPromoLogs = (name, rank, date) => { bot.guilds.cache.get("485928637162455060").channels.cache.get("677699911046922250").send(`${name.toUpperCase()} // ${date} // ${rank.toUpperCase()}`); return; };
    
    let newPromotionDate = args[1] ? args[1] : new Date().toLocaleString('en-US', { timeZone: 'America/New_York',hour12: false }).split(",").join("");
    let ListOfNames = args[0].split(",").forEach(async e => {
      await Roblox.getIdFromUsername(e).then(async id => {
        await Roblox.getUsernameFromId(id).then(async name =>{
          await Roblox.getRankNameInGroup(131688, id).then(async rank => {
            if (rank === "Guest") { message.channel.send(`${e} is not a member of the Vaktovian Empire.`); return; }
            await accessSpreadsheet(id, name, rank);
          })
        })
      }).catch(err => message.channel.send(`${e} is not a valid Roblox user.`))  
    })
    
    async function accessSpreadsheet(id, name, rank) {
      await doc.useServiceAccountAuth({
        client_email: creds.client_email,
        private_key: creds.private_key
      });
      await doc.loadInfo();
      const sheet = doc.sheetsById[25149901];
      const rows = await sheet.getRows(); 
      const findId = await rows.find(row => row.robloxid == id);
      
      if(findId){
        const msg = new MessageEmbed()
        .addFields({ name: "Username", value: name }, { name: "Roblox ID", value: id}, { name: "Old Promotion Date", value: findId.lastpromotion }, { name: "New Promotion Date", value: newPromotionDate});
        message.channel.send(msg);
        findId.lastpromotion = newPromotionDate;
        await findId.save();
        console.log(findId);
      }
      else{
        const msg = new MessageEmbed()
        .addFields({ name: "Username", value: name },{ name: "Roblox ID", value: id},{ name: "New Promotion Date", value: newPromotionDate})
        message.channel.send(msg);
        const newMember = await sheet.addRow({name: name, robloxid: id, lastpromotion: newPromotionDate});
      }
      toPromoLogs(name, rank, newPromotionDate.split(" ")[0]);
      return;
    }
  }
};
