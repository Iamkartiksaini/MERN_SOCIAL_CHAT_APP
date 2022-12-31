const express = require("express");
const router = express.Router();
const Posts = require("../models/Post_modal.js");

// Get all tweets
router.get("/", async (req, res) => {
  try {
    const tweets = await Posts.find();
    res.json(tweets);
    console.log("get all posts");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single tweet by ID
router.get("/:id", async (req, res) => {
  try {
    const tweets = await Posts.find({ _id: req.body.id });
    res.json(tweets);
    console.log("get single posts");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new tweet
router.post("/", async (req, res) => {
  const tweet = new Posts({
    username: req.body.username,
    userID: req.body.userID,
    text: req.body.text,
  });
  try {
    const newTweet = await tweet.save();
    res.status(201).json(newTweet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a tweet by ID
router.patch("/:id", async (req, res) => {
  try {
    if (req.body.text != null) {
      const updatePost = await Posts.updateOne(
        { _id: req.body.id },
        { $set: { text: req.body.text } }
      );
      const getUpdatePost = await Posts.findOne({ _id: req.body.id });
      console.log("get updated post", getUpdatePost);
      console.log("updated post status", updatePost);
      res.json(getUpdatePost);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a tweet by ID
router.delete("/:id", getTweet, async (req, res) => {
  try {
    await res.tweet.remove();
    res.json({ message: "Deleted This tweet" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get tweet by ID
async function getTweet(req, res, next) {
  try {
    tweet = await Posts.findById(req.params.id);
    if (tweet == null) {
      return res.status(404).json({ message: "Cant find tweet" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.tweet = tweet;
  next();
}

module.exports = router;
