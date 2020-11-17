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
  read,
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
router.get(
  '/product/:slug',
  read
);


module.exports = router;