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
  listRelated,
  searchFilters,
  getProductsToPull,
  markProductAsPulled,
} = require('../controllers/product');

// routes
router.get(
  '/products/total',
  count
);

router.get(
  '/products/to-pull',
  getProductsToPull
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
  '/product/pull/:productId',
  authCheck,
  adminCheck,
  markProductAsPulled,
);

router.put(
  '/product/:slug',
  authCheck,
  adminCheck,
  update
);

router.get(
  '/product/related/:id',
  listRelated
);

// this is a post request because it's easier
// to send args in req body
router.post(
  '/products',
  list
);

// star rating
router.put(
  '/product/star/:id',
  authCheck,
  leaveRating,
);

// search
router.post(
  '/search/filters',
  searchFilters
);


module.exports = router;