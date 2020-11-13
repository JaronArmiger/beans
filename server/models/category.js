const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Name is required',
    minlength: [3, 'Name must be at least 3 characters'],
    maxlength: [32, 'Name cannot be more than 32 characters'],
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    index: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Category', CategorySchema);