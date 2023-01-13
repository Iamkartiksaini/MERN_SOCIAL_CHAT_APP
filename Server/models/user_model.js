const mongoose = require(`mongoose`);

const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    reqiured: true,
  },
  bio: {
    type: String,
    reqiured: false,
  },
  profileImage: {
    type: String,
    reqiured: false,
  },
  coverImage: {
    type: String,
    reqiured: false,
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
  posts: {
    type: Array,
    reqiured: false,
  },
});

module.exports = mongoose.model("Users", usersSchema);
