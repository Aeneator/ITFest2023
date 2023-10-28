const express = require("express");
const { body, query } = require("express-validator");

const {
  createUser,
  authenticate,
} = require("../controllers/users-controllers");
const checkAuth = require("../middlewares/check-auth");

const router = express.Router();

router.post(
  "/",
  body("email").normalizeEmail().isEmail().withMessage("Email is not valid"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("A password is required")
    .escape(),
  createUser
);

router.post(
  "/authenticate",
  body("email").trim().notEmpty().withMessage("An email is required").escape(),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("A password is required")
    .escape(),
  authenticate
);

router.use(checkAuth);

//router.get("/", query("username").trim().escape(), getUsers);

module.exports = router;
