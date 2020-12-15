const express = require('express');
const router = express.Router();

const { 
  authCheck, 
  adminCheck
} = require('../middlewares/auth');

// controller
const { 
  read,
  create,
  list,
  remove,
  createStripe,
} = require('../controllers/order');

// routes
router.get(
  '/orders',
  list
);
router.get(
  '/order/:orderId',
  read
);
router.post(
  '/order',
  create
);

router.post(
  '/order-stripe',
  createStripe
);

router.delete(
  '/order/:orderId',
  authCheck,
  adminCheck,
  remove
);

module.exports = router;