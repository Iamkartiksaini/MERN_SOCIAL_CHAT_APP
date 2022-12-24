const mongoose = require(`mongoose`);

const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    reqiured: true,
  },
  userID: {
    type: String,
    reqiured: true,
  },
  password: {
    type: String,
    reqiured: true,
  },
  friends: {
    type: Array,
    reqiured: false,
  },
});

module.exports = mongoose.model("Users", usersSchema);
