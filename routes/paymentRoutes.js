const express = require('express');
const router = express.Router();
const {processPayment, sendAPIKey} = require('../controller/paymentController');
const {isAuthenticatedUser} = require('../utils/isAuthenticated');

router.route('/payment/process').post(processPayment);
router.route('/stripeapi').get(sendAPIKey);

module.exports = router;
