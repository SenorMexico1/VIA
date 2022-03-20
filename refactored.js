const mongoose = require("mongoose");
const mongoPath = `mongodb+srv://Constellium:beyblade11@cluster0.kme5d.mongodb.net/BlacklistDept/Blacklists`;

module.exports = async () => {
  await mongoose.connect(mongoPath, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
  });

  return mongoose;
};
