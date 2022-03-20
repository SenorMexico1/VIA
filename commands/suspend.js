const moment = require("moment");
const timeBetweenDates = require("time-between-dates");
module.exports = {
  name: "suspend",
  description: "suspend people",
  async execute(bot, message, args, Discord, Roblox, categoryId) {/*
    let byPass = false;
    if (message.author.id === process.env.OWNER_ID) byPass = true;
    if ((message.guild.id === "527289061329731587" || message.guild.id === "315982987298603018") && byPass === false) return;
    if (categoryId !== "485929135999549451" && byPass === false) {
      message.channel.send(
        "Command issued in invalid category. Try again in the VIA: Blacklist Department Discord Section."
      );
    } else {
      //if(!args[0]) message.channel.send("Blank username, please try again."); return;
      //if(isNaN(args[2])) message.channel.send("Invalid tier, please try again."); return;
      const { GoogleSpreadsheet } = require("google-spreadsheet");
      const creds = require("../client_secret.json");
      const doc = new GoogleSpreadsheet("1EB38DtdF2WBAU4QNrZoGKFY5j3adqh8CTaZQy7f8oE4");
      let suspendedBy = filterIssuer(args[1].toLowerCase());
      let reason = typeof args[4] !== 'undefined' && args[4] !== "-" ? args.slice(4).join(" ")  : "Not publicly stated.";
      let {
        endDate,
        timeServing,
        dayGrammar
      } = newSuspension(args[2]);
      let proof = typeof args[3] !== 'undefined' && args[3] !== "-" ? args[3] : "```Not pubilcly listed.```";
      async function accessSpreadsheet(id) {
        await doc.useServiceAccountAuth({
          client_email: creds.client_email,
          private_key: creds.private_key
        });

        await doc.loadInfo();
        const sheet = doc.sheetsById[1152075367];
        const larryRow = await sheet.addRow({
          roblox_id: id,
          suspended_by: suspendedBy,
          tier: args[2],
          reason: reason,
          date_suspended: new Date().toLocaleDateString(),
          proof: args[3],
          stored_username: args[0]
        });
        const sheet1 = doc.sheetsById[750157401];
        const larryRow1 = await sheet1.addRow({
          symbol: '="+"',
          robloxid: id,
          storedusername: args[0],
          updatedate: new Date().toLocaleDateString(),
          updateinfo: "Suspension logged for " +
            timeServing +
            " " +
            dayGrammar +
            " (Tier" +
            args[2] +
            "). " +
            reason
        });
      }
      Roblox.getIdFromUsername(args[0]).then(id => {
        accessSpreadsheet(id);
        const msg = new Discord.MessageEmbed()
          .setColor("#ffffff")
          .setTitle("Suspension issued")
          .setURL(
            "https://docs.google.com/spreadsheets/d/1nvGmghIMDIDVptO0Tjp9yM2c8ZhPDigDb6450aApVLQ/edit#gid=0"
          )
          .setAuthor(
            "Command used by: " + message.member.displayName,
            message.author.avatarURL()
          )
          .setDescription(
            args[0] +
            " has been suspended for " +
            timeServing +
            " " +
            dayGrammar +
            "!"
          )
          .setThumbnail(
            "https://www.roblox.com/Thumbs/Avatar.ashx?x=500&y=500&userId=" + id
          )
          .addFields({
            name: "Roblox ID",
            value: "```" + id + "```",
            inline: false
          }, {
            name: "Approx. end of date",
            value: "```" + endDate + "```",
            inline: false
          }, {
            name: "Tier",
            value: "```" + args[2] + " (" + timeServing + " " + dayGrammar + ")```",
            inline: true
          }, {
            name: "Suspended by",
            value: "```" + suspendedBy + "```",
            inline: false
          }, {
            name: "**Proof**",
            value: proof,
            inline: false
          }, {
            name: "Reason",
            value:  "```"+reason+"```",
            inline: false
          })
          .setTimestamp()
          .setFooter(
            "Made by ConsteIIium",
            "https://cdn.discordapp.com/avatars/693400459628511293/d17a52fe8b83cb9488c97451a90e34ff.png?size=256"
          );
        message.channel.send(msg);
        let VIADiscord = bot.guilds.cache.get("485928637162455060");
        let logChannel = VIADiscord.channels.cache.get("485951274249093132");
        logChannel.send(args[0] + " | Suspension added, tier " + args[2] + ".");
      }).catch(err => {
        console.log(err);
        message.channel.send(
          new Discord.MessageEmbed()
          .addField("ERROR", "User doesn't exist")
          .setFooter(
            "Made by ConsteIIium",
            "https://cdn.discordapp.com/avatars/693400459628511293/d17a52fe8b83cb9488c97451a90e34ff.png?size=256"
          )
          .setTimestamp()
        );
      });
    }

    function filterIssuer(x) {
      switch (x) {
        case "bd":
          return "Blacklist Department";
          break;
        case "bdm":
          return "Blacklist Department Management";
          break;
        case "jd":
          return "Justice Department";
          break;
        case "vacs":
          return "VAC Staff";
          break;
        case "vacm":
          return "VAC Management";
          break;
        case "lc":
          return "Legate Council";
          break;
        case "hc":
          return "High Command";
          break;
        default:
          return x;
          break;
      }
    }

    function newSuspension(x) {
      const tierList = [
        9999999,
        1.0145625,
        7.60921875,
        30.436875,
        60.87375,
        121.7475,
        182.62125,
        243.495,
        365.2425,
        547.86375,
        730.485,
        1095.7275,
        1460.97
      ];
      let grabTier = tierList[x];
      let now = Date.now();
      let sum = now + (grabTier * 24 * 60 * 60 * 1000);
      var approxDate = moment().add(grabTier, "days").calendar();
      var timeDiff = timeBetweenDates(sum, now, "days", 1);
      var dayName = timeDiff <= 1 ? "day" : "days";
      const suspension = {
        endDate: approxDate,
        timeServing: timeDiff,
        dayGrammar: dayName
      }
      return suspension;
    }*/
  }
};