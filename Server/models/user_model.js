const mongoose = require(`mongoose`);

const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    reqiured: false,
  },
  userID: {
    type: String,
    reqiured: true,
  },
  friends: {
    type: Array,
    reqiured: false,
  },
});

module.exports = mongoose.model("Users", usersSchema);
