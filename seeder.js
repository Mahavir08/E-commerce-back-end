const mongoose = require("mongoose");
const connectDatabase = require("./connectDatabase");
const Product = require("./model/products");
const product = require("./data/products.json");

connectDatabase();

const seeder = async () => {
  try {
    await Product.deleteMany();
    console.log("Deleted!");

    await Product.insertMany(product);
    console.log("Inserted!");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

seeder();

module.exports = seeder;
