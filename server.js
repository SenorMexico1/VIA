const Discord = require("discord.js"),
  noblox = require("noblox.js"),
  mongoose = require("mongoose"),
  fs = require("fs"),
  client = new Discord.Client(),
  mongo = require("./mongo"),
  userSchema = require("./schemas/user-schema");
require("dotenv").config();


client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync("./commands/")
  .filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

const eventFiles = fs
  .readdirSync("./events")
  .filter(file => file.endsWith(".js"));
for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.run(...args, client));
  } else {
    client.on(event.name, (...args) => event.run(...args, client));
  }
}
client.login(process.env.TOKEN);
