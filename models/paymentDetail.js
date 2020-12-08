const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const PaymentDetailSchema = new mongoose.Schema({
  nonce: {
    type: String,
    required: true,
  },
  idempotency_key: {
    type: String,
    required: true,
  },
  location_id: {
    type: String,
    required: true,
  },
  cartId: {
    type: ObjectId,
    ref: 'Product',
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('PaymentDetail', PaymentDetailSchema);