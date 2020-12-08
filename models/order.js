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
  cashOnDelivery: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);