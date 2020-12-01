const User = require('../models/user');
const Wishlist = require('../models/wishlist');

exports.createWishlist = async (req, res, next) => {
  try {
    const user = await User
      .findOne({ email: req.user.email })
      .select('wishlist');

    const wishlist = user.wishlist;
    if (wishlist === undefined) {
      const newWishlist = new Wishlist();
      await newWishlist.save();
      user.wishlist = newWishlist;
      await user.save();
      console.log('exec');
    };
    next();
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  };
  // next();
};

exports.getWishlist = async (req, res) => {
  try {
    const user = await User
      .findOne({ email: req.user.email })
      .select('wishlist');
    const wishlist = await Wishlist
      .findById(user.wishlist)
      .populate('wishlist');
    res.json(wishlist);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  };
};

exports.addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    console.log(productId)
    if (productId !== undefined) {
      const user = await User
        .findOne({ email: req.user.email })
        .select('wishlist');
      await Wishlist
        .findByIdAndUpdate(user.wishlist, {
          $addToSet: {
            wishlist: productId,
          }
        });
      res.json({ ok: true });
    } else {
      res.status(400).json({
        err: 'No productId sent',
      });
    };
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  };
};

exports.removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    const user = await User
      .findOne({ email: req.user.email })
      .select('wishlist');
    const wishlist = await Wishlist
      .findByIdAndUpdate(
        user.wishlist,
        {
          $pull: { wishlist: productId },
        }, {
          new: true,
        }
      );

    res.json(wishlist);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  };
};