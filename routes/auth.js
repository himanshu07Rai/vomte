const router = require("express").Router();
const validInfo = require("../middlewares/validInfo");
const {
  getUser,
  register,
  login,
  verifyEmail,
} = require("../controllers/auth");

const prisma = require("../prisma/client");

router.post("/register", validInfo, register);
router.post("/login", validInfo, login);
router.get("/verify/:id/:token", verifyEmail);

module.exports = router;
