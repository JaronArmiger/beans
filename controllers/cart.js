const Cart = require('../models/cart');
const Product = require('../models/product');
const Coupon = require('../models/coupon');

exports.read = async (req, res) => {
  try {
    const { cartId } = req.params;
    const cart = await Cart
      .findById(cartId);
    cart.totalAfterDiscount = null;
    await cart.save();
    const cartToSend = await Cart
      .findById(cartId)
      .populate('products.product');
    res.json(cartToSend);
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({
        err: err.message,
      });
  }
};

exports.create = async (req, res) => {
  try {
    const { cart, cartId, userEmail } = req.body;
    
    if (cartId) {
      const existingCart = await Cart.findById(cartId);
      if (existingCart) {
        await existingCart.remove();
        console.log('removed old cart by id');
      }
    }

    if (userEmail) {
      const existingCart = await Cart.find({ userEmail });
      if (existingCart.length > 0) {
        await existingCart[0].remove();
        console.log('removed old cart by email');
      }
    }

    const products = [];

    for (let i = 0; i < cart.length; i++) {
      const p = {};
      const { price, shipping, sold } = await Product
        .findById(cart[i]._id)
        .select('price shipping sold');

      p.product = cart[i]._id;
      p.count = cart[i].count;
      // p.color = cart[i].color;
      // p.title = cart[i].title;
      p.price = price;
      p.shipping = shipping;
      p.sold = sold;
      
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

exports.remove = async (req, res) => {
  try {
    console.log('_______REMOVE_______');
    const { cartId } = req.params;
    console.log(cartId);
    const deleted = await Cart.findByIdAndDelete(cartId);
    res.json({
      ok: true,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.mesage,
    });
  }
};

exports.applyCouponToCart = async (req, res) => {
  try {
    const { 
      coupon,
      cartId,
    } = req.body;
    const validCoupon = await Coupon.findOne({ name: coupon });
    if (validCoupon === null) {
      console.log('no coupon')
      res.status(400).json({
        err: 'Invalid coupon code (no discount applied)',
      });
    } else {
      const { expiry } = validCoupon;
      if (expiry < Date.now()) {
        console.log('coupon expired');
        return res.status(400).json({
          err: 'Coupon expired (no discount applied)',
        });
      }
      const cart = await Cart.findById(cartId);
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















