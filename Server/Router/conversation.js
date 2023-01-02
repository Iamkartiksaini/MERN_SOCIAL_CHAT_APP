const express = require(`express`);
const router = express.Router();
const Conversation = require("../models/conversation_model.js");

// Getting all
router.get("/", async (req, res) => {
  const show = await Conversation.find({}, { _id: 1, members: 1, msg: 1 });
  res.send(show);
  console.log("--- get all conversation req  ---");
});
// GET SINGLE
router.post("/:name/:this", async (req, res) => {
  const show = await Conversation.find({
    _id: req.body.id,
  });
  res.send(show);
  console.log("--- get single conversation req ---");
});

// Creating One
router.post("/create", async (req, res) => {
  console.log("--- req ---", req.body);
  const users = new Conversation({
    members: req.body.members,
    msg: req.body.msg,
  });
  try {
    const newUser = await users.save();
    res.send(newUser);
    console.log(" ---- insert successful ----", newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Patch MSG Sending MSG  ---
router.patch("/:any", async (req, res) => {
  console.log(" ---- SEND MSG Attemption ----");
  try {
    const sendMSG = await Conversation.updateOne(
      {
        _id: req.body.id,
      },
      {
        $push: {
          msg: req.body.msg,
        },
      }
    );

    console.log(" ---- Push MSG Attempt successfull ----");
    res.status(201).send(sendMSG);
  } catch (err) {
    res.send({ message: err.message });
  }
});
// --- Delete
router.delete("/:any", async (req, res) => {
  console.log(" ---- Delete attemption ----");
  console.log("req body data ", req.body);
  try {
    const searchingThis = await Conversation.find({
      _id: req.body.id,
    });
    console.log("delete Req for", searchingThis);
    const removeData = await Conversation.deleteOne({
      _id: req.body.id,
    });
    console.log(" ---- Delete Attempt successfull ----");
    res.send(" ---- Delete Attempt successfull ----");
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
module.exports = router;
