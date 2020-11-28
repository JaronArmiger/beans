const User = require('../models/user');
const Cart = require('../models/cart');
const Product = require('../models/product');

exports.userCart = async (req, res) => {
	try {
	  const { cart } = req.body;

	  const user = await User.findOne({ email: req.user.email });

	  const existingCart = await Cart.findOne({ orderedBy: user._id });

	  if (existingCart) {
	  	existingCart.remove();
	  	console.log('removed old cart');
	  }

	  const products = [];

	  for (let i = 0; i < cart.length; i++) {
	    const p = {};
	    const { price } = await Product
	      .findById(cart[i]._id)
	      .select('price');

	    p.product = cart[i]._id;
	    p.count = cart[i].count;
	    p.color = cart[i].color;
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
	  	orderedBy: user._id,
	  });

	  await newCart.save();
	  console.log(newCart);

	  res.json({ ok: true });
	} catch (err) {
	  res.status(400).json({
        err: err.message,
      });
	  console.log(err);
	}
};