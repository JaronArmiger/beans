const express = require('express');
const router = express.Router();

const env = process.env.NODE_ENV || 'development';

const {
  sendEmailDev,
  sendOrderEmailDev,
} = require('../mailer/devMailer');

const {
  sendEmailProd,
  sendOrderEmailProd,
} = require('../mailer/prodMailer');

router.post('/mail-dev', sendEmailDev);
router.post('/mail-prod', sendEmailProd);
router.post('/mail/order', async (req, res) => {
  const method = env === 'development' ? sendOrderEmailDev : sendOrderEmailProd;
  try {
    method(req, res);
  } catch (err) {
    res.json({ err });
  }
});

module.exports = router;