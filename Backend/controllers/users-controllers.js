const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const HttpError = require("../models/http-error");

exports.createUser = async (req, res, next) => {
  const { email, password } = req.body;
  const result = validationResult(req);

  try {
    if (!result.isEmpty()) {
      throw new HttpError(result.array({ onlyFirstError: true })[0].msg, 400);
    }

    const alreadyExistingUser = await User.findOne({
      email,
    }).exec();
    if (alreadyExistingUser) {
      throw new HttpError("Already existing user", 409);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const createdUser = new User({
      username,
      password: hashedPassword,
    });

    await createdUser.save();

    const token = jwt.sign(
      { user: { id: createdUser.id, username } },
      "super_secret_don't_share",
      {
        expiresIn: "1h",
      }
    );

    res.status(201).json({
      token,
      user: { id: createdUser.id, email },
    });
  } catch (error) {
    next(error);
  }
};

exports.authenticate = async (req, res, next) => {
  const result = validationResult(req);

  const { username, password, pushToken } = req.body;

  try {
    if (!result.isEmpty()) {
      throw new HttpError(result.array({ onlyFirstError: true })[0].msg, 400);
    }

    const existingUser = await User.findOne({
      email,
    }).exec();

    if (!existingUser) {
      throw new HttpError("Invalid credentials", 401);
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      throw new HttpError("Invalid credentials", 401);
    }

    existingUser.pushToken = pushToken;
    await existingUser.save();

    const token = jwt.sign(
      { user: { id: existingUser.id, email } },
      "super_secret_don't_share",
      {
        expiresIn: "1h",
      }
    );

    res.status(201).json({ token, user: { id: existingUser.id, email } });
  } catch (error) {
    next(error);
  }
};

/* exports.getUsers = async (req, res, next) => {
  const { username } = req.query;

  try {
    const users = await User.find(
      {
        _id: { $ne: req.userId },
        username: { $regex: new RegExp(`^${username}`), $options: "i" },
      },
      "username"
    ).exec();

    res.json({ users: users.map((user) => user.toObject({ getters: true })) });
  } catch (error) {
    next(error);
  }
}; */
