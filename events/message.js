const {Discord, MessageAttachment,  MessageEmbed} = require("discord.js"),
  noblox = require("noblox.js"),
  fetch = require("node-fetch"),
  blacklist = require("../storage/blacklistedWords.js");
module.exports = {
  name: "message",
  run: async (message, client) => {
    if (message.author.equals(client.user)) return;
    if (message.guild === null) { commandsInDMs(message,client); return; }
    await fromMsgtoSheetCD(message,client);
    await troll(message, message.content, client);
    const categoryId = message.channel.parentID;
    if (categoryId === "485929135999549451") await blacklistFormatMsg(message.content.split(/ +/)[0], message, client);
    await wordFilter(message, message.content.toLowerCase(), client);
    if (!message.content.startsWith(process.env.PREFIX)) return;
    const args = message.content.substring(process.env.PREFIX.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const cmd = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!cmd) return;
    cmd.execute(client, message, args, Discord, noblox, categoryId);
    return;
  }
}
async function wordFilter(message, content, client) {
  if (!(message.guild.id === "527289061329731587" || message.guild.id === "315982987298603018")) return;
  if(message.channel.id === "482548800771194880" || message.channel.id === "585963924436811794" || message.channel.id === "485524658590973986" 
    || message.channel.id === "485523376576921601" || message.channel.id === "586657643041390603" ) return;
  if (message.length === 0) return;
  let username = message.member ? message.member.displayName : message.author.tag;

  if (await blacklist(content.toLowerCase(), true)) {
    let logChannel = client.guilds.cache.get("485928637162455060").channels.cache.get("797743532843991090");
    let VIALogs = client.guilds.cache.get("707535612365897790").channels.cache.get("817622002360647711");
    let notificationMsg = new MessageEmbed()
      .setColor("ff0000")
      .setDescription(
        "Blacklisted word detected in " + message.channel.guild.name
      )
      .addFields({
        name: "Username",
        value: "```" + username + "```"
      }, {
        name: "Discord ID",
        value: "```" + message.author.tag + " (" + message.author.id + ")```"
      }, {
        name: "Channel:",
        value: "```" + message.channel.name + "```"
      }, {
        name: "Message:",
        value: "```" + message.content + "```"
      })
      .setTimestamp()
      .setFooter("Made by ConsteIIium");
    await logChannel.send(notificationMsg);
    await VIALogs.send(notificationMsg);
    message.channel.send("No.");
    await message.delete();
    return;
  } 
  else if (await blacklist(content.toLowerCase(), false)) {
    let logChannel = client.guilds.cache.get("485928637162455060").channels.cache.get("797743532843991090");
    let VIALogs = client.guilds.cache.get("707535612365897790").channels.cache.get("817622002360647711");
    let notificationMsg = new MessageEmbed()
      .setColor("fff200")
      .setDescription(
        "Suspicious word detected in " + message.channel.guild.name
      )
      .addFields({
        name: "Username",
        value: "```" + username + "```"
      }, {
        name: "Discord ID",
        value: "```" + message.author.tag + " (" + message.author.id + ")```"
      }, {
        name: "Channel:",
        value: "```" + message.channel.name + "```"
      }, {
        name: "Message:",
        value: "```" + message.content + "```"
      })
      .setTimestamp()
      .setFooter("Made by ConsteIIium");
    await logChannel.send(notificationMsg);
    await VIALogs.send(notificationMsg);
    return;
  } 
  else {
    return;
  }
  return;
}
async function troll(message){
  // Ensure we are in the VCN
  if (!(message.guild.id === "527289061329731587") ) return;
  // Do a little elden ring trolling
  /*if(message.content.toLowerCase().indexOf("elden ring") > -1 || message.content.toLowerCase().indexOf("elden") > -1){
    const picture = new MessageAttachment('https://cdn.glitch.global/54f650ba-2daf-41be-9784-6d03e12c9873/elden-tiktok.gif?v=1646074818893');
    message.channel.send(`<@!${message.author.id}>`,picture);
  }*/
  // Reaction to messages
  if(message.author.id==="204260347765456896") message.react("790204790214230037"); //DeltaVaktovia
  if(message.author.id==="90452442012991488")  message.react("808961276465250334"); //GunPumped
  if(message.author.id==="265693615018344448") message.react("829054741211512843"); //Deathcheeks
  if(message.author.id==="539609089001652226") message.react("672901748792229909"); //KylieHuntress
  if(message.author.id==="332279761399185410") message.react("891133080549609472"); //Flakcon
  if(message.author.id==="204628427498586112") message.react("904920629768257536"); //Viperium
  if(message.author.id==="300681559546134528") message.react('🧩'); //Gqboy
  if(message.author.id==="671060154241777681") message.react("791758737160798228"); //Veluct
  if(message.author.id==="424507985742790656") message.react("731525219268952154"); //Alpharunner
  if(message.author.id==="255809760606158849") message.react("742497448810905642"); //Syvorn
  if(message.author.id==="180484198606307329") message.react("944256573763625000"); //Malern
  if(message.author.id==="141016223889489920") message.react("816804605332684872"); //Moosee
  if(message.author.id==="162730147470901249") message.react('💀'); // Oshie
  if(message.author.id==="160730859975081986") message.react("948737383669579806"); // Shoku
  if(message.author.id==="310540563139002369") message.react("722445250324463666"); // Aurum
  if(message.author.id==="175688738251341824") message.react("583401729593180161"); // Valorus
  if(message.author.id==="478649490824232993") message.react("584158003620610048"); // Leootide
  if(message.author.id==="923434321702965290") message.react("🐶"); // supercutekittycat723
  //923434321702965290
  return;
}
async function blacklistFormatMsg(name, message) {
  if(message.channel.id !== "837541398420389918" && message.channel.id !== "807434352153460776" && message.channel.id !== "851677763899097088") return;
  await noblox.getIdFromUsername(name).then(id => {
    if(message.channel.id === "837541398420389918" || message.channel.id === "851677763899097088") {
        message.channel.send(`${name} [${id}]`);
        message.delete();
    }
    else if (message.channel.id === "807434352153460776") {
      const moment = require("moment");
      moment.suppressDeprecationWarnings = true;
      const fourMonths = moment().add(122, "days").calendar();
      message.channel.send(`${name} [${id}] | ${moment(fourMonths).format("LL")}`);
      message.delete();
    }
  })/*.catch(err =>{
    message.channel.send(`${name} was not found on Roblox.`);
    message.delete();
  });*/
}
async function commandsInDMs(message,client) {
  const args = message.content.split(" ");
  if(args.filter(e => e.toLowerCase().includes("inactivity")).length !== 0 && args.join("").toLowerCase().startsWith("inactivity")){
    const date = args.find(e => !isNaN(Date.parse(e)));
    //console.log({date});
    if(!date) { message.channel.send("No date indicated or understood. Please try again."); return; }
    
    const todaysDate = new Date().toLocaleDateString('en-US', { timeZone: 'America/New_York',hour12: false });
    //console.log({todaysDate});
    const newDate = new Date(todaysDate);
    //console.log(newDate);
    let mo = new Intl.DateTimeFormat('en', { month: 'long' }).format(newDate);
    //console.log({mo});
    const daysRequested = ((Date.parse(date) - Date.parse(todaysDate)) / 1000 / 60 / 60 / 24);
    console.log({daysRequested});
    if(daysRequested > 30) { 
      message.channel.send(`Too many days requested within one inactivity notice. Please try again with less requested days (30 or less).\nDays requested: \`${daysRequested} days\`.`); 
      return; 
    }
    if(daysRequested <= 0 ) { message.channel.send(`Your date (\`${date}\`) is either today's date or has already passed. You must request a date that is after \`${todaysDate} (EST - Eastern Standard Time)\`.`); return; }
    
    const { GoogleSpreadsheet } = require("google-spreadsheet");
    const doc = new GoogleSpreadsheet("1-kesi-6Y5T3XMek8zy60lo3yPlghila16-tYbOeM8l4");
    const creds = require("../client_secret.json");
    let url = `https://verify.eryn.io/api/user/${message.author.id}`;
        let settings = { method: "Get" };  
        fetch(url, settings)
          .then(res => res.json())
          .then(async json => {
            if(!json.error){
              const obj = await accessSpreadsheet(json.robloxId);
              console.log(obj.date)
              if(obj.date){
                return;
              }
              else {
              
              //console.log({obj})
              if(obj.sum >= 30) { 
                //message.channel.send(`Too many days requested within one inactivity notice. Please try again at a later time. Inactivity notices expire 6 months (180 days) after they're requested.\nInactivity history:\n\`\`\`\n${obj.datestring}\`\`\``); 
                noblox.getUsernameFromId(json.robloxId).then(async username =>{
                  const msg = new MessageEmbed()
                    .addField("Inactivity Notice Rejected", `You have already maximized the amount of inactivity notices within the last 6 months (180 days). You may request a change or a removal by contacting <@!232309108093616128> or by saying \"help\" and viewing your options.\n\n**Inactivity Notice History** (From the past 6 months):\n\`\`\`\n${obj.datestring}Sum of days requested: ${obj.sum}\`\`\``)
                    .setColor("450F12")
                  message.channel.send(msg);
                });
                return; 
              }
                console.log(obj.sum + daysRequested);
              if(obj.sum + (daysRequested) >= 30) { 
                const newDate = new Date(Date.parse(date) - ((obj.sum + (daysRequested + 1) - 30) * 24 * 60 * 60 * 1000))
                //message.channel.send(`Too many days requested within one inactivity notice. Please try again with ${(obj.sum+(daysRequested+1)-30)} fewer days (${newDate}) or contact <>.`); 
                const moment = require("moment")
                noblox.getUsernameFromId(json.robloxId).then(async username =>{
                  const msg = new MessageEmbed()
                    .addField("Inactivity Notice Rejected", `Too many days requested within one inactivity notice. Please try again with ${(obj.sum+(daysRequested+1)-30)} fewer days or up to (${moment(Date.parse(newDate)).format("M/D/YYYY")}). You may request a change or an extension by contacting <@!232309108093616128> or by saying \"help\" and viewing your options.\n\n**Inactivity Notice History** (From the past 6 months):\n\`\`\`\n${obj.datestring}Sum of days requested: ${obj.sum}\`\`\``)
                    .setColor("450F12")
                  message.channel.send(msg);
                });
                return; 
              }
              else {
                let reason = "Unlisted.";
                if(args.join(" ").toLowerCase().includes("for")) {  reason = args.join(" ").slice(args.join(" ").indexOf("for")+3); 
                                                                   //console.log(reason); 
                                                                 }
                if(args.join(" ").toLowerCase().includes("reason:")) {  reason = args.join(" ").slice(args.join(" ").indexOf("reason:")+7); 
                                                                   //console.log(reason); 
                                                                     }
                obj.sum = obj.sum += daysRequested;
                noblox.getUsernameFromId(json.robloxId).then(async username =>{
                  let rdate = new Date().toLocaleString('en-US', {
                    timeZone: 'America/New_York',
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    hour12: true
                  }).split(",").join("");
                  const endDate = new Date(Date.parse(rdate.substring(0,rdate.length-11)) + (Number(daysRequested) + 1 ) * 24 * 60 * 60 * 1000).toLocaleString('en-US', {
                    timeZone: 'America/New_York',
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric'
                  }).split(",").join("");
                  const moment = require("moment");
                  obj.datestring += `Start: ${moment(Date.parse(rdate.substring(0,rdate.length-11))).format("M/D/YYYY")} | End: ${moment(Date.parse(endDate)).format("M/D/YYYY")} | Days requested: ${daysRequested+1}\nSum of days requested: ${obj.sum+1}`
                  //console.log(date);
                  await doc.useServiceAccountAuth({
                    client_email: creds.client_email,
                    private_key: creds.private_key
                  });
                  await doc.loadInfo();
                  const sheet = await doc.sheetsById[832873307];
                  var addrow = sheet.addRow({
                  discordid: message.author.id,
                  name: username,
                  robloxid: json.robloxId,
                  date: rdate,
                  daysrequested: daysRequested+1,
                  reason: reason
                });
                  //console.log("Length: " + obj.datestring.length);
                  if (obj.datestring.length >= 868) { 
                    splitToPages(obj.datestring);
                  }
                  const msg = new MessageEmbed()
                  .addField("Inactivity Notice Accepted",`${username}, your inactivity notice has been approved until ${date} (${daysRequested+1} day${daysRequested+1>1?"s":""}).\n\n**Inactivity Notice History** (From the past 6 months):\n\`\`\`\n${obj.datestring}\`\`\` `)
                  .setColor("450F12");
                  message.channel.send(msg);
                  const Nmsg = new MessageEmbed()
                  .addField("Inactivity Notice Accepted",`${username}${username.endsWith('s') ? "'" : username.endsWith('z') ? "'" : "'s"} inactivity notice has been approved until ${date} (${daysRequested+1} day${daysRequested+1>1?"s":""}.\n\n**Inactivity Notice History** (From the past 6 months):\n\`\`\`\n${obj.datestring}\`\`\` `)
                  .setColor("450F12");
                  //client.guilds.cache.get("485928637162455060").channels.cache.get("869854372899737600").send(Nmsg);
                  return;
                })
              }
            }}});
    async function accessSpreadsheet(id){
       const moment = require("moment")
      await doc.useServiceAccountAuth({
                client_email: creds.client_email,
                private_key: creds.private_key
              });
      await doc.loadInfo();
      const sheet = await doc.sheetsById[0];
      const rows = await sheet.getRows();
      //console.log(message.author.id + " " + id)
      const dateHistory = rows.filter(e => e.discordid == message.author.id && e.robloxid == id);
      //console.log(dateHistory);
      let sum = 0;
      let dateString = "";
      dateHistory.forEach(e => {
        sum += Number(e.daysrequested);
        //console.log(Number(e.daysrequested));
        const endDate = new Date(Date.parse(e.date.substring(0,e.date.length-9)) + (Number(e.daysrequested) ) * 24 * 60 * 60 * 1000).toLocaleString('en-US', {
                    timeZone: 'America/New_York',
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric'
                  }).split(",").join("");
        dateString += `Start: ${moment(Date.parse(e.date.substring(0,e.date.length-9))).format("M/D/YYYY")} | End: ${moment(Date.parse(endDate)).format("M/D/YYYY")} | Days requested: ${Number(e.daysrequested)}\n`
        //console.log(`End date: ${Date.parse(e.enddate)} | Current time: ${Date.parse(new Date())} | ${(Date.parse(e.enddate) < Date.parse(new Date()))}`)
      });
      const nlength = dateHistory.length-1;
      //if(dateHistory){ console.log(dateHistory) };
      if(dateHistory.length !== 0){
          if(Date.parse(dateHistory[nlength].enddate.substring(0,dateHistory[nlength].enddate.length-9)) > Date.parse(new Date())){ 
          //message.channel.send(`You already have an active inactivity notice.\n**Information:**\n\`\`\`\nStart date: ${dateHistory[nlength].date}\nEnd date: ${dateHistory[nlength].enddate}\nLength of time: ${dateHistory[nlength].daysrequested} days\nReason: ${dateHistory[nlength].reason}\`\`\``); 
          const obj = {date: moment(Date.parse(dateHistory[nlength].date)).format("M/D/YYYY"), enddate: moment(Date.parse(dateHistory[nlength].enddate)).format("M/D/YYYY"), daysrequested: dateHistory[nlength].daysrequested, reason: dateHistory[nlength].reason};
          console.log({obj});
          const nMsg = new MessageEmbed()
          .addField("Inactivity Notice Rejected", `You already have an active inactivity notice. You may request a change or a removal by contacting <@!232309108093616128> or by saying \"help\" and viewing your options.\n\n**Current Inactivity Notice Information:**\n\`\`\`\nStart: ${dateHistory[nlength].date.substring(0,dateHistory[nlength].date.length-9)}\nEnd: ${dateHistory[nlength].enddate.substring(0,dateHistory[nlength].enddate.length-9)}\nLength of time: ${dateHistory[nlength].daysrequested} days\nReason: ${dateHistory[nlength].reason}\`\`\``)
          .setColor("450F12")
          message.channel.send(nMsg);
          return obj;
        }
        else {  
          const obj = {sum: sum, datestring: dateString};
          return obj;
        }
      }
      else {  
          const obj = {sum: sum, datestring: dateString};
          return obj;
        }
      
    }
  }
  else if(args.join("").toLowerCase().startsWith("remove")){
    const creds = require("../client_secret.json");
    let url = `https://verify.eryn.io/api/user/${message.author.id}`;
        let settings = { method: "Get" };  
        fetch(url, settings)
          .then(res => res.json())
          .then(async json => {
            if(!json.error){
              
              const { GoogleSpreadsheet } = require("google-spreadsheet");
              const doc = new GoogleSpreadsheet("1-kesi-6Y5T3XMek8zy60lo3yPlghila16-tYbOeM8l4");
              await doc.useServiceAccountAuth({
                          client_email: creds.client_email,
                          private_key: creds.private_key
                        });
                await doc.loadInfo();
                const sheet = await doc.sheetsById[0];
                const rows = await sheet.getRows();
                //console.log(message.author.id + " " + id)
                const dateHistory = rows.filter(e => e.discordid == message.author.id && e.robloxid == json.robloxId);
              if(dateHistory.length === 0) { message.channel.send("No inactivity notice history found, enter \"help\" to view all commands and their requirements."); return; }
              console.log(dateHistory[dateHistory.length-1].enddate);
              const lastNotice = dateHistory.length-1;
              const element = dateHistory[lastNotice];
              if(Date.parse(element.enddate) < Date.parse(new Date())) { message.channel.send(`Your last notice (Expiration date: ${element.enddate.substring(0,element.enddate.length-9)}) has already expired. You currently have no active inactivity notice.`); return; }
                
              noblox.getUsernameFromId(json.robloxId).then(username => {
                let reason = "None given.";
                if(args.join(" ").toLowerCase().indexOf("because") > -1) { reason = args.join(" ").split("because")[1]; }
                console.log({reason});
                const msg = new MessageEmbed()
                .setColor("450F12")
                .setThumbnail(`https://www.roblox.com/Thumbs/Avatar.ashx?x=500&y=500&userId=${json.robloxId}`)
                .setTitle(`Removal request for ${username}`)
                .setURL(`https://www.roblox.com/users/${json.robloxId}/profile`)
                .addField("User Information",`**Discord Tag**: <@!${message.author.id}>\n**Discord ID**: ${message.author.id}\n**Roblox Username**: ${username}\n**Roblox ID**: ${json.robloxId}\n**Reason for removal**: ${reason}`)
                .addField("Inactivity Notice Information",`\`\`\`Start: ${element.date.substring(0,element.date.length-9)}\nEnd: ${element.enddate.substring(0,element.enddate.length-9)}\nLength of notice: ${element.daysrequested} days\nReason:${element.reason}\`\`\``)
                message.channel.send(msg);
                client.guilds.cache.get("485928637162455060").channels.cache.get("869854372899737600").send(msg)
                console.log(element.date);
              })
      }
    })
    return;
  }
  else if (args.join("").toLowerCase().startsWith("change")) {
    const args = message.content.split(" ");
    const date = args.find(e => !isNaN(Date.parse(e))) || args.find(e=> e.toLowerCase() == "today")
    //console.log({date});
    if(!date) { message.channel.send("No date indicated or understood. Please try again."); return; }
    const creds = require("../client_secret.json");
    const { GoogleSpreadsheet } = require("google-spreadsheet");
    const doc = new GoogleSpreadsheet("1-kesi-6Y5T3XMek8zy60lo3yPlghila16-tYbOeM8l4");
      await doc.useServiceAccountAuth({
        client_email: creds.client_email,
        private_key: creds.private_key
      });
      await doc.loadInfo();
      const sheet = await doc.sheetsById[0];
      const rows = await sheet.getRows();
      const dateHistory = rows.filter(e => e.discordid == message.author.id);
      if(dateHistory.length < 0){ message.channel.send("No inactivity notice found");return; }
      const lastIndx = dateHistory.length-1;
      let todaysDate = new Date().toLocaleString('en-US', {
                    timeZone: 'America/New_York',
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    hour12: true
                  }).split(",").join("");
      todaysDate = todaysDate.substring(0,todaysDate.length-11)
      console.log({todaysDate})
      console.log({date})
      if(Date.parse(date) < Date.parse(todaysDate)){ message.channel.send ("You cannot change it to a date that already passed"); return; }
      if(Date.parse(todaysDate) >= Date.parse(dateHistory[lastIndx].enddate.substring(0,10))){ message.channel.send("Your last notice already expired"); return; }
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      const sumOfDates = dateHistory.map(e => Number(e.daysrequested)).reduce((accumulator, currentValue) => accumulator + currentValue);
      if(Date.parse(date) <= Date.parse(dateHistory[lastIndx].enddate.substring(0,10))){ //if changing it to less
        console.log({sumOfDates})
        const difference = toDays(Date.parse(date) - Date.parse(dateHistory[lastIndx].enddate.substring(0,10)));
        console.log({difference});
        const newSum = sumOfDates + difference;
        console.log({newSum}); // 
        const newDaysRequested = (Date.parse(date) - Date.parse(todaysDate))/24/60/60/1000;
        console.log(newDaysRequested)
        
        const creds = require("../client_secret.json");
        const { GoogleSpreadsheet } = require("google-spreadsheet");
        const doc = new GoogleSpreadsheet("1-kesi-6Y5T3XMek8zy60lo3yPlghila16-tYbOeM8l4");
          await doc.useServiceAccountAuth({
            client_email: creds.client_email,
            private_key: creds.private_key
          });
        await doc.loadInfo();
        const sheet = await doc.sheetsById[832873307];
        const rows = await sheet.getRows();
        const data = rows.filter(e => e.discordid == message.author.id);
       // console.log({data})
        const row = data[data.length-1];
        //console.log({row});
        row.daysrequested = date == todaysDate ? 1 : newDaysRequested;
        await row.save();
        
        //newDate = newDate.substring(0,todaysDate.length-11);
        
        return;
      }
      else{ 
      
      if(sumOfDates >= 30) { message.channel.send("Already reached the maximim amount of notices"); return; }
      const newRequestedDays = ((Date.parse(date) - Date.parse(new Date(dateHistory[lastIndx].date.substring(0,10)))) / 24 / 60 / 60 / 1000)+1;
      console.log({newRequestedDays})
      if(sumOfDates + newRequestedDays > 30){ message.channel.send(`Too many days requested, please try again with ${sumOfDates + newRequestedDays - 30} days`); return; }
      
      const creds = require("../client_secret.json");
        const { GoogleSpreadsheet } = require("google-spreadsheet");
        const doc = new GoogleSpreadsheet("1-kesi-6Y5T3XMek8zy60lo3yPlghila16-tYbOeM8l4");
          await doc.useServiceAccountAuth({
            client_email: creds.client_email,
            private_key: creds.private_key
          });
        await doc.loadInfo();
        const sheet = await doc.sheetsById[832873307];
        const rows = await sheet.getRows();
        const data = rows.filter(e => e.discordid == message.author.id);
       // console.log({data})
        const row = data[data.length-1];
        //console.log({row});
        row.daysrequested = newRequestedDays;
        await row.save();
      }
      //else if extending date
     // const sumOfDates = dateHistory.map(e => Number(e.daysrequested)).reduce((accumulator, currentValue) => accumulator + currentValue);
      
  }
  else if (args.join("").toLowerCase()==="get") {
  let url = `https://verify.eryn.io/api/user/${message.author.id}`;
        let settings = { method: "Get" };  
        fetch(url, settings)
          .then(res => res.json())
          .then(async json => {
            if(!json.error){
              await noblox.getUsernameFromId(json.robloxId).then(async username =>{
                const creds = require("../client_secret.json");
                const { GoogleSpreadsheet } = require("google-spreadsheet");
                const doc = new GoogleSpreadsheet("1-kesi-6Y5T3XMek8zy60lo3yPlghila16-tYbOeM8l4");
                await doc.useServiceAccountAuth({
                            client_email: creds.client_email,
                            private_key: creds.private_key
                          });
                  await doc.loadInfo();
                  const sheet = await doc.sheetsById[0];
                  const rows = await sheet.getRows();
                  const dateHistory = rows.filter(e => e.discordid == message.author.id && e.robloxid == json.robloxId);
                  let formatHistory = "";
                  let sum = 0;
                  const moment = require("moment")
                  dateHistory.forEach(element =>{
                    formatHistory+=`Start: ${moment(Date.parse(element.date.substring(0,element.date.length-9))).format("M/D/YYYY")} | End: ${moment(Date.parse(element.enddate.substring(0,element.enddate.length-9))).format("M/D/YYYY")} | Days requested: ${element.daysrequested}\n`;
                    sum+=Number(element.daysrequested);
                  })
                  formatHistory+=`Sum of days requested: ${sum}`
                  const msg = new MessageEmbed()
                    .addField("Inactivity Notice Information",`${username}, you are ${sum>=30? "not": ""} eligible for more notices.\nYou currently have ${sum} days worth of notices.\n\n**Inactivity Notice History** (From the past 6 months):\n\`\`\`\n${formatHistory}\`\`\` `)
                    .setColor("450F12");
                  message.channel.send(msg);
              })
            }
        })
    
  }
  else if (args.join("").toLowerCase()==="help") {
    const menu = new MessageEmbed()
    .setImage()
    .setTitle("Menu Items")
    .addField("• **Inactivity Notice**","\"Inactivity Notice until <DATE -- MM/DD/YYYY> for <REASON>.\"")
    .addField("• **Removing Notice**","\"Remove my notice because <REASON -- optional>.\"")
    .addField("• **Change Notice**","\"Change my notice until <DATE -- MM/DD/YYYY>.\"")
    .addField("• **Getting Notice History**","\"Get my notices\"")
    .setColor("450F12");
    //b51414 EB3434
    message.channel.send(menu);
  }
  else {
    const menu = new MessageEmbed()
    .setImage()
    .setTitle("Menu Items")
    .addField("• **Inactivity Notice**","\"Inactivity Notice until <DATE -- MM/DD/YYYY> for <REASON>.\"")
    .addField("• **Removing Notice**","\"Remove my notice because <REASON -- optional>.\"")
    .addField("• **Change Notice**","\"Change my notice until <DATE -- MM/DD/YYYY>.\"")
    .addField("• **Getting Notice History**","\"Get my notices\"")
    .setColor("450F12");
    //b51414 EB3434
    message.channel.send(menu);
  }
  //const includesNotice = args.filter(e => e.toLowerCase().includes("inactivity")).length !== 0;
  /*if (!includesNotice) message.channel.send("In order to request an inactivity notice, please use the following format:\n`Inactivity notice until <DATE -- MM/DD/YYYY> for <REASON>.`\nAn example would be:\n`Inactivity notice until 8/10/2021 for Summer Vacation.`")
  else {
    
    const date = args.find(e => !isNaN(Date.parse(e)));
    console.log({date});
    if(!date) { message.channel.send("No date indicated or understood. Please try again."); return; }
    
    const todaysDate = new Date().toLocaleDateString('en-US', { timeZone: 'America/New_York',hour12: false });
    console.log({todaysDate});
    const newDate = new Date(todaysDate);
    console.log(newDate);
    let mo = new Intl.DateTimeFormat('en', { month: 'long' }).format(newDate);
    console.log({mo});
    const daysRequested = ((Date.parse(date) - Date.parse(todaysDate)) / 1000 / 60 / 60 / 24);
    console.log({daysRequested});
    if(daysRequested > 30) { message.channel.send(`Too many days requested within one inactivity notice. Please try again with less requested days (30 or less).\nDays requested: \`${daysRequested} days\`.`); return; }
    if(daysRequested <= 0 ) { message.channel.send(`Your date (\`${date}\`) is either today's date or has already passed. You must request a date that is after \`${todaysDate} (EST - Eastern Standard Time)\`.`); return; }
    
    
  
  }*/
}
async function fromMsgtoSheetCD(message,client){
  if(message.channel.id !== "854072263905509406") return;
  const args = message.content.split("\n");
  //console.log(args);
  if(!args[0].toLowerCase().includes("event type:")){ message.channel.send("No event type indicated or not formatted properly. Please use this format:\n```\nEvent type: [Your event]\nWhat time it started: [Time or Date]\n[Link or Photo]```"); return; }
  if(!args[1].toLowerCase().includes("what time it started:")) { message.channel.send("No time indicated or not formatted properly. Please use this format:\n```\nEvent type: [Your event]\nWhat time it started: [Time or Date]\n[Link or Photo]```"); return; }
  const Attachment = (message.attachments).array();
  console.log(message.attachments)
  console.log(Attachment)
  const link = Attachment !== undefined && Attachment.length !== 0 ? Attachment[0].url : args[2] ? args[2] : "No link indicated";
  const fetch = require("node-fetch");
    let url = `https://verify.eryn.io/api/user/${message.author.id}`;
    let settings = { method: "Get" };
    fetch(url, settings)
      .then(res => res.json())
      .then(async json => {
        console.log(json);
      let usersId = json.robloxId;
      noblox.getUsernameFromId(usersId).then(name => {
         const newEmbed = new MessageEmbed()
        .setThumbnail(`https://www.roblox.com/Thumbs/Avatar.ashx?x=500&y=500&userId=${usersId}`)
        .addFields({ name: "Username" , value: "```" + name + "```" },
                   { name: "Roblox ID" , value: "```" + usersId + "```" },
                   { name: "Link" , value: "```" + link + "```" },
                   { name: "Description" , value: "```" + args[0].split(" ").slice(2).join(" ") + "```" })
        .setColor("#03AC13")
      client.guilds.cache.get("485928637162455060").channels.cache.get("865826431392415794").send(`${name} has logged a new event:`,{
        embed: newEmbed
      });
      const { GoogleSpreadsheet } = require("google-spreadsheet"),
      creds = require("../client_secret.json"),
      doc = new GoogleSpreadsheet("1-BsHxECIZhYneSoM-QjgQ907pXRAPcAvqD6T-gOJvfE");
      const date = new Date().toLocaleString('en-US', { timeZone: 'America/New_York',hour12: false }).split(",").join("");
      accessSpreadsheet(usersId, name);
        async function accessSpreadsheet(id, name) {
          await doc.useServiceAccountAuth({
            client_email: creds.client_email,
            private_key: creds.private_key
          });
          await doc.loadInfo();
          const sheet = doc.sheetsById[0];
          const newEvent = await sheet.addRow({Date: date, Username: name, "Roblox ID": id, Link: link, Description: args[0].split(" ").slice(2).join(" ")});
            }
          })
       
      /*message.channel.send('This is a normal message.', {
 embed: Embed,
});*/
    })
  //console.log(link);
  //message.channel.send(`Your event: ${args[0].split(" ").slice(2).join(" ")}.\nYour time indicated: ${args[1].split(" ").slice(4).join(" ")}\nLink: ${link}`);
     // message.channel.send(newEmbed);
}
function splitToPages(string){
  let indx = 0;
  for(var i = 768; i < string.length; i++){
    console.log(string.substring(i,i+2));
    
    if(string.substring(i,i+2) === "St"){
      console.log("found!")
      indx = i;
    } 
  }
  const pages = [string.substring(0,indx-1), string.substring(indx-1,string.length)];
    console.log(pages);
}
function toDays(dateParsed){
  return dateParsed / 24 / 60 / 60 / 1000;
}