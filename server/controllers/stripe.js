const User = require('../models/user');
const Cart = require('../models/cart');
const Product = require('../models/product');
const Coupon = require('../models/coupon');
const stripe = require('stripe')(process.env.STRIPE_API_SECRET);

exports.createPaymentIntent = async (req, res) => {
  // apply coupon
  // calculate price
  try {
    const user = await User.findOne({ email: req.user.email });
    const { cartTotal } = await Cart
      .findOne({ orderedBy: user._id })
      .select('cartTotal');


    const paymentIntent = await stripe.paymentIntents.create({
      amount: cartTotal*100,
      currency: 'usd',
    });

    res.send({
    	clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
};
