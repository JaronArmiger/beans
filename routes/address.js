const express = require('express');
const router = express.Router();

const {
  create,
} = require('../controllers/address');

router.post('/address', create);

module.exports = router;