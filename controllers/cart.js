const Cart = require('../models/cart');
const Product = require('../models/product');

exports.read = async (req, res) => {
  
};

exports.create = async (req, res) => {
  try {
    const { cart, cartId } = req.body;
    
    if (cartId) {
      const existingCart = await Card.findById(cartId);
      if (existingCart) {
        existingCart.remove();
        console.log('removed old cart');
      }
    }
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({
        err: err.message,
      });
  }
};