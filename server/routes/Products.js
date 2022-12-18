const express = require("express");
const Router = express.Router();
const ProductController = require("../controllers/ProductController");

Router.route("/all").get((req, res, next) => {
  ProductController.showProducts(req, res);
});

Router.route("/").post((req, res, next) => {
  ProductController.inserProduct(req, res);
});

Router.route(`/:user_id`).get((req, res, next) => {
  ProductController.showSingleUserProducts(req, res);
});

module.exports = Router;
