const bcrypt = require("bcryptjs");
const createError = require("http-errors");
const jwtGenrator = require("../utils/jwtGenerator");
// const CryptoJS = require("crypto-js");
const sendEmail = require("../utils/sendMail");
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

    console.log(req);

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
        verified: false,
      },
    });

    let verifyingtoken = await prisma.token.create({
      data: {
        user_id: newUser.user_id,
        // token: CryptoJS.AES.encrypt("my message", "secret key 123").toString(),
        token: Math.random().toString(36).slice(2),
      },
    });

    const message = `http://localhost:5000/api/auth/verify/${newUser.user_id}/${verifyingtoken.token}`;
    await sendEmail(newUser.user_email, "Verify Email", message);

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

const verifyEmail = async (req, res) => {
  // console.log(req.params);
  try {
    const user = await prisma.user.findUnique({
      where: {
        user_id: req.params.id,
      },
    });

    // console.log(user);
    if (!user) return res.status(400).send("Invalid link");

    const token = await prisma.token.findUnique({
      where: {
        user_id: req.params.id,
      },
    });

    // console.log(token);
    if (!token) return res.status(400).send("Invalid link");

    await prisma.user.update({
      where: {
        user_id: user.user_id,
      },
      data: {
        verified: true,
      },
    });
    await prisma.token.delete({
      where: {
        user_id: token.user_id,
      },
    });

    res.send("email verified sucessfully");
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};
module.exports = { getUser, register, login, verifyEmail };
