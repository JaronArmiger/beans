const express = require('express');
const router = express.Router();

const { 
  authCheck,
  adminCheck,
} = require('../middlewares/auth');

const {
  listOrders,
  updateOrderStatus,
} = require('../controllers/admin');

router.get(
  '/admin/orders',
  authCheck,
  adminCheck,
  listOrders,
);

router.get(
  '/admin/order-status',
  authCheck,
  adminCheck,
  updateOrderStatus,
);

module.exports = router;