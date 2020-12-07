const express = require('express');
const router = express.Router();

const {
  read,
  create,
} = require('../controllers/cart');


router.get('/cart', read);
router.post('/cart', create);

module.exports = router;