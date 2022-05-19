const router = require("express").Router();
const createError = require("http-errors");

const authorisation = require("../middlewares/authorisation");
const { createPoll } = require("../controllers/poll");

router.post("/", authorisation, createPoll);

module.exports = router;
