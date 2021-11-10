const express = require('express');
const router = express.Router();
const {processPayment, sendAPIKey} = require('../controller/paymentController');
const {isAuthenticatedUser} = require('../utils/isAuthenticated');

router.route('/payment/process').post(isAuthenticatedUser, processPayment);
router.route('/stripeapi').get(isAuthenticatedUser, sendAPIKey);

module.exports = router;
