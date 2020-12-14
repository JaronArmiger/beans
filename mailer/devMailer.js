const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "b89182b01bcce8",
    pass: "ee4c9df4bb785a"
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
