const mongoose = require("mongoose");
const bcrypt   = require("bcryptjs");

const SALT_FACTOR = 10;

const UserSchema = mongoose.Schema({
  name:     { type: String },
  email:    { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

UserSchema.pre("save", function(next) {
  const user = this;
  if (this.isModified("password" || this.isNew)) {
    bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) { return next(err); }
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

UserSchema.index({ email: 1, username: 1 }, { unique: true });

UserSchema.statics.findByUsername = function(username, done) {
  this.findOne({ username: username }, (err, user) => {
    if (err)   { return done(err, false); }
    if (!user) { return done(null, false); }
    done(null, user);
  });
};

UserSchema.methods.comparePassword = function(password, done) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) { return done(err); }
    done(null, isMatch);
  });
};

module.exports = mongoose.model("User", UserSchema);
