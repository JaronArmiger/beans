const express = require('express');
const router = express.Router();

const { authCheck } = require('../middlewares/auth');

const {
  createWishlist,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} = require('../controllers/wishlist');

router.get(
  '/user/wishlist',
  authCheck,
  createWishlist,
  getWishlist
);

router.put(
  '/user/wishlist',
  authCheck,
  createWishlist,
  addToWishlist
);

router.delete(
  '/user/wishlist/:productId',
  authCheck,
  createWishlist,
  removeFromWishlist
);

module.exports = router;