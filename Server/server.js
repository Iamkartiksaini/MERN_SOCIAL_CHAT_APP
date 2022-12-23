const express = require("express");
// const cors = require("cors");
const app = express();
const router = express.Router();

const port = 4000;

app.use(
  "/",
  router.get("/home", (req, res) => {
    console.log(req);
    res.json({
      name: "kartik",
      work: "frontend Developer",
      id: "Admin",
    });
  })
);
app.use(
  "/",
  router.get("/", async (req, res) => {
    res.send("preet");
  })
);
// app.use(cors());

// const routes = require('./app/routes');
// routes(app)

app.listen(port, (error) => {
  error ? console.log(error) : console.log(`server is running on port ${port}`);
});
