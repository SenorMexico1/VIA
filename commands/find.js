
module.exports = {
  name: "find",
  description: "checks for a group of people whether they're in vak",
  async execute(bot, message, args, Discord, Roblox, categoryId) {
    const fetchBans = message.guild.fetchBans();
    const bannedMembers = (await fetchBans).filter(member => member.user.id == "429202113327792159")
    console.log(bannedMembers)
  } 
};  

function anyRemoved(n){ 
  return n > 0; 
}
function isEqual(a,b){
  return a == b;
}
