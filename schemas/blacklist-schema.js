const mongoose = require("mongoose");

const reqString = {
  type: String,
  required: true
};
const reqNum = {
  type: Number,
  required: true
};

const blacklistSchema = mongoose.Schema({
  username: reqString,
  robloxid: reqNum,
  categoryNum: reqString,
  categoryString: reqString,
  punisher: reqString,
  link: reqString,
  reason: reqString
});

module.exports = mongoose.model("user", blacklistSchema);