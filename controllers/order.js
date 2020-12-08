const Order = require('../models/order');
const Product = require('../models/product');
const Cart = require('../models/cart');
const PaymentDetail = require('../models/paymentDetail');
const { createPaymentPromise } = require('../utils/square');

exports.create = async (req, res) => {
  try {
    const {
      paymentId,
    } = req.body;

    const paymentDetail = await PaymentDetail.findById(paymentId);
    
    console.log('paymentDetail', paymentDetail);

    const {
      nonce,
      idempotency_key,
      locationId,
      cartId,
    } = paymentDetail;

    const cart = await Cart.findById(cartId);
    console.log('cart', cart)

    const {
      cartTotal,
      totalAfterDiscount,
      products,
      userEmail,
    } = cart;

    const chargeAmount = totalAfterDiscount || cartTotal;

    const requestBody = {
      sourceId: nonce,
      amountMoney: {
        amount: chargeAmount * 100,
        currency: 'USD',
      },
      locationId,
      idempotencyKey: idempotency_key
    };

    createPaymentPromise(requestBody)
      .then(async (result) => {
        console.log('______PAYMENT_RESULT______', result);
        const bulkOption = products.map((p) => {
          return {
            updateOne: {
              filter: { _id: p.product.toString()},
              update: {
                sold: true,
                soldDate: new Date(),
              }
            }
          }
        });

        await Product.bulkWrite(bulkOption, {});

        const newOrder = new Order({
          products,
          paid: true,
          userEmail,
        });

        await newOrder.save();
        await PaymentDetail.findByIdAndDelete(paymentDetail._id);

        res.json({ ok: true });
      })
      .catch(async (err) => {
        console.log(err);
        res.status(400).json({
          err: err.message,
        })
      });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    })
  }
};

let testPromise = new Promise(async (resolve, reject) => {
  try {
    const product = await Product.find({title: 'dsfds'});
    resolve(product);
  } catch (err) {
    reject(err);
  }
});

exports.list = async (req, res) => {
  try {
    // const result = await testPromise;
    // res.send(result);
    // testPromise
    //   .then((result) => res.send(result))
    //   .catch(err => res.send(err))
    const result = await testPromise;
    res.send(result);
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