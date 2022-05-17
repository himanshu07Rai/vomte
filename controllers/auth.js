const bcrypt = require("bcryptjs");
const createError = require("http-errors");
const jwtGenrator = require("../utils/jwtGenerator");

const prisma = require("../prisma/client");

const getUser = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        user_id: req.user,
      },
      select: {
        user_id: true,
        user_name: true,
        user_email: true,
      },
    });

    res.json(user);
  } catch (err) {
    next(createError(500, "Sever Error"));
  }
};

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        user_email: email,
      },
    });

    if (user) {
      next(createError("This user already exists ! Try logging in"));
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);
    const newUser = await prisma.user.create({
      data: {
        user_name: name,
        user_email: email,
        user_password: bcryptPassword,
      },
    });

    const token = jwtGenrator(newUser.user_id);
    res.json(token);
  } catch (error) {
    console.log("error.message", error.message);
    next(createError(500, "Server Error"));
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    const user = await prisma.user.findUnique({
      where: {
        user_email: email,
      },
    });
    console.log("user");

    if (!user) {
      next(createError(401, "Invalid Credentials"));
    }

    const isValid = await bcrypt.compare(password, user.user_password);

    if (!isValid) {
      next(createError(401, "Invalid Password"));
    } else {
      const token = jwtGenrator(user.user_id);
      res.json(token);
    }
  } catch (error) {
    next(createError(500, error.message));
  }
};
module.exports = { getUser, register, login };
