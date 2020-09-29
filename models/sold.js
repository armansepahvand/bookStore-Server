const Joi = require("joi");
const mongoose = require("mongoose");

const Sold = mongoose.model(
  "Sold",
  new mongoose.Schema({
    customer: {
      type: new mongoose.Schema({
        name: {
          type: String,
          required: true,
          minlength: 5,
          maxlength: 50,
        },
        email: {
          type: String,
          minlength: 5,
          maxlength: 250,
        },
        phone: {
          type: String,
          required: true,
          minlength: 5,
          maxlength: 50,
        },
      }),
      required: true,
    },
    book: {
      type: new mongoose.Schema({
        title: {
          type: String,
          required: true,
          trim: true,
          minlength: 5,
          maxlength: 255,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
          max: 255,
        },
      }),
      required: true,
    },
    dateSold: {
      type: Date,
      required: true,
      default: Date.now,
    },
  })
);

function validateSold(sold) {
  const schema = {
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  };

  return Joi.validate(sold, schema);
}

exports.Sold = Sold;
exports.validate = validateSold;
