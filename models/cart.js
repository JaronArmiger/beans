const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const CartSchema = new mongoose.Schema({
  products: [
    {
      product: {
      	type: ObjectId,
      	ref: 'Product',
      },
      count: Number,
      // color: String,
      // title: String,
      price: Number,
    }
  ],
  cartTotal: Number,
  totalAfterDiscount: Number,
  // orderedBy: { type: ObjectId, ref: 'User' },
  userEmail: String,
}, { timestamps: true });

module.exports = mongoose.model('Cart', CartSchema);