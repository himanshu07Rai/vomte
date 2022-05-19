const prisma = require("../prisma/client");
const createError = require("http-errors");

const createPoll = async (req, res, next) => {
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
};

module.exports = { createPoll };
