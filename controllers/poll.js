const prisma = require("../prisma/client");
const createError = require("http-errors");

const createPoll = async (req, res, next) => {
  try {
    const user_id = req.user;
    const { description, options } = req.body;
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
};

const getAllPolls = async (req, res, next) => {
  try {
    const polls = await prisma.poll.findMany();
    res.json({ poll: polls });
  } catch (error) {
    next(createError(500, error.message));
  }
};

module.exports = { createPoll, getAllPolls };
