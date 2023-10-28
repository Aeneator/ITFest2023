const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const clothSchema = new Schema({
  denumire: {
    type: String,
    rerquired: true,
  },
  categorie: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
  marime: {
    type: String,
    required: true,
  },
  copii: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model("Cloth", clothSchema);
