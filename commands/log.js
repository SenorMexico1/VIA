 const { GoogleSpreadsheet } = require("google-spreadsheet"),
  creds = require("../client_secret.json"),
  doc = new GoogleSpreadsheet("1-BsHxECIZhYneSoM-QjgQ907pXRAPcAvqD6T-gOJvfE");
const { MessageEmbed } = require('discord.js');
const formatString = "```";

module.exports = {
  name: "log",
  description: "CD add quota",
  async execute(bot, message, args, Discord, Roblox, categoryId) {
    if(!args[0]) { message.channel.send("No user indicated. Please try again."); return; }
    
    const link = !args[1] || args[1] === "-" ? "Not listed." : args[1];
    const description = !args[2] || args[2] === "-" ? "None given." : args.slice(2).join(" ");
    const date = new Date().toLocaleString('en-US', { timeZone: 'America/New_York',hour12: false }).split(",").join("");
    
    async function accessSpreadsheet(id, name) {
      await doc.useServiceAccountAuth({
        client_email: creds.client_email,
        private_key: creds.private_key
      });
      await doc.loadInfo();
      const sheet = doc.sheetsById[0];
      const newEvent = await sheet.addRow({Date: date, Username: name, "Roblox ID": id, Link: link, Description: description});
      const newEmbed = new MessageEmbed()
      .setThumbnail(`https://www.roblox.com/Thumbs/Avatar.ashx?x=500&y=500&userId=${id}`)
      .addFields({ name: "Username" , value: "```" + name + "```" },
                 { name: "Roblox ID" , value: "```" + id + "```" },
                 { name: "Link" , value: "```" + link + "```" },
                 { name: "Description" , value: "```" + description + "```" })
      .setColor("#03AC13")
      message.channel.send(newEmbed);
    }
    Roblox.getIdFromUsername(args[0]).then(id =>{
      accessSpreadsheet(id,args[0]);
    }).catch(err =>{
      message.channel.send(`${args[0]} is not a valid user.`);
      return;
    })
  }
};
