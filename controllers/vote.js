const createError = require("http-errors");

const prisma = require("../prisma/client");

const vote = async (req, res, next) => {
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
};
module.exports = { vote };
