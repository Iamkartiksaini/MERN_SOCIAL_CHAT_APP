// const express = require("express");
// const app = express();
// const mongoose = require(`mongoose`);

// const cors = require("cors");
// app.use(cors());
// mongoose.set("strictQuery", false);
// // const localUrl = "mongodb://0.0.0.0:27017/accounts";
// const localUrl2 = "mongodb://0.0.0.0:27017/codedamn";
// const chat_hub_local = "mongodb://0.0.0.0:27017/chat_hub";
// const cloudUrl =
//   "mongodb+srv://kartik:HarshSaini@learning.pm3vwfv.mongodb.net/usersList";

// mongoose.connect(localUrl2, {
//   useNewUrlParser: true,
// });

// const db = mongoose.connection;
// db.on("error", (error) => console.error(error));
// db.once("open", () => console.log("connected to database"));

// app.use(express.json());

// const users = require("./Router/router");

// app.use("/users", users);

// app.listen(4000, () => {
//   console.log("server started");
// });

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
app.use("/", user);
app.use("/conversation", conversation);
app.use("/msg", message);

app.listen(port, () => {
  console.log("listening on port", port);
});
