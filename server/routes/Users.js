const express = require("express");
const Router = express.Router();
const UserController = require("../controllers/UserController");

Router.route("/users").get((req, res, next) => {
  UserController.showUser(req, res);
});

Router.route("/auth/signup").post((req, res, next) => {
  UserController.insertUser(req, res);
});

Router.route("/auth/login").post((req, res, next) => {
  UserController.login(req, res);
});

Router.route(`/auth/:token`).get((req, res, next) => {
  UserController.getUserByEmail(req, res);
});

module.exports = Router;
