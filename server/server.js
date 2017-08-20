const express    = require("express");
const path       = require("path");
const bodyParser = require("body-parser");
const cors       = require("cors");
const passport   = require("passport");
const mongoose   = require("mongoose");

const app = express();

const usersRoutes = require("./routes/users");

const port = 3000;

// Enable all CORS requests
app.use(cors());

// Configure body-parser middleware
app.use(bodyParser.json());

// Configure routes
app.use("/users", usersRoutes);

app.get("/", (req, res) => {
  res.send("Invalid endpoint");
});

app.listen(port, () => {
  console.log("Server started on port " + port);
});
