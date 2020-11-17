const Product = require('../models/product');
const slugify = require('slugify');

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    req.body.slug = slugify(req.body.title);
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (err) {
  	console.log(err);
  	// res.status(400).send({ err });
  	console.log('PRODUCT CREATE ERR: ', err);
  	res.status(400).json({
  	  err: err.message,
  	})
  }
};

exports.list = async (req, res) => {
  try {
    const products = await Product.find({})
      .limit(parseInt(req.params.count))
      .populate('category')
      .populate('subs')
      .sort([['createdAt', 'desc']]);

    res.json(products);
  } catch (err) {
    console.log(err);
  }
}