const Order = require('../models/order');
const Product = require('../models/product');
const Address = require('../models/address');
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
      shipping,
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

    let chargeAmount = totalAfterDiscount || cartTotal;
    if (shipping) chargeAmount += 8;

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
          userAddress: addressId || null,
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
    });
  }
};

exports.createStripe = async (req, res) => {
  try {
    const {
      cartId,
      addressId,
      paymentIntent,
      shipping,
    } = req.body;
  
    const cart = await Cart.findById(cartId);
    console.log('cart', cart);

    const {
      products,
      userEmail,
    } = cart;

    let chargeAmount = paymentIntent.amount / 100;
    console.log("chargeAmount", chargeAmount);

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
      shipping,
      paid: true,
      userEmail,
      userAddress: addressId || null,
      chargeAmount,
      paymentResult: paymentIntent,
    });

    await newOrder.save();

    res.json({ 
      ok: true,
      orderId: newOrder._id,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
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
    const {
      orderId,
    } = req.params;


    const { userAddress } = await Order.findByIdAndDelete(orderId);
    if (userAddress) await Address.findByIdAndDelete(userAddress);
    res.send({
      ok: true,
    })
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    })
  }
};