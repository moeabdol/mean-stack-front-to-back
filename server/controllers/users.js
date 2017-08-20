const passport = require("passport");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const registerUser = (req, res) => {
  if (!req.body.email || !req.body.username || !req.body.password) {
    return res.status(400).json({
      message: "Please provide valid email, username, and password" });
  }

  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  newUser.save((err) => {
    if (err) {
      res.status(400).json({
        message: "Email and/or Username already exists!"});
    } else {
      res.status(201).json({ message: "User registered successfully." });
    }
  });
};

const authenticateUser = (req, res) => {
  res.send("authenticate");
};

const getProfile = (req, res) => {
  res.send("profile");
};

module.exports = {
  registerUser,
  authenticateUser,
  getProfile
};
