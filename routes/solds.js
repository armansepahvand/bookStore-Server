const { Sold, validate } = require("../models/sold");
const { Book } = require("../models/book");
const { Customer } = require("../models/customer");
const mongoose = require("mongoose");
const Fawn = require("fawn");
const express = require("express");
const router = express.Router();

Fawn.init(mongoose);

router.get("/", async (req, res) => {
  const solds = await Sold.find().sort("-dateOut");
  res.send(solds);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid customer.");

  const book = await Book.findById(req.body.bookId);
  if (!book) return res.status(400).send("Invalid movie.");

  if (book.numberInStock === 0)
    return res.status(400).send("Movie not in stock.");

  let sold = new Sold({
    customer: {
      _id: customer._id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      price: movie.price,
    },
  });

  try {
    new Fawn.Task()
      .save("solds", sold)
      .update(
        "books",
        { _id: book._id },
        {
          $inc: { numberInStock: -1 },
        }
      )
      .run();

    res.send(sold);
  } catch (ex) {
    res.status(500).send("Something failed.");
  }
});

router.get("/:id", async (req, res) => {
  const sold = await Sold.findById(req.params.id);

  if (!sold)
    return res
      .status(404)
      .send("The sold book with the given ID was not found.");

  res.send(sold);
});

module.exports = router;
