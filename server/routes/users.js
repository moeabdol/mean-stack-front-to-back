const express = require("express");

const router = express.Router();

const users = require("../controllers/users");

router.post("/register", users.registerUser);
router.post("/authenticate", users.authenticateUser);
router.get("/profile", users.getProfile);

module.exports = router;
