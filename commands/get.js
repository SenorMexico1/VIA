module.exports = {
  name: "get",
  description: "gets people",
  async execute (bot, message, args, Discord, Roblox, categoryId)  {
   // message.channel.send("Temporarily down. Testing.")/*
    if(categoryId === "677641885971644461"){
      console.log("Promotion Department");
      const fmt = "```"
      const { GoogleSpreadsheet } = require("google-spreadsheet");
      const creds = require("../client_secret.json");
      const doc = new GoogleSpreadsheet("1Lel96IAeT53Xc2B4v_nMixchJ1EA2OzWHyoKqv_PXEE");
      async function accessSpreadsheet(id, name,rank) {
        console.log("Accessing...")
        await doc.useServiceAccountAuth({
          client_email: creds.client_email,
          private_key: creds.private_key
        });
        console.log("Getting Info...")
        await doc.loadInfo();
        console.log("Getting sheet...")
        const sheet = doc.sheetsById[407192141];
        console.log("Getting rows...")
        const rows = await sheet.getRows();
        console.log("Loading...")
        const userInfo = await rows.find(e => e.robloxid == id);
        console.log("1")
        const time30 = (( userInfo["30d"] / 15 ) >= 1)
        console.log("2")
        const time14 = (( userInfo["14d"] / 15 ) >= 1)
        console.log("3")
        const rankEligibility = rankIsEligible(rank, userInfo.time)
        console.log("4")
        const color = time30 && time14  && rankEligibility ? "00ff00" : "ff0000";
        console.log("5")
        const Msg = new Discord.MessageEmbed()
        .addFields({name: "Username", value: `${fmt}${name}${fmt}`},
                   {name: "Roblox ID",value: `${fmt}${id}${fmt}`},
                   {name: "Rank", value: `${fmt}${rank}${fmt}`},
                   {name: "Promotion Date", value: `${fmt}${userInfo.date}${fmt}`},
                   {name: "Last 30 Days", value: `${fmt}${userInfo["30d"]} events (${time14 ? "Eligible" : "Ineligible"}) ${fmt}`},
                   {name: "Last 14 Days", value: `${fmt}${userInfo["14d"]} events (${time30 ? "Eligible" : "Ineligible"}) ${fmt}`},
                   {name: "Time in Rank", value: `${fmt}${userInfo.time} days (${rankEligibility ? "Eligible" : "Ineligible"})${fmt}`})
        console.log("6")
        Msg.setThumbnail(`https://www.roblox.com/Thumbs/Avatar.ashx?x=500&y=500&userId=${id}`)
          console.log("7")
        Msg.setColor(color);
        message.channel.send(Msg);
       // message.channel.send(`${name}\n${id}\n${rank}\n${userInfo.date}`)
        
      }
      Roblox.getIdFromUsername(args[0]).then( id => {
        console.log("Lo...")
         Roblox.getUsernameFromId(id).then( name => {
           console.log("Load...")
           Roblox.getRankNameInGroup(131688, id).then( rank =>{
             console.log("Loadi...")
             accessSpreadsheet(id,name,rank);            
          }).catch(err => {
            message.channel.send(`${args[0]} is not in the Vaktovian Empire.`)
          })
        })
      }).catch(err => {
            message.channel.send(`${args[0]} is not a ROBLOX username.`)
          })
      
      function rankIsEligible (rank, time){
        switch(rank){
          case "Legionary Corporal":
            return time >= 30 ? true : false;
          case "Legionary Lance Corporal":
            return time >= 70 ? true : false;
          case "Legionary Private First Class":
            return time >= 50 ? true : false;
          case "Legionary Private":
            return time >= 30 ? true : false;
          default:
            return "ERROR";
        }
      }
    }
    else if (categoryId === "671017591053221899") {
      console.log("Community Department");
      const { GoogleSpreadsheet } = require("google-spreadsheet");
      const creds = require("../client_secret2.json");
      const doc = new GoogleSpreadsheet(
        "1b0eNRS1wJ4cRE8X38DmChR-8Eg1YCTHGTrKJ1gE1WHQ"
      );
      async function accessSpreadsheet(id, name) {
        await doc.useServiceAccountAuth({
          client_email: creds.client_email,
          private_key: creds.private_key
        });
        await doc.loadInfo();
        const sheet = doc.sheetsById[1474847813];
        const rows = await sheet.getRows();
        let posted = false;
        let type = [];
        let discordIds = [];
        let dates = [];
        let reason = [];
        let duration = [];
        await rows.forEach(element => {
          if (element["rid"] == id) {
            posted = true;
            discordIds.push(element["did"]);
            dates.push(element["date"]);
            type.push(element["type"]);
            reason.push(element["reason"]);
            duration.push(element["duration"]);
          }
        });
        if (posted) {
          let x;
          let discIds = "";
          function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
          }
          let endChar = "";
          var unique = discordIds.filter(onlyUnique);
          console.log(unique);
          if (unique.length > 1) {
            unique.join("\n");
            endChar = "s";
          }

          let titleChar = "s";
          if (name.toLowerCase().endsWith("s")) {
            titleChar = "";
          }
          let getMsg = new Discord.MessageEmbed()
            .setTitle(name + "'" + titleChar + " Record")
            .setThumbnail(
              "https://www.roblox.com/Thumbs/Avatar.ashx?x=500&y=500&userId=" +
                id
            )
            .setURL("https://www.roblox.com/users/" + id + "/profile/")
            .addField("**Discord ID" + endChar + ":**", "```" + unique + "```")
            .addField("**Roblox ID:**", "```" + id + "```");
          let history = "```";
          for (x in dates) {
            history +=
              "• " +
              dates[x] +
              " // " +
              type[x] +
              " // " +
              reason[x] +
              " // " +
              duration[x] +
              "\n";
          }
          history += "```";
          getMsg.addField("**Punishment History:**", history);
          message.channel.send(getMsg);
        } else {
          message.channel.send("No punsihments found for " + args[0]);
        }
      }
      Roblox.getIdFromUsername(args[0])
        .then(id => {
          Roblox.getUsernameFromId(id).then(name => {
            accessSpreadsheet(id, name);
          });
        })
        .catch(err => {
          console.log(err);
          message.channel.send("User does not exist.");
        });
    } else if (categoryId === "485928908118556697") {
      console.log("Justice Department");
      const { GoogleSpreadsheet } = require("google-spreadsheet");
      const creds = require("../client_secret.json");
      const doc = new GoogleSpreadsheet(
        "1egPEzcxxbooUxS3d5mlXiBCL6kirC45Xt0peeTRyVhc"
      );
      const moment = require("moment");
      const timeBetweenDates = require("time-between-dates");
      async function accessSpreadsheet(id, name) {
        await doc.useServiceAccountAuth({
          client_email: creds.client_email,
          private_key: creds.private_key
        });
        await doc.loadInfo();
        const sheet = doc.sheetsById[1168108286];
        const rows = await sheet.getRows();
        let posted = false;
        await rows.forEach(element => {
          if (element["robloxid"] == id) {
            let strikeLength;
            if (name.indexOf("Legate") > -1) {
              strikeLength = 90;
            } else {
              strikeLength = 60;
            }
            let strikeSize = Number(element["strikecount"]);
            let getMsg = new Discord.MessageEmbed()
              .setTitle("Justice Database | " + element["username"])
              .setURL("https://www.roblox.com/users/" + id + "/profile/")
              .addFields(
                { name: "Roblox ID", value: id },
                { name: "Rank", value: name },
                { name: "Strike Count", value: strikeSize }
              )
              .setThumbnail(
                "https://www.roblox.com/Thumbs/Avatar.ashx?x=500&y=500&userId=" +
                  id
              )
              .setTimestamp()
              .setFooter(
                "Made by ConsteIIium",
                "https://cdn.discordapp.com/avatars/693400459628511293/d17a52fe8b83cb9488c97451a90e34ff.png?size=256"
              );
            for (var i = 1; i <= strikeSize; i++) {
              let strikeEndDate =
                new Date(element["date" + i]).getTime() +
                strikeLength * 24 * 60 * 60 * 1000;
              let timeRemaining = timeBetweenDates(
                strikeEndDate,
                Date.now(),
                "days",
                0
              );
              let endDateFormated = moment(strikeEndDate).format("L");
              getMsg.addField(
                "Strike " + i + ":",
                "Reason: " +
                  element["reason" + i] +
                  "\nRemaining time: " +
                  timeRemaining +
                  " days (" +
                  endDateFormated +
                  ")"
              );
            }
            message.channel.send(getMsg);
            posted = true;
          }
        });
        if (posted == false) {
          message.channel.send("No strkes found.");
        }
      }
      Roblox.getIdFromUsername(args[0]).then(async id => {
        Roblox.getRankNameInGroup(131688, id)
          .then(name => {
            accessSpreadsheet(id, name);
          })
          .catch(err => {
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
      });
    } else if(categoryId==="485929135999549451"||categoryId==="488767821438910495"||message.channel.id==="632086649483952148"|| process.env.OWNER_ID === message.author.id){
      console.log("Blacklist Department");}
      /*message.channel.send("Decommissioned, use !g for the meantime.")}
      message.channel.send("Searching sheets...")
      const { GoogleSpreadsheet } = require("google-spreadsheet");
      const creds = require("../client_secret.json");
      const doc = new GoogleSpreadsheet(
        "1EB38DtdF2WBAU4QNrZoGKFY5j3adqh8CTaZQy7f8oE4"
      );
      const moment = require("moment");
      var msg = new Discord.MessageEmbed();
      async function accessSpreadsheet(id, groups, size) {
        await doc.useServiceAccountAuth({
          client_email: creds.client_email,
          private_key: creds.private_key
        });
        await doc.loadInfo();
        let posted = false;
        const sheet = doc.sheetsById[1152075367];
        const rows = await sheet.getRows();
        await rows.forEach(element => {
          if (element["roblox_id"] == id) {
            var tierData = [
              [0, "Indefinite", "Indefinite"],
              [1, 1.0145625, "1 Day"],
              [2, 7.60921875, "1 Week"],
              [3, 30.436875, "1 Month"],
              [4, 60.87375, "2 Months"],
              [5, 121.7475, "4 Months"],
              [6, 182.62125, "6 Months"],
              [7, 243.495, "8 Months"],
              [8, 365.2425, "1 Year"],
              [9, 547.86375, "18 Months"],
              [10, 730.485, "2 Years"],
              [11, 1095.7275, "3 Years"],
              [12, 1460.97, "4 Years"]
            ];
            let tierNum = Number(element["tier"]);
            console.log(tierNum);
            let tierMsg;
            if (tierNum !== 0) {
              tierMsg =
                "```Tier " + tierNum + " (" + tierData[tierNum][2] + ")```";
            } else {
              tierMsg = "```Tier 0 (Indefinite)```";
            }
            var tierList = [
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
            let evidence;
            if (element["proof"] === "-") evidence = "```Not publicly listed.```";
            else evidence = element["proof"];
            var grabTier = tierList[tierNum];
            console.log(element["tier"]);
            console.log(Number(element["tier"]))
            console.log(tierList)
            console.log(grabTier)
            let reason;
            if(element["reason"]==="-") reason = "```Not publicly stated.```";
            else reason = element["reason"];
            if(Number(element["tier"])!==0);
            else var grabTier = "Indefinite";
            var endDate = moment(element["date_suspended"], "MM/DD/YYYY")
              .add(grabTier, "days")
              .format("MMMM Do, YYYY");
            console.log(endDate);
            console.log(grabTier);
            if(tierNum === 0) endDate = "Indefinite"
            msg = new Discord.MessageEmbed()
              .setColor("#ffffff")
              .setTitle("Blacklist Database | " + element["stored_username"])
              .setURL("https://www.roblox.com/users/" + id + "/profile/")
              .setAuthor(
                "Command used by: " + message.member.displayName,
                message.author.avatarURL()
              )
              .setThumbnail(
                "https://www.roblox.com/Thumbs/Avatar.ashx?x=500&y=500&userId=" +
                  id
              )
              .addFields(
                { name: "Roblox ID", value: "```" + id + "```", inline: false },
                { name: "Tier Information", value: tierMsg, inline: false },
                {
                  name: "Date suspended",
                  value:
                    "```" +
                    moment(element["date_suspended"], "M/D/YYYY").format(
                      "MMMM Do, YYYY"
                    ) +
                    "```",
                  inline: false
                },
                {
                  name: "Date Expiration",
                  value: "```" + endDate + "```",
                  inline: false
                },
                {
                  name: "Suspended by",
                  value: "```" + element["suspended_by"] + "```",
                  inline: false
                },
                
                {
                  name: "Reason",
                  value:  "```"+reason+"```" ,
                  inline: false
                },
                {
                  name: "**Evidence**",
                  value:  evidence,
                  inline: false
                }
              )
              .setFooter("Made by ConsteIIium");
            //message.channel.send(msg);
            posted = true;
          }
        });
        if (posted == false) {
          const sheet = doc.sheetsById[1398269168];
          const rows = await sheet.getRows();
          let filtered = rows.filter(element => element.roblox_id == id);
          console.log(filtered);
          await rows.forEach(element => {
            if (element["roblox_id"] == id) {
              let evidence = "N/A";
              let notes = "N/A";
              if (element["evidence"]!=="-") {
                evidence = element["evidence"];
              }
              else{
                evidence = "```Not publicly listed```";
              }
              if (
                !element["additional_information"]=="-"
              ) {
                notes = element["additional_information"];
              }
              else{
                notes = "Not publicly stated."
              }
              var reasonLoop = "";
              var reason = [
                "[1] Exploiters in and out of Vaktovia",
                "[2] People committing real life illegal acts",
                "[3] People abusing their power in Vaktovia",
                "[4] Scammers",
                "[5] Individuals whom are extremely against Vaktovia",
                "[6] Alternative, shared, or purchased accounts",
                "[7] Individuals whom steal assets, valor, or sell stolen assets."
              ];
              let catName = "";
              if (element["reason"].length <= 1) {
                catName = "Category";
              } else {
                catName = "Categories";
              }
              var wholeList = element["reason"].split(",");
              for (var i = 0; i < wholeList.length; i++) {
                reasonLoop += reason[parseInt(wholeList[i], 10) - 1] + "\n";
              }
              var reasonFinal = reasonLoop.split("undefined");
              let blacklistedGroups = "";
              for (let i = 0; i < size; i++) {
                if (
                  groups[i] == "The Insurgent Ascension Program" ||
                  groups[i] == "Imperial Ascension Program" ||
                  groups[i] == "Sol Imperialis" ||
                  groups[i] == "|MX| Ejército Mexicano|" ||
                  groups[i] == "Imperium of Vaktovia" ||
                  groups[i] == "Solar Militarum" || 
                  groups[i] == "The Vaktoviаn Confederation" ||
                  groups[i] == "Vaktovian Auxiliаry Corps"
                ) {
                  blacklistedGroups = groups[i] + "\n";
                }
              }
              if (blacklistedGroups == "") {
                blacklistedGroups = "None";
              }
             msg
             .setColor("#ffffff")
                .setTitle("Blacklist Database | " + element["stored_username"])
                .setURL("https://www.roblox.com/users/" + id + "/profile/")
                .addFields(
                  { name: "Roblox ID", value: "```"+id+"```", inline: false },
                  {
                    name: "Blacklisted by",
                    value: "```"+element["blacklisted_by"]+"```",
                    inline: false
                  },
                  {
                    name: "**Evidence**",
                    value: evidence,
                    inline: false
                  },
                  {
                    name: "Additional Notes",
                    value: "```"+notes+"```",
                    inline: false
                  },
                  {
                    name: "**"+catName+"**",
                    value: "```"+reasonFinal+"```",
                    inline: false
                  }
                )
                .setThumbnail(
                  "https://www.roblox.com/Thumbs/Avatar.ashx?x=500&y=500&userId=" +
                    id
                )
                .setFooter(
                  "Made by ConsteIIium");
             // message.channel.send(msg);
              posted = true;
              
            }
          });
          if (posted == false) {
            message.channel.send(
              "This person wasn't found on the blacklist or suspension sheet."
            );
          }
        }
        const secSheet = doc.sheetsById[750157401];
        const secRows = await secSheet.getRows();
        let historyArray = [];
        let historyMsg = "";
        await secRows.forEach(element => {
          if (element["robloxid"] == id && element["symbol"] === "-") {
            historyArray.push(element["updateinfo"]);
            historyArray.push(element["updatedate"]);
          }
        });
        if (historyArray.length >= 1) {
          for (var x = historyArray.length; x > 0; x = x - 2) {
            historyMsg +=
              "• " + historyArray[x - 1] + " - " + historyArray[x - 2] + "\n";
          }
          /*var histMsg = new Discord.MessageEmbed().addField(
            "History:",
            historyMsg
          );*//*
          msg.addField("History","```"+historyMsg+"```")
          let blacklistedGroups = "";
          for (let i = 0; i < size; i++) {
            if (
              groups[i] == "The Insurgent Ascension Program" ||
              groups[i] == "Imperial Ascension Program" ||
              groups[i] == "Sol Imperialis" ||
              groups[i] == "|MX| Ejército Mexicano|" ||
              groups[i] == "Imperium of Vaktovia" ||
              groups[i] == "Solar Militarum" || 
              groups[i] == "The Vaktoviаn Confederation" ||
              groups[i] == "Vaktovian Auxiliаry Corps"
            ) {
              blacklistedGroups = groups[i] + "\n";
            }
          }
          if (blacklistedGroups == "") {
            blacklistedGroups = "None";
          }
          msg
            .addField("Blacklisted Groups:", "```"+blacklistedGroups+"```")
          .setFooter("Made by ConsteIIium");
          message.channel.send(msg);
        } else {
          var histMsg = new Discord.MessageEmbed();
          let blacklistedGroups = "";
          for (let i = 0; i < size; i++) {
            if (
              groups[i] == "The Insurgent Ascension Program" ||
              groups[i] == "Imperial Ascension Program" ||
              groups[i] == "Sol Imperialis" ||
              groups[i] == "|MX| Ejército Mexicano|" ||
              groups[i] == "Imperium of Vaktovia" || 
              groups[i] == "The Vaktoviаn Confederation" ||
              groups[i] == "Vaktovian Auxiliаry Corps" ||
              groups[i] ==  "Solar Militarum"
            ) {
              blacklistedGroups += groups[i] + "\n";
            }
          }
          if (blacklistedGroups == "") {
            blacklistedGroups = "None";
          }
           msg.addField("Blacklisted Groups:", "```"+blacklistedGroups+"```")
          .setFooter("Made by ConsteIIium");
          message.channel.send(msg);
        }
      }
      Roblox.getIdFromUsername(args[0])
        .then(async id => {
          const getUser = require("roblox-user-information");
          await getUser(args[0]).then(user => {
            console.log(user.groups);
            accessSpreadsheet(id, user.groups.groups, user.groups.count);
          });
        })
        .catch(err => {
          message.channel.send("This user was not found on Roblox.");
        });
    }
    else{
    message.channel.send("Use <#632086649483952148>")
    }
    */
  }
};
