const mongodb = require("../configs/dbConfig");
const User = require("../modals/User");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const jwtKey = "my_secret_key";
const jwtExpirySeconds = 300;

const UserController = {
  insertUser: async (req, res) => {
    const newId = uuidv4();
    let userObj = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      isAdmin: req.body.isAdmin,
      id: newId,
    };
    User.create(userObj)
      .then((data) => {
        return res.json(data);
      })
      .catch((e) => {
        return res.json({
          message: e.message,
        });
      });
  },
  showUser: async (req, res) => {
    const data = await User.find(
      { isAdmin: false },
      { __v: 0, _id: 0, password: 0 }
    );
    return res.json({
      users: data,
    });
  },
  login: async (req, res) => {
    const { email, password } = req.body;

    User.findOne(
      {
        email: email,
      },
      function (err, user) {
        if (err) throw err;
        if (!user || user.comparePassword(password, user.password)) {
          return res.status(401).json({
            message: "Authentication failed. Invalid user or password.",
          });
        }
        const token = jwt.sign(
          {
            email: user.email,
            name: user.name,
            id: user.id,
            isAdmin: user.isAdmin,
          },
          jwtKey,
          {
            expiresIn: jwtExpirySeconds,
          }
        );

        return res.json({
          token: token,
        });
      }
    );
  },
  getUserByEmail: async (req, res) => {
    const token = req.params.token;
    // if the cookie is not set, return an unauthorized error
    if (!token) {
      return res.status(401).end();
    }

    try {
      jwt.verify(token, jwtKey, function (err, decoded) {
        if (err) {
          return res.json({ message: "Authentication failed" });
        } else {
          return res.json(decoded);
        }
      });
    } catch (e) {
      if (e instanceof jwt.JsonWebTokenError) {
        // if the error thrown is because the JWT is unauthorized, return a 401 error
        return res.status(401).end();
      }
      // otherwise, return a bad request error
      return res.status(400).end();
    }
  },
};

module.exports = UserController;
