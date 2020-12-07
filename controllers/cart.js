const Cart = require('../models/cart');
const Product = require('../models/product');

exports.read = async (req, res) => {
  
};

exports.create = async (req, res) => {
  try {
    const { cart, cartId, userEmail } = req.body;
    
    if (cartId) {
      const existingCart = await Cart.findById(cartId);
      if (existingCart) {
        existingCart.remove();
        console.log('removed old cart');
      }
    }

    const products = [];

    for (let i = 0; i < cart.length; i++) {
      const p = {};
      const { price } = await Product
        .findById(cart[i]._id)
        .select('price');

      p.productId = cart[i]._id;
      p.count = cart[i].count;
      // p.color = cart[i].color;
      // p.title = cart[i].title;
      p.price = price;
      
      products.push(p);
    };


    const cartTotal = products.reduce((acc, p) => {
        return acc + (p.price * p.count);
    }, 0);

    console.log('products', products);
    console.log('cartTotal', cartTotal);

    const newCart = new Cart({
      products,
      cartTotal,
      userEmail,
    });

    await newCart.save();
    console.log(newCart);

    res.json({ cartId: newCart._id });
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({
        err: err.message,
      });
  }
};