const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productModel = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
  price: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
});

const model = mongoose.model("Product", productModel);

module.exports = model;
