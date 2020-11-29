const Coupon = require('../models/coupon');

exports.list = async (req, res) => {
  try {
    const coupons = await Coupon
      .find()
      .sort({ createdAt: -1 });
    res.json(coupons);
  } catch (err) {
  	console.log(err);
  	res.status(400).json({
  	  err: err.message,
  	})
  }
};

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    const { name, expiry, discount } = req.body;
    const coupon = new Coupon({
      name,
      expiry,
      discount,
    });
    await coupon.save();
    res.json(coupon);
  } catch (err) {
  	console.log(err);
  	res.status(400).json({
  	  err: err.message,
  	})
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Coupon.findByIdAndDelete(req.params.id);
    res.json(deleted);
  } catch (err) {
  	console.log(err);
  	res.status(400).json({
  	  err: err.message,
  	})
  }
};