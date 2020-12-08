const PaymentDetail = require('../models/PaymentDetail');

exports.confirmPaymentDetails = async (req, res) => {
  try {
    const { squareInfo, cartId } = req.body;
    const { 
      nonce,
      idempotency_key,
      location_id,
    } = squareInfo;

    const newPaymentDetail = new PaymentDetail({
      nonce,
      idempotency_key,
      location_id,
      cartId,
    });

    await newPaymentDetail.save();
    res.json({ 
      ok: true,
      paymentId: newPaymentDetail._id,
    });
  } catch(err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    })
  }
};

// exports.processPayment = async ()