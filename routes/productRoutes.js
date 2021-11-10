const express = require('express');
const router = express.Router();
const { getAllProducts, getSingleProduct, addProduct, deleteProduct, updateProduct } = require('../controller/productController');
const {isAuthenticatedUser, authorizeRoles} = require('../utils/isAuthenticated');

router.route('/data').get( isAuthenticatedUser, getAllProducts);
router.route('/product/:id').get( isAuthenticatedUser, getSingleProduct);

router.route('/add').post(isAuthenticatedUser, authorizeRoles('Admin'), addProduct);

router.route('/delete/:id').delete(isAuthenticatedUser, authorizeRoles('Admin'),deleteProduct);

router.route('/update/:id').put(isAuthenticatedUser, authorizeRoles('Admin'), updateProduct);

module.exports = router