const router = require("express").Router();

const { vote, getVotes } = require("../controllers/vote");
const authorisation = require("../middlewares/authorisation");

router.get("/:id", authorisation, getVotes);
router.post("/:id", authorisation, vote);

module.exports = router;
