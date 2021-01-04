const mailgun = require('mailgun-js');
const DOMAIN = 'mg.pilsenvintagechicago.com';
require('dotenv').config();
const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN });
const Order = require('../models/order');
const { generateOrderEmailText } = require('../utils/emailGenerator');

exports.sendEmailProd = async (req, res) => {
  const data = {
    from: 'Pilsen Vintage <do-not-reply@pilsenvintagechicago.com>',
    to: 'jaron.armiger@gmail.com',
    subject: 'Hello',
    text: 'Testing some Mailgun awesomness!'
  };
  mg.messages().send(data, (err, body) => {
    console.log(body);
    if (err) res.send({ err });
    res.send({ body });
  });
};

exports.sendOrderEmailProd = async (req, res) => {
  const { orderId } = req.body;
  const order = await Order.findById(orderId);
  console.log('sendOrderEmailProd');
  res.send('prod');
};