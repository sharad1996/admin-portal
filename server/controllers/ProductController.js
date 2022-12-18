const mongodb = require("../configs/dbConfig");
const Product = require("../modals/Product");
const { v4: uuidv4 } = require("uuid");

const ProductController = {
  showProducts: async (req, res) => {
    Product.find({})
      .then((data) => {
        return res.json({ products: data });
      })
      .catch((e) => {
        return res.json({
          message: "No products found!",
        });
      });
  },
  inserProduct: async (req, res) => {
    const newId = uuidv4();
    let productObj = {
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      desc: req.body.desc,
      user_id: req.body.user_id,
      id: newId,
    };
    Product.create(productObj)
      .then((data) => {
        return res.json(data);
      })
      .catch((e) => {
        return res.json({
          message: e.message,
        });
      });
  },
  showSingleUserProducts: async (req, res) => {
    Product.find({ user_id: req.params.user_id })
      .then((data) => {
        return res.json({ products: data });
      })
      .catch((e) => {
        return res.json({
          message: "No products found for this user.",
        });
      });
  },
};
module.exports = ProductController;
