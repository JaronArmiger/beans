const express = require('express');
const router = express.Router();

const {
  sendEmailDev,
} = require('../mailer/devMailer');

const {
  sendEmailProd,
} = require('../mailer/prodMailer');

router.post('/mail-dev', sendEmailDev);
router.post('/mail-prod', sendEmailProd);

module.exports = router;