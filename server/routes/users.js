const express  = require("express");
const passport = require("passport");

const router = express.Router();

const users = require("../controllers/users");

router.post("/register", users.register);
router.post("/authenticate", users.authenticate);
router.get("/profile",
  passport.authenticate("jwt", { session: false }),
  users.profile);

module.exports = router;
