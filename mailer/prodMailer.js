const mailgun = require('mailgun-js');
const DOMAIN = 'mg.pilsenvintagechicago.com';
require('dotenv').config();
const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN });

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
