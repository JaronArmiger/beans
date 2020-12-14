const express = require('express');
const router = express.Router();

const {
  sendEmailDev,
} = require('../mailer/devMailer');

const {
  sendEmail,
} = require('../mailer/prodMailer');

router.post('/mail-dev', sendEmailDev);

module.exports = router;