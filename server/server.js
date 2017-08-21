const express    = require("express");
const path       = require("path");
const bodyParser = require("body-parser");
const cors       = require("cors");
const passport   = require("passport");
const mongoose   = require("mongoose");

const app = express();

const config = require("./config");

const usersRoutes = require("./routes/users");

const port = 3000;

// Configure and connect to database
mongoose.Promise = global.Promise;
mongoose.connect(config.db, { useMongoClient: true }, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to database " + config.db);
  }
});

// Enable all CORS requests
app.use(cors());

// Configure body-parser middleware
app.use(bodyParser.json());

// Configure passport middleware
require("./config/passport")(passport);
app.use(passport.initialize());

// Configure static directory
app.use(express.static(path.join(__dirname, "public")));

// Configure routes
app.use("/users", usersRoutes);

app.get("/", (req, res) => {
  res.send("Invalid endpoint");
});

app.listen(port, () => {
  console.log("Server started on port " + port);
});
