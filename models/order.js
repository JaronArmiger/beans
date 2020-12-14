const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const OrderSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: ObjectId,
        ref: 'Product',
      },
      count: Number,
      price: Number,
    },
  ],
  paid: {
    type: Boolean,
    default: false,
  },
  orderStatus: {
    type: String,
    default: 'Not Processed',
    enum: [
      'Not Processed',
      'Processing',
      'Dispatched',
      'Canceled',
      'Completed',
    ],
  },
  userEmail: { 
    type: String, 
    required: true 
  },
  userAddress: {
    type: ObjectId,
    ref: 'Address',
  },
  cashOnDelivery: { type: Boolean, default: false },
  chargeAmount: Number,
  shipping: {
    type: Boolean,
    default: false,
  },
  paymentResult: {},
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);