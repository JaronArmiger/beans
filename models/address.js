const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  streetAddress: {
    type: String,
    required: true,
    maxLength: [50, 'Max length is 50 chars'],
  },
  apartment: {
    type: String,
    maxLength: [50, 'Max length is 50 chars'],
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zip: {
    type: Number,
    required: true,
    min: 00000,
    max: 99999,
  },
  phoneNumber: {
    type: Number,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Address', AddressSchema);