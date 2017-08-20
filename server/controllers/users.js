const registerUser = (req, res) => {
  res.send("register");
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
