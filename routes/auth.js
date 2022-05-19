const router = require("express").Router();
const {
  getUser,
  register,
  login,
  verifyEmail,
} = require("../controllers/auth");

const validInfo = require("../middlewares/validInfo");
const authorisation = require("../middlewares/authorisation");

router.get("/", authorisation, getUser);
router.post("/register", validInfo, register);
router.post("/login", validInfo, login);
router.get("/verify/:id/:token", verifyEmail);

module.exports = router;
