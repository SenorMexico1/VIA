const { MessageEmbed } = require('discord.js');
module.exports = {
  name: "mute",
  description: "mutes people",
  async execute(bot, message, args, Discord, Roblox, categoryId) {
    const ms = require("ms");
    const { GoogleSpreadsheet } = require("google-spreadsheet");
    const creds = require("../client_secret2.json");
    const doc = new GoogleSpreadsheet(
      "1b0eNRS1wJ4cRE8X38DmChR-8Eg1YCTHGTrKJ1gE1WHQ"
    );
    console.log(args);
    if (
      !message.member.hasPermission("MANAGE_ROLES", "ADMINISTRATOR") ||
      !(message.guild.id === "527289061329731587")
    ) {
      message.channel.send(
        "Command issued by an invalid user or in an invalid server. Try again with proper authorization."
      );
    } else {
      const Member =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]);
      if (Member === message.guild.me) {
        message.channel.send(
          "You cannot mute me, fool.\n`!mute [@user] [time(m-h-d)] [reason(optionable)].`"
        );
        return;
      } //
      if (!message.mentions.members.first()) {
        message.channel.send(
          "Enter a valid user.\n`!mute [@user] [time(m-h-d)] [reason(optionable)].`"
        );
        return;
      }
      if (message.member === Member) {
        message.channel.send(
          "You cannot yourself, fool.\n`!mute [@user] [time(m-h-d)] [reason(optionable)].`"
        );
        return;
      }
      const regex = /^.{1,100}[mhd]$/g;
      if (!args[1] || !args[1].toString().match(regex)) {
        message.channel.send(
          "Enter a valid time.\n`!mute [@user] [time(m-h-d)] [reason(optionable)].`"
        );
        return;
      }
      const rolesForLater = await Member.roles.cache.filter(e => e != "585582268148350977");
      const muteRoleId = await message.guild.roles.cache.get("631327613390159872");
      console.log(rolesForLater)
      let reason = args.slice(2).join(" ");
      if (args[3] === "") reason = "No reason given.";
      await Member.roles.remove(rolesForLater);
      Member.roles.add(muteRoleId);
      const msg = new MessageEmbed()
        .setColor("93c47d")
        .setDescription(
          "**" + message.mentions.users.first().tag + "** was muted | " + reason
        );
      message.channel.send(msg);
      message.delete();

      console.log(
        message.mentions.users.first().id +
          " | " +
          (message.mentions.members.first().nickname ||
            message.mentions.users.first().username) +
          " | " +
          reason +
          " | " +
          args[2]
      );
      let nickname =
        message.mentions.members.first().nickname ||
        message.mentions.users.first().username;
      let VIADiscord = bot.guilds.cache.get("485928637162455060");
      let logChannel = VIADiscord.channels.cache.get("743233670403457106");
      let mod = message.member.displayName
        ? message.member.displayName
        : message.author.tag;
      logChannel.send(
        message.mentions.users.first().id +
          " | " +
          nickname +
          " | " +
          reason +
          " | " +
          args[1] +
          " | Muted by " +
          mod
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
          did: message.mentions.users.first().id,
          date: new Date().toLocaleDateString(),
          reason: reason,
          duration: args[1],
          type: "Mute"
        });
      }
      Roblox.getIdFromUsername(nickname).then(id => {
        accessSpreadsheet(id);
      });
      setTimeout(async function() {
        await Member.roles.remove(muteRoleId).catch(console.error);
        await Member.roles.add(rolesForLater).catch(console.error);
        await message.channel.send(`<@${Member.id}> is no longer muted.`);
      }, ms(args[1]));
      
    }
  }
};
