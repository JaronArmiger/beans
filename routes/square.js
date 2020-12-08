const express = require('express');
const router = express.Router();

const { 
  confirmPaymentDetails,
} = require('../controllers/square');

router.post('/confirm-payment-details', confirmPaymentDetails);

module.exports = router;