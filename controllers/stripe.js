const Cart = require('../models/cart');
const stripe = require('stripe')(process.env.STRIPE_API_SECRET);
const { checkNoneSold } = require('../utils/cart');

exports.createPaymentIntent = async (req, res) => {
  // apply coupon
  // calculate price
  try {
    const { cartId, shipping } = req.body;
    const { cartTotal, totalAfterDiscount, products } = await Cart
      .findById(cartId)
      .select('cartTotal totalAfterDiscount products');
    
    const noneSold = await checkNoneSold(products);
    console.log('_________noneSold_______', noneSold);

    if (!noneSold) {
      return res.send({
        noneSoldBackend: noneSold,
        clientSecret: null,
        chargeAmount: null,
      });
    };

    let chargeAmount = totalAfterDiscount ? totalAfterDiscount : cartTotal;
    if (shipping) chargeAmount += 8;
    const taxAmount = Math.round(chargeAmount * 1025 / 10000 * 100) / 100;
    chargeAmount += taxAmount;
    console.log('________chargeAmount______', chargeAmount);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: chargeAmount * 100,
      currency: 'usd',
    });

    res.send({
      noneSoldBackend: noneSold,
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
