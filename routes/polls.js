const router = require("express").Router();
const createError = require("http-errors");

const authorisation = require("../middlewares/authorisation");
const { createPoll, getAllPolls } = require("../controllers/poll");

router.get("/", authorisation, getAllPolls);
router.post("/", authorisation, createPoll);

module.exports = router;
