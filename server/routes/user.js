const express = require('express');
const router = express.Router();

const { authCheck } = require('../middlewares/auth');
const { 
  userCart,
  getUserCart,
  emptyCart,
  saveAddress,
  applyCouponToUserCart,
  createOrder,
  listOrders,
  getWishlist
  addToWishlist,
  removeFromWishlist,
} = require('../controllers/user');

// router.get('/user', (req, res) => {
//   res.json({
//   	data: 'user api',
//   });
// });

// save cart
router.post('/user/cart', authCheck, userCart);
// get cart
router.get('/user/cart', authCheck, getUserCart);
router.delete('/user/cart', authCheck, emptyCart);

router.post('/user/cart/coupon', authCheck, applyCouponToUserCart);

router.post('/user/address', authCheck, saveAddress);

router.get(
  '/user/orders',
  authCheck,
  listOrders
);

router.post(
  '/user/order',
  authCheck,
  createOrder
);

router.get(
  '/user/wishlist',
  authCheck,
  getWishlist
);

router.put(
  '/user/wishlist',
  authCheck,
  addToWishlist
);

router.delete(
  '/user/wishlist/:productId',
  authCheck,
  removeFromWishlist
);


module.exports = router;