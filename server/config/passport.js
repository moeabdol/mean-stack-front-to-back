const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt  = require("passport-jwt").ExtractJwt;

const User = require("../models/user");

const config = require("../config");

module.exports = function(passport) {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("JWT");
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.findById(jwt_payload._doc._id, (err, user) => {
      if (err) return done(err, false);
      if (user) return done(null, user);
      done(null, false);
    });
  }));
};
