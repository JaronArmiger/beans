const express = require('express');
const router = express.Router();

const { authCheck } = require('../middlewares/auth');
const { 
  userCart,
  getUserCart,
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

module.exports = router;