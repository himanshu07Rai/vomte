const createError = require("http-errors");

const prisma = require("../prisma/client");

const getVotes = async (req, res, next) => {
  try {
    const data = await prisma.vote.findMany();
    // log;
    res.json(data);
  } catch (error) {
    next(createError(500, error.message));
  }
};

const vote = async (req, res, next) => {
  try {
    const user_id = req.user;
    const { poll_id, option } = req.body;

    const { votes } = await prisma.poll.findUnique({
      where: {
        poll_id,
      },
      select: {
        votes: true,
      },
    });

    let a = [];

    a = votes.filter((vote) => vote.user_id === user_id);

    if (a.length > 0) {
      next(createError(500, "already voted"));
      return;
    }

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
