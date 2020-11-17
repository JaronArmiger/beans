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
  list,
  remove,
} = require('../controllers/product');

// routes
router.get(
  '/products/:count',
  list
);
router.post(
  '/product',
  authCheck,
  adminCheck,
  create
);
router.delete(
  '/product/:slug',
  authCheck,
  adminCheck,
  remove
);


module.exports = router;