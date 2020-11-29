const express = require('express');
const router = express.Router();

// middlewares
const { 
  authCheck, 
  adminCheck
} = require('../middlewares/auth');

// controller
const { 
  create,
  remove,
  list,
} = require('../controllers/coupon');

// routes
router.get(
  '/coupons',
  list
);
router.post(
  '/coupon',
  authCheck,
  adminCheck,
  create
);
router.delete(
  '/coupon/:id',
  authCheck,
  adminCheck,
  remove
);

module.exports = router;