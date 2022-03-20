const tiers = require("../storage/suspensionTiers.json"),
      mongo = require("../mongo"),
      userSchema = require("../schemas/user-schema"),
      moment = require("moment"),
      timeBetweenDates = require("time-between-dates"),
      { GoogleSpreadsheet } = require("google-spreadsheet"),
      creds = require("../client_secret.json"),
      doc = new GoogleSpreadsheet("1EB38DtdF2WBAU4QNrZoGKFY5j3adqh8CTaZQy7f8oE4");
const { MessageEmbed } = require('discord.js');
module.exports = {
  name: "s",
  description: "new suspension function",
  async execute(bot, message, args, Discord, Roblox, categoryId) {
    
    //Autentication
    if ( message.channel.id !== "662217319489208330" ) { message.channel.send("Improper authorization, try again in <#662217319489208330>."); return; }
    
    //Invalidation checkers
    if ( !args[0] ){ message.channel.send("No person indicated. Please try again."); return; }
    if ( !args[1] ){ message.channel.send("No punisher stated. Please try again."); return; }
    if ( !args[2] || args[2] > 12 || args[2] < 0 ){ message.channel.send("Invalid tier entered, please try again."); return; } 

    //Notifiers
    let toBlacklistLogs = (name, data) => {
      bot.guilds.cache.get("485928637162455060").channels.cache.get("485951274249093132").send(`**${name}** | Suspension added, Tier ${data}.`); return;
    }
    
    //Initial arguments;
    const tier = args[2];
    const punisher = getPunisher(args[1]);
    const link = !args[3] || args[3] === "-" ? "Not publicly available." : args[3];
    const reason = !args[4] || args[4] === "-" ? "Not publicly stated." : args.slice(4).join(" ");
    const { tierDuration, tierNum, tierString } = { tierDuration: tiers[tier].time, tierNum: tiers[tier].number, tierString: tiers[tier].string };
    const mongoTierDuration = tierDuration === "Indefinite" ? 9999999 : tierDuration;
    const sumOfDates = Date.now() + (tierDuration * 24 * 60 * 60 * 1000);
    const endDate = moment().add(tierDuration, "days").calendar();
    toBlacklistLogs(args[0],tier)
    
    //Roblox API & Arguments => MongoDB Database
    Roblox.getIdFromUsername(args[0]).then(id =>{
      const connectToMongoDB = async () => {
        await mongo().then(async mongoose => {
          try {
            const user = {
              username: args[0],
              robloxid: id,
              tierDuration: mongoTierDuration,
              tierNum: tierNum,
              tierString: tierString,
              startDate: new Date().toLocaleDateString('en-US', { timeZone: 'America/New_York',hour12: false }),
              endDate: endDate,
              punisher: punisher,
              link: link,
              reason: reason
            };
            await new userSchema(user).save();
          } finally {
            mongoose.connection.close();
          }
        });
      };
      //Connects to MongoDB & sends confirmation message to Discord
      connectToMongoDB();
      toDiscord(id);
      accessSpreadsheet(id);
    }).catch(err =>{
      console.log(err);
      //message.channel.send(args[0] + " was not found on Roblox.");
    });
    
    //To remove cluttered code, returns punisher's name
    function getPunisher(s) {
      switch(s.toLowerCase()){
        case 'bdm': return "Blacklist Department Management";
        case 'bd': return "Blacklist Department";
        case 'jd': return "Justice Department";
        case 'vacs': return "VAC Staff";
        case 'vacm': return "VAC Management";
        case 'lc': return "Legate Council";
        case 'hc': return "High Command";
        default: return s;
      }
    }
    
    //To remove cluttered code, returns string with end date and approximate time difference.
    function approxDate(){
      if (typeof tierDuration === "string") return tierString;
      let timeDifference = timeBetweenDates(sumOfDates, Date.now(), "days", 1);
      return approxDate + " (" + timeDifference + ") days";
    }
    
    //Sends embedded message to Discord
    function toDiscord(id) {
      const msg = new MessageEmbed()
          .setColor("#ffffff") //Sets color to Black
          .setTitle("Suspension issued") //Sets Title
          .setURL("https://docs.google.com/spreadsheets/d/1nvGmghIMDIDVptO0Tjp9yM2c8ZhPDigDb6450aApVLQ/edit#gid=0") //Sets URL on to the Title
          .setAuthor( //Sets Author as the person who used the command, 2nd argument is their avatar URL.
            "Command used by: " + message.member.displayName,
            message.author.avatarURL()
          )
          .addFields( //Adds embed fields
            { name: "Roblox ID" , value: "```" + id + "```" },
            { name: "Approximate end date" , value: "```" + endDate + "```" },
            { name: "Tier" , value: "```Tier " + tierNum + " (" + tierString + ")```" },
            { name: "Suspended by" , value: "```" + punisher + "```" },
            { name: "Evidence" , value: link === "Not publicly available." ? "```" + link + "```" : link },
            { name: "Reason" , value: "```" + reason + "```" }
            )
          .setThumbnail("https://www.roblox.com/Thumbs/Avatar.ashx?x=500&y=500&userId=" + id) //Sets thumbnail to Roblox's Avatar
          .setFooter("Made by Constellium");
      message.channel.send(msg);
    }
    
    async function accessSpreadsheet(id) {
        await doc.useServiceAccountAuth({
          client_email: creds.client_email,
          private_key: creds.private_key
        });

        await doc.loadInfo();
        const sheet = doc.sheetsById[1152075367];
        const suspensionInputSheet = await sheet.addRow({
          roblox_id: id,
          suspended_by: punisher,
          tier: tierNum,
          reason: reason,
          date_suspended: new Date().toLocaleDateString('en-US', { timeZone: 'America/New_York',hour12: false }),
          proof: link,
          stored_username: args[0]
        });
        const sheet1 = doc.sheetsById[750157401];
        const logInputSheet = await sheet1.addRow({
          symbol: '="+"',
          robloxid: id,
          storedusername: args[0],
          updatedate: new Date().toLocaleDateString('en-US', { timeZone: 'America/New_York',hour12: false }),
          updateinfo: `Suspension logged for ${tierDuration} ${tierDuration > 2 ? "days" : "day"} (Tier ${tierNum}). ${reason}`
        });
      }
  }
};
