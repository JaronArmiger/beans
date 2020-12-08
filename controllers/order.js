const Order = require('../models/order');
const PaymentDetail = require('../models/paymentDetail');

exports.list = async (req, res) => {
  try {
    
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    })
  }
};

exports.create = async (req, res) => {
  try {
    
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    })
  }
};

exports.remove = async (req, res) => {
  try {

  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    })
  }
};