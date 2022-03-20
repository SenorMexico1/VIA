const { MessageEmbed } = require('discord.js');
module.exports = {
  name: "strike",
  description: "strikes people",
  async execute(bot, message, args, Discord, Roblox, categoryId) {
    if (!(categoryId === "485928908118556697")) {
      message.channel.send(
        "Command issued in invalid category. Try again in the VIA: Justice Department Discord Section."
      );
    } else {
      if (
        !message.member.roles.cache.get("485932373427486721") && //Emperor
        !message.member.roles.cache.get("485932916816347137") && //VIA Overseer
        !message.member.roles.cache.get("617633556155334656") && //Legate General
        !message.member.roles.cache.get("518560251822211085") && //Head of the Justice Dept.
        !message.member.roles.cache.get("661755931419344909") //Manager of the Justice Dept.
      ) {
        message.channel.send(
          "Command issued by an invalid user. Try again with proper authorization in the VIA: Justice Department Discord Section."
        );
      } else {
        const { GoogleSpreadsheet } = require("google-spreadsheet");
        const creds = require("../client_secret.json");
        const doc = new GoogleSpreadsheet(
          "1HY21csuqO-wu2Stz_mICXkqmkU4UDFHuaJpPO_zL9tw"
        );
        const moment = require("moment");
        const timeBetweenDates = require("time-between-dates");
        let reason = "";
        for (var i = 1; i < args.length; i++) {
          if (!i == args.length - 1) {
            reason += args[i];
          } else {
            reason += args[i] + " ";
          }
        }
        if (reason == "") {
          reason = "-";
        }
        async function accessSpreadsheet(id, rank) {
          await doc.useServiceAccountAuth({
            client_email: creds.client_email,
            private_key: creds.private_key
          });
          await doc.loadInfo();
          const sheet = doc.sheetsById[1370904354];
          const larryRow = await sheet.addRow({
            rank: rank,
            username: args[0],
            robloxid: id,
            date: new Date().toLocaleDateString(),
            reason: reason
          });
          const sheet1 = doc.sheetsById[1168108286];
          const rows = await sheet1.getRows();
          await rows.forEach(element => {
            if (element["robloxid"] == id) {
              let dateFromNow; //
              if (rank.indexOf("Legate") > -1) {
                dateFromNow = moment()
                  .add(90, "days")
                  .calendar();
              } else {
                dateFromNow = moment()
                  .add(60, "days")
                  .calendar();
              }
              let numStrikes;
              if (!element["strikecount"]) {
                numStrikes = 1;
              } else {
                numStrikes = Number(element["strikecount"]);
              }
              let strikeMsg = new MessageEmbed()
                .setTitle("Justice Database | " + args[0])
                .setURL("https://www.roblox.com/users/" + id + "/profile/")
                .addFields(
                  { name: "Username", value: args[0] },
                  { name: "Roblox ID", value: id },
                  { name: "Rank", value: rank },
                  { name: "Aprox. End Date of Strike", value: dateFromNow },
                  { name: "Number of Strikes", value: numStrikes },
                  { name: "Reason", value: reason }
                )
                .setThumbnail(
                  "https://www.roblox.com/Thumbs/Avatar.ashx?x=500&y=500&userId=" +
                    id
                )
                .setTimestamp();
              message.channel.send(strikeMsg);
              let VIADiscord = bot.guilds.cache.get("485928637162455060");
              let logChannel = VIADiscord.channels.cache.get(
                "563387488832585758"
              );
              logChannel.send(
                "**" +
                  args[0] +
                  "**" +
                  " has been striked for " +
                  reason +
                  " | Total of " +
                  numStrikes +
                  " | " +
                  new Date().toLocaleDateString()
              );
            }
          });
        }
        Roblox.getIdFromUsername(args[0])
          .then(id => {
            Roblox.getRankNameInGroup(131688, id)
              .then(rank => {
                accessSpreadsheet(id, rank);
              })
              .catch(err => {
                console.log(err);
                message.channel.send(
                  new MessageEmbed()
                    .addField("ERROR", "User is not a Vaktovian.")
                    .setFooter(
                      "Made by ConsteIIium",
                      "https://cdn.discordapp.com/avatars/693400459628511293/d17a52fe8b83cb9488c97451a90e34ff.png?size=256"
                    )
                    .setTimestamp()
                );
              });
          })
          .catch(err => {
            console.log(err);
            message.channel.send(
              new MessageEmbed()
                .addField("ERROR", "User doesn't exist")
                .setFooter(
                  "Made by ConsteIIium",
                  "https://cdn.discordapp.com/avatars/693400459628511293/d17a52fe8b83cb9488c97451a90e34ff.png?size=256"
                )
                .setTimestamp()
            );
          });
      }
    }
  }
};
