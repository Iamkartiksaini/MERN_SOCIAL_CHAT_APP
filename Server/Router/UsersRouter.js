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

// Getting Single
router.post("/", async (req, res) => {
  const auth = {
    userID: req.body.userID,
    password: req.body.password,
  };
  console.log("auth", auth);
  try {
    const getUser = await Users.find(auth, {
      _id: 0,
      username: 1,
      userID: 1,
      friends: 1,
    });
    if (getUser.length > 0) {
      res.status(200).send(getUser);
    } else {
      res.status(404).send("Not Found");
    }
  } catch (err) {
    console.log("err");
    res.status(404).send({ message: err });
  }
});

// Patch in User add friend
router.patch("/addFriend", async (req, res) => {
  console.log("----add friend");
  const { friend, user, roomID } = req.body;
  console.log("roomID", roomID);
  console.log("friend", friend);
  console.log("user", user);
  try {
    const updateFriend = await Users.updateOne(
      { username: friend.userID },
      {
        $push: {
          friends: {
            username: user.username,
            userID: user.userID,
            roomID: roomID,
          },
        },
      }
    );
    const updateUser = await Users.updateOne(
      { username: user.userID },
      {
        $push: {
          friends: {
            username: friend.username,
            userID: friend.userID,
            roomID: roomID,
          },
        },
      }
    );

    // if (updateFriend.length > 0 || updateUser.length > 0) {
    res.status(200).send(updateUser);
    // } else {
    // res.status(404).send("Not Found");
    // }
  } catch (err) {
    console.log("err");
    res.status(404).send({ message: err });
  }
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

// Create User
router.post("/create/:new", async (req, res) => {
  let x = {
    username: req.body.username,
    userID: req.body.userID,
    password: req.body.password,
    friends: [],
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
