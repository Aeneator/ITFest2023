const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const clothSchema = new Schema({
  imageName:{
    type: String,
    required: true,
    default: "",
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  kids: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model("Cloth", clothSchema);
