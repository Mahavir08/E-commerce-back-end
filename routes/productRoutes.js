const express = require('express');
const router = express.Router();
const { getAllProducts, getSingleProduct, addProduct, deleteProduct, updateProduct } = require('../controller/productController');
const {isAuthenticatedUser, authorizeRoles} = require('../utils/isAuthenticated');

router.route('/data').get( getAllProducts);
router.route('/product/:id').get( isAuthenticatedUser, getSingleProduct);

router.route('/add').post(addProduct);

router.route('/delete/:id').delete( authorizeRoles('Admin'),deleteProduct);

router.route('/update/:id').put( authorizeRoles('Admin'), updateProduct);

module.exports = router