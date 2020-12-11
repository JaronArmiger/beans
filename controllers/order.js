const Order = require('../models/order');
const Product = require('../models/product');
const Cart = require('../models/cart');
const PaymentDetail = require('../models/paymentDetail');
const { createPaymentPromise } = require('../utils/square');

exports.read = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order
      .findById(orderId)
      .populate('products.product', 'title images')
      .populate('userAddress');
    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    })
  }
};

exports.create = async (req, res) => {
  try {
    const {
      paymentId,
      addressId,
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
      .then(async (paymentResult) => {
        console.log('______PAYMENT_RESULT______', paymentResult);
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
          userAddress: addressId,
          chargeAmount,
          paymentResult,
        });

        await newOrder.save();
        await PaymentDetail.findByIdAndDelete(paymentDetail._id);

        res.json({ 
          ok: true,
          orderId: newOrder._id,
        });
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

exports.list = async (req, res) => {
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