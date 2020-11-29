const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const CouponSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
    uppercase: true,
    required: 'Name is required',
    minlength: [6, 'Name must be 6-12 chars'],
    maxlength: [12, 'Name must be 6-12 chars']
  },
  expiry: {
    type: Date,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Coupon', CouponSchema);