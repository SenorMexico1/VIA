const { MessageEmbed } = require('discord.js')
module.exports = {
  name: "ban",
  description: "bans people",
  async execute (bot, message, args, Discord, Roblox, categoryId) {
    const ms = require("ms");
    const { GoogleSpreadsheet } = require("google-spreadsheet");
    const creds = require("../client_secret2.json");
    const doc = new GoogleSpreadsheet(
      "1b0eNRS1wJ4cRE8X38DmChR-8Eg1YCTHGTrKJ1gE1WHQ"
    );
    if (
      !message.member.hasPermission("BAN_MEMBERS", "ADMINISTRATOR") ||
      !(message.guild.id === "527289061329731587")
    ) {
      //message.channel.send("Command issued by an invalid user or in an invalid server. Try again with proper authorization.");
    } else {
      console.log(message.mentions.members.first())
      console.log(message.guild.members.cache.get(args[0]));
      const Member =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]);
      console.log(Member);
      if (Member === message.guild.me) {
        message.channel.send(
          "You cannot ban me, fool.\n`!ban [@user] [reason(optionable)].`"
        );
        return;
      }
      if (!Member) {
        message.channel.send(
          "Enter a valid user.\n`!ban [@user] [reason(optionable)].`"
        );
        return;
      }
      if (message.member === Member) {
        message.channel.send(
          "You cannot ban yourself, fool.\n`!ban [@user] [reason(optionable)].`"
        );
        return;
      }
      let reason = args.slice(1).join(" ");
      if (args[1] === "" || !args[1]) reason = "No reason given.";
      await Member.ban({ reason: reason });
      // .then(console.log)
      // .catch(console.error);
      const msg = new MessageEmbed()
        .setColor("ff0000")
        .setDescription(
          "**" +
            message.mentions.users.first().tag +
            "** was banned | " +
            reason
        );
      message.channel.send(msg);
      message.delete();
      let nickname =
        Member.nickname ||
        Member.username;
      let mod = message.member.displayName ? message.member.displayName : message.author.tag;
      let VIADiscord = bot.guilds.cache.get("485928637162455060");
      let logChannel = VIADiscord.channels.cache.get("743233196963004436");
      logChannel.send(
        Member.id + " | " + nickname + " | " + reason + " | Banned by " + mod
      );
      async function accessSpreadsheet(id) {
        await doc.useServiceAccountAuth({
          client_email: creds.client_email,
          private_key: creds.private_key
        });
        await doc.loadInfo();
        const sheet = doc.sheetsById[1474847813];
        const addRow = await sheet.addRow({
          username: nickname,
          rid: id,
          did: Member.id,
          date: new Date().toLocaleDateString(),
          reason: reason,
          duration: "Indefinite",
          type: "Ban"
        });
      }
      Roblox.getIdFromUsername(nickname).then(id => {
        accessSpreadsheet(id);
      });
    }
  }
};
