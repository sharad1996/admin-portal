const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const users = require("./server/routes/Users");
const products = require("./server/routes/Products");
app.use("/", users);
app.use("/products", products);
app.listen(4000);
