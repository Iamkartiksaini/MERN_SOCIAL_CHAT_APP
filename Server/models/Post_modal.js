const mongoose = require("mongoose");

const twitterPostSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  userID: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    required: false,
  },
  text: {
    type: String,
    required: true,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const TwitterPost = mongoose.model("Posts", twitterPostSchema);

module.exports = TwitterPost;
