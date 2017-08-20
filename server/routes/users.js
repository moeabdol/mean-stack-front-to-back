const express = require("express");

const router = express.Router();

const users = require("../controllers/users");

router.get("/register", users.registerUser);
router.get("/authenticate", users.authenticateUser);
router.get("/profile", users.getProfile);

module.exports = router;
