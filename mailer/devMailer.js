const nodemailer = require('nodemailer');
require('dotenv').config();
const Order = require('../models/order');

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.NODEMAILER_USERNAME,
    pass: process.env.NODEMAILER_PASSWORD,
  }
});

exports.sendEmailDev = async (req, res) => {
  const { mailObj } = req.body;

  const {
    fromAddress,
    toAddress,
    subject,
    text
  } = mailObj;

  const message = {
    from: fromAddress,
    to: toAddress,
    subject,
    text,
  };

  transport.sendMail(message, (err, info) => {
    if (err) {
      res.status(400).json({
        err: err.message,
      });
    };
    res.json(info);
  });
};

exports.sendOrderEmailDev = async (req, res) => {
  const { orderId } = req.body;
  const order = await Order.findById(orderId);
  console.log('sendOrderEmailDev');
  res.send('dev');
}
