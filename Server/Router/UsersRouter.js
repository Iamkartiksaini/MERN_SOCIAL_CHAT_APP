const express = require(`express`);
const router = express.Router();
const Users = require("../models/user_model.js");

// Getting all
router.get("/", async (req, res) => {
  console.log("hii this is okk");
  const usersList = await Users.find();
  // const deleteUser = await Users.deleteMany({ username: "harsh" });
  console.log("hii", usersList);
  res.send(usersList);
});

// Getting Multi Filterd
router.get("/addToFriendsList", async (req, res) => {
  console.log("hii this is okk");
  const usersList = await Users.find(
    ({ $or: [{ username: "preet" }, { username: "kartik" }] },
    { username: 1, userID: 1, friends: 1 })
  );
  // const deleteUser = await Users.deleteMany({ username: "harsh" });
  console.log("hii", usersList);
  res.send(usersList);
});

router.get("/create/:new", async (req, res) => {
  let x = {
    username: "harsh",
    userID: "harsh2",
  };
  const users = new Users(x);
  try {
    const newUser = await users.save();
    res.status(201).json(newUser);
    console.log("hello");
  } catch (err) {
    res.send(err);
    // res.status(400).json({ message: err.message });
  }
});

module.exports = router;
