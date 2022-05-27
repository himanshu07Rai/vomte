const jwt = require("jsonwebtoken");
const createError = require("http-errors");

module.exports = async (req, res, next) => {
  try {
    // console.log(req);
    const token = req.header("auth-token");
    // console.log("token4 ", token);

    if (!token) {
      next(createError(403, "No token, authorisation denied"));
    }
    // next(createError(403, "authorisation denied"));
    // console.log("payload");
    const payload = jwt.verify(token, process.env.jwtSecret);
    req.user = payload.user.id;
    // console.log(req.user);
    next();
  } catch (error) {
    next(createError(401, error.message));
  }
};
