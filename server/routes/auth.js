const express = require('express');
const router = express.Router();

const { createOrUpdateUser } = require('../controllers/auth');

router.post('/create-or-update-user', createOrUpdateUser);

module.exports = router;