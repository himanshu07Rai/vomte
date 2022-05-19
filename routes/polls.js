const router = require("express").Router();
const prisma = require("../prisma/client");
const createError = require("http-errors");
// const { allTodos, userTodos, createPoll } = require("../controllers/polls");

const authorisation = require("../middlewares/authorisation");

// router.get("/", authorisation, getUser);
// router.post("/register", validInfo, register);
// router.post("/login", validInfo, login);
// router.get("/verify/:id/:token", verifyEmail);

// router.get("/", authorisation, async (req, res) => {
//   let data = JSON.parse(await fs.readFile(dataFile, "utf-8"));
//   const totalVotes = Object.values(data).reduce((total, n) => (total += n), 0);

//   data = Object.entries(data).map(([label, votes]) => {
//     return {
//       label,
//       percentage: ((100 * votes) / totalVotes || 0).toFixed(0),
//     };
//   });

//   res.json(data);
// });

router.post("/", async (req, res, next) => {
  try {
    const { user_id, description, options } = req.body;
    const newPoll = await prisma.poll.create({
      data: {
        user_id,
        description,
        options,
      },
    });
    res.json({ poll: newPoll });
  } catch (error) {
    next(createError(500, error.message));
  }
});

module.exports = router;
