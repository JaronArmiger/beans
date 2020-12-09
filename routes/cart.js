const express = require('express');
const router = express.Router();

const {
  read,
  create,
  applyCouponToCart,
  remove,
} = require('../controllers/cart');


router.get('/cart/:cartId', read);
router.post('/cart', create);
router.post('/cart/coupon', applyCouponToCart);
router.delete('/cart/:cartId', remove);

module.exports = router;