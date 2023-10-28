const Cloth = require("../models/cloth");
const HttpError = require("../models/http-error");

exports.getClothes = async (req, res, next) => {
  try {
    const { category, gender } = req.query;

    const clothes = await Cloth.find({ category, gender }).exec();

    res.json({
      clothes: clothes.map((cloth) => cloth.toObject({ getters: true })),
    });
  } catch (error) {
    next(error);
  }
};
