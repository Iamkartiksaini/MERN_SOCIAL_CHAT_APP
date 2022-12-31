const express = require("express");
const mongoose = require("mongoose");
const app = express();

const cors = require("cors");
app.use(cors());
app.use(express.json());
mongoose.set("strictQuery", false);
const port = 4000;

const localUrl = "mongodb://0.0.0.0:27017/codedamn";

mongoose.connect(localUrl, {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to database"));

const user = require("./Router/UsersRouter.js");
const conversation = require("./Router/conversation.js");
const message = require("./Router/messages");
const posts = require("./Router/Posts.js");
app.use("/", user);
app.use("/conversation", conversation);
app.use("/msg", message);
app.use("/posts", posts);

app.listen(port, () => {
  console.log("listening on port", port);
});
