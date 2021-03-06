const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const ProductSchema = new mongoose.Schema({
  title: {
  	type: String,
  	trim: true,
  	required: true,
  	maxlength: 32,
  	text: true // to allow searching by title
  },
  slug: {
  	type: String,
  	unique: true,
  	required: true,
  	lowercase: true,
    index: true,
  },
  description: {
  	type: String,
  	required: true,
  	maxlength: 2000,
  	text: true // to allow searching by description
  },
  price: {
  	type: Number,
  	required: true,
  	trim: true,
    maxlength: 32,
  },
  category: {
  	type: ObjectId,
  	ref: 'Category',
  },
  subs: [{
  	type: ObjectId,
  	ref: 'Sub',
  }],
  quantity: {
  	type: Number,
    default: 1,
  },
  sold: {
  	type: Boolean,
  	default: false,
  },
  soldDate: {
    type: Date,
  },
  images: {
  	type: Array,
  },
  shipping: {
  	type: String,
  	enum: ['Yes', 'No'],
  },
  color: {
  	type: String,
  	enum: [
      'Black', 
      'Brown', 
      'Silver', 
      'White',
      'Red',
      'Orange',
      'Yellow',
      'Green',
      'Blue',
      'Purple',
      'Other',
    ],
  },
  designer: {
    type: String,
    enum: ['Yes', 'No'],
  },
  size: {
    type: String,
  },
  pulled: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);