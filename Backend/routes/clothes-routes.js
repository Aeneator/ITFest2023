const express = require("express");
//const { body, query } = require("express-validator");

/* const {
  createUser,
  authenticate,
} = require("../controllers/users-controllers"); */
//const checkAuth = require("../middlewares/check-auth");

const router = express.Router();

router.get("/");

//router.use(checkAuth);

//router.get("/", query("username").trim().escape(), getUsers);

module.exports = router;
