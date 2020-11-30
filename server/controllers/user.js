const User = require('../models/user');
const Cart = require('../models/cart');
const Product = require('../models/product');
const Coupon = require('../models/coupon');
const Order = require('../models/order');

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
	  console.log('cart', cart);

	  for (let i = 0; i < cart.length; i++) {
	    const p = {};
	    const { price } = await Product
	      .findById(cart[i]._id)
	      .select('price');

	    p.product = cart[i]._id;
	    p.count = cart[i].count;
	    p.color = cart[i].color;
	    p.title = cart[i].title;
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

exports.getUserCart = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    const cart = await Cart
      .findOne({ orderedBy: user._id });
    
    if (cart) {
      const { products, cartTotal, totalAfterDiscount } = cart;
      res.json({
        products,
        cartTotal,
        totalAfterDiscount,
      });
    } else {
      res.json({
        products: [],
        cartTotal: 0,
        totalAfterDiscount: 0,
      });
    };
  } catch (err) {
    console.log(err);
    res.status(400).json({
    err: err.message,
    })
  }
};

exports.emptyCart = async (req, res) => {
  try {
    const user = await User
      .findOne({ email: req.user.email });
    const cart = await Cart
      .findOneAndRemove({ orderedBy: user._id });
    res.json({ ok: true });
  } catch (err) {
  	console.log(err);
  	res.status(400).json({
  	  err: err.mesage,
  	});
  }
};

exports.saveAddress = async (req, res) => {
  try {
    const userAddress = await User.findOneAndUpdate(
      { email: req.user.email }, 
      { address: req.body.address }
    );
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
  	res.status(400).json({
  	  err: err.mesage,
  	});
  };
};

exports.applyCouponToUserCart = async (req, res) => {
  try {
    const { coupon } = req.body;
    const validCoupon = await Coupon.findOne({ name: coupon });
    if (validCoupon === null) {
      console.log('no coupon')
      res.status(400).json({
        err: 'Invalid coupon code',
      });
    } else {
      const user = await User
        .findOne({ email: req.user.email })
        .select('_id');
      const cart = await Cart
        .findOne({ orderedBy: user._id });
      const { products, cartTotal } = cart;
      const { discount } = validCoupon;
      const totalAfterDiscount = (cartTotal * (1 - discount / 100))
        .toFixed(2);

      cart.totalAfterDiscount = totalAfterDiscount;
      await cart.save();
      res.json(totalAfterDiscount);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.mesage,
    });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { paymentIntent } = req.body.stripeResponse;
    const user = await User.findOne({ email: req.user.email });
    const { products } = await Cart
      .findOne({ orderedBy: user._id})
      .select('products');
    const newOrder = new Order({
      products,
      paymentIntent,
      orderedBy: user._id,
    });
    await newOrder.save();

    const bulkOption = products.map((p) => {
      return {
        updateOne: {
          filter: { _id: p.product.toString()},
          update: {
            $inc: { 
              quantity: -p.count,
              sold: +p.count,
            },
          }
        }
      }
    });

    await Product.bulkWrite(bulkOption, {});

    res.json({ ok: true });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.mesage,
    });
  }
};

exports.listOrders = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    const userOrders = await Order
      .find({ orderedBy: user._id })
      .populate('products.product');
    res.json(userOrders);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.mesage,
    });
  }
}









