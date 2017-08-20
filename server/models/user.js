const mongoose = require("mongoose");
const bcrypt   = require("bcryptjs");

const config = require("../config");

const UserSchema = mongoose.Schema({
  name:     { type: String },
  email:    { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

UserSchema.statics.findByUsername = (username, done) => {
  this.findOne({ username: username }, (err, user) => {
    if (err)   { throw err; }
    if (!user) { return done(null, false); }
    done(null, user);
  });
};

module.exports = mongoose.model("User", UserSchema);
