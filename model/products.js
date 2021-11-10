const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter a Product name"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter a Product Price"],
  },
  image: {
    type: String,
    required: [true, "Please Add an Product Image"],
  },
  description: {
    type: String,
    required: [true, "Product must have a description"],
  },
  stock: {
    type: Number,
    required: [true, "Please Enter a stock number"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
