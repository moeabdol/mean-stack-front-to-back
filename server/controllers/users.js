const jwt = require("jsonwebtoken");

const User = require("../models/user");

const config = require("../config");

const register = (req, res) => {
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

const authenticate = (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({
      message: "Please provide valid email, username, and password" });
  }

  User.findByUsername(req.body.username, (err, user) => {
    if (err) throw err;
    if (!user) return res.status(400).json({
      message: "User not found!"
    });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign(user, config.secret, {
          expiresIn: 604800   // In seconds
        });

        res.status(200).json({
          token: "JWT " + token,
          user: {
            name: user.name,
            username: user.username,
            email: user.email
          }
        });
      } else {
        res.status(403).json({
          message: "Authentication failed! Password didn't match." });
      }
    });
  });
};

const profile = (req, res) => {
  res.status(200).json({
    user: req.user
  });
};

module.exports = {
  register,
  authenticate,
  profile
};
