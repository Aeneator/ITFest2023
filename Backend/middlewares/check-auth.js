const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw Error();
    }
    const { user } = jwt.verify(token, "super_secret_don't_share");
    req.userId = user.id;
    next();
  } catch (err) {
    const error = new HttpError("Autorization failed", 401);
    next(error);
  }
};
