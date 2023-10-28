const Cloth = require("../models/cloth");
const HttpError = require("../models/http-error");

exports.getClothesByCategory = async (req, res, next) => {
  const { category } = req.query;
  try {
    const clothes = await Cloth.find(category ? { category } : {})
      .limit(50)
      .exec();

    res.json({
      clothes: clothes.map((cloth) => cloth.toObject({ getters: true })),
    });
  } catch (error) {
    next(error);
  }
};
