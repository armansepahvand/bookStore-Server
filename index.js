const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const books = require("./routes/books");
const solds = require("./routes/solds");
const users = require("./routes/users");
const express = require("express");
const app = express();

mongoose
  .connect("mongodb://localhost/bookstore")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/books", books);
app.use("/api/solds", solds);
app.use("/api/users", users);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
