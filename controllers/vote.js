const createError = require("http-errors");

const prisma = require("../prisma/client");

const getVotes = async (req, res, next) => {
  try {
    const poll_id = req.params.id;
    const votes = await prisma.poll.findUnique({
      where: {
        poll_id,
      },
      select: {
        votes: true,
      },
    });
    res.json(votes);
  } catch (error) {
    next(createError(500, error.message));
  }
};

const vote = async (req, res, next) => {
  try {
    const user_id = req.user;
    const poll_id = req.params.id;
    const { option } = req.body;
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
module.exports = { vote, getVotes };
