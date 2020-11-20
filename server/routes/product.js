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
  listAll,
  remove,
  update,
  list,
  count,
  leaveRating,
} = require('../controllers/product');

// routes
router.get(
  '/products/total',
  count
);
router.get(
  '/products/:count',
  listAll
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
router.put(
  '/product/:slug',
  authCheck,
  adminCheck,
  update
);

// this is a post request because it's easier
// to send args in req body
router.post(
  '/products',
  list
);

// star rating
router.put('/product/star/:id',
  authCheck,
  leaveRating,
);


module.exports = router;