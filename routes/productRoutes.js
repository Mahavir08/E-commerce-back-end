const express = require('express');
const router = express.Router();
const { getAllProducts, getSingleProduct, addProduct, deleteProduct, updateProduct } = require('../controller/productController');
const {isAuthenticatedUser, authorizeRoles} = require('../utils/isAuthenticated');

router.route('/data').get( getAllProducts);
router.route('/product/:id').get(getSingleProduct);

router.route('/add').post(addProduct);

router.route('/delete/:id').delete(deleteProduct);

router.route('/update/:id').put(updateProduct);

module.exports = router