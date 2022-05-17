const router = require("express").Router();
const validInfo = require("../middlewares/validInfo");
const { getUser, register, login } = require("../controllers/auth");

router.get("/", (req, res) => {
  //   console.log("req", req);
  res.status(200).json({ message: "Auth" });
});

router.post("/register", validInfo, register);
router.post("/login", validInfo, login);

module.exports = router;
