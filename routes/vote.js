const router = require("express").Router();

const { vote } = require("../controllers/vote");
const authorisation = require("../middlewares/authorisation");

router.post("/", authorisation, vote);

module.exports = router;
