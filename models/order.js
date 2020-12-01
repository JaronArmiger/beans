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
      color: String,
      title: String,
      price: Number,
    },
  ],
  paymentIntent: {},
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
  orderedBy: { type: ObjectId, ref: 'User' },
  cashOnDelivery: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);