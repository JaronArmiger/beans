const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const WishlistSchema = new mongoose.Schema({
  wishlist: [{ type: ObjectId, ref: 'Product' }],
}, { timestamps: true });

module.exports = mongoose.model('Wishlist', WishlistSchema);