const Product = require('../model/products');
//const catchAsyncErrors = require('../utils/catchAsyncErrros');
const {search} = require('../utils/search');

exports.getAllProducts = async (req, res) => {      

  const products = await search(Product.find(),req.query);
  res.status(200).json({
    success:true,
    products
  })
  
    // await Product.find()
    //   .then((results) => res.status(200).json({ results }))
    //   .catch((err) => console.log(err));
}


exports.getSingleProduct =  async (req, res) => {

    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      res.send("Product Not Found");
    } else {
      await Product.findById(id)
        .then((result) => res.send(result))
        .catch((err) => console.log(err));
    }
}


exports.addProduct = async (req, res) => {
    const data = req.body;
    await Product.insertMany(data);
    console.log("Added Successfully");
    res.status(200).json({ redirect: "/" });
}


exports.deleteProduct = async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      res.send("Not Found");
    } else {
      await Product.findByIdAndDelete(id);
      res.send("Product Deleted Succesfully");
      console.log("Product Deleted");
    }
}


exports.updateProduct = async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      res.status(404).json({ redirect: "/update" });
    } else {
      await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
      res.status(200).json({ redirect: "/" });
    }
}