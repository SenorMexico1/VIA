const mongoose = require("mongoose");

const reqString = {
  type: String,
  required: true
};
const reqNum = {
  type: Number,
  required: true
};

const reqDate = {
  type: Date,
  required: true
};

const userSchema = mongoose.Schema({
  username: reqString,
  robloxid: reqNum,
  tierDuration: reqNum,
  tierNum: reqNum,
  tierString: reqString,
  startDate: reqDate,
  endDate: reqDate,
  punisher: reqString,
  link: reqString,
  reason: reqString
});

module.exports = mongoose.model("users", userSchema);
