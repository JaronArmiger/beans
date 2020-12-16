const Cart = require('../models/cart');
const stripe = require('stripe')(process.env.STRIPE_API_SECRET);

exports.createPaymentIntent = async (req, res) => {
  // apply coupon
  // calculate price
  try {
    const { cartId, shipping } = req.body;
    const { cartTotal, totalAfterDiscount } = await Cart
      .findById(cartId)
      .select('cartTotal totalAfterDiscount');

    let chargeAmount = totalAfterDiscount ? totalAfterDiscount : cartTotal;
    if (shipping) chargeAmount += 8;
    console.log('chargeAmount', chargeAmount);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: chargeAmount * 100,
      currency: 'usd',
    });

    res.send({
    	clientSecret: paymentIntent.client_secret,
      chargeAmount,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
};
