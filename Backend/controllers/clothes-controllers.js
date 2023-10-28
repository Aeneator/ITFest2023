const Cloth = require("../models/cloth");
const HttpError = require("../models/http-error");

exports.getClothes = async (req, res, next) => {
  const { category, gender } = req.query;
};
