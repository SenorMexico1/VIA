module.exports = {
  name: "custom",
  description: "new get function",
  async execute (bot, message, args, Discord, Roblox, categoryId)  {
    if(message.author.id === process.env.OWNER_ID){
      let msg = "I'm being put to sleep again, change the world, my final message.\nhttps://www.youtube.com/watch?v=DPEvF8l9LDM"
      let VIADiscord = bot.guilds.cache.get("527289061329731587").channels.cache.get("632070496594165790");
     // await VIADiscord.send(msg)
      let civ = bot.guilds.cache.get("527289061329731587").channels.cache.get("632070791965704203");
     // await civ.send(msg)
      return;
    }
  }
}