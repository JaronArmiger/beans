const express = require('express');
const router = express.Router();

// controller
const { 
  create,
  list,
  remove,
} = require('../controllers/order');

// routes
router.get(
  '/orders',
  list
);
router.post(
  '/order',
  create
);
router.delete(
  '/order/:orderId',
  authCheck,
  adminCheck,
  remove
);

module.exports = router;