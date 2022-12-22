const express = require(`express`);
const router = express.Router();
const Message = require("../models/message_model.js");

// Getting all
router.get("/", async (req, res) => {
  const messages = await Message.find();
  res.send(messages);
});

router.post("/:any", async (req, res) => {
  let x = {
    conversationId: req.body.conversationId,
    sender: req.body.senderName,
    text: req.body.text,
  };
  console.log("x", x);
  const users = new Message(x);
  try {
    const newUser = await users.save();
    res.status(201).json(newUser);
    console.log(" ---- insert successful ----");
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.delete("/:any", async (req, res) => {
  console.log("req body data ", req.body);
  console.log(" ---- Delete attemption ----");
  try {
    const searchingThis = await Message.find({
      _id: req.body.id,
    });
    console.log("delete Req for", searchingThis);
    const removeData = await Message.deleteOne({
      _id: req.body.id,
    });
    console.log(" ---- Delete Attempt successfull ----");
    res.send(" ---- Delete Attempt successfull ----");
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
module.exports = router;
