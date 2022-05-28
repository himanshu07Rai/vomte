const router = require("express").Router();

const { vote, getVotes } = require("../controllers/vote");
const authorisation = require("../middlewares/authorisation");

router.get("/", authorisation, getVotes);
router.post("/", authorisation, vote);

module.exports = router;
