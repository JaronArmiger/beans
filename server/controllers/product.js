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

exports.listAll = async (req, res) => {
  try {
    const products = await Product.find({})
      .limit(parseInt(req.params.count))
      .populate('category')
      .populate('subs')
      .sort([['createdAt', 'desc']]);

    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
}

exports.list = async (req, res) => {
  try {
    // ex:
    // sort: 'createdAt'
    // order: 'desc'
    // limit: 15
    const {
      sort,
      order,
      limit,
    } = req.body;

    const products = await Product.find({})
      .populate('category')
      .populate('subs')
      .sort([[sort, order]])
      .limit(limit);
    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
}

exports.read = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .populate('category')
      .populate('subs')
    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
}

exports.remove = async (req, res) => {
  try {
    const { slug } = req.params;
    const deleted = await Product.findOneAndRemove({ slug });
    res.json(deleted);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    })
  }
}

exports.update = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updated = await Product
      .findOneAndUpdate({ slug: req.params.slug, }, 
        req.body,
        { new: true }
      );
    res.json(updated);
  } catch (err) {
    console.log(err);
    // res.status(400).send({ err });
    console.log('PRODUCT UPDATE ERR: ', err);
    res.status(400).json({
      err: err.message,
    })
  }
};