const router = require("express").Router();

router.get("/", (req, res) => {
  //   console.log("req", req);
  res.status(200).json({ message: "Auth" });
});

module.exports = router;
