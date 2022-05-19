const router = require("express").Router();
const prisma = require("../prisma/client");
const createError = require("http-errors");
// const { allTodos, userTodos, createPoll } = require("../controllers/polls");

const authorisation = require("../middlewares/authorisation");

// router.get("/", authorisation, getUser);
// router.post("/register", validInfo, register);
// router.post("/login", validInfo, login);
// router.get("/verify/:id/:token", verifyEmail);

router.post("/", async (req, res, next) => {
  try {
    const { user_id, poll_id, option } = req.body;
    const newVote = await prisma.vote.create({
      data: {
        user_id,
        poll_id,
        option,
      },
    });
    res.json(newVote);
  } catch (error) {
    next(createError(500, error.message));
  }
});

module.exports = router;
