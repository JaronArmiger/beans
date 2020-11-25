const Product = require('../models/product');
const User = require('../models/user');
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
    // 
    const {
      sort,
      order,
      perPage,
      page,
    } = req.body;

    const currentPage = page || 1;

    const products = await Product.find({})
      .skip((currentPage - 1) * perPage)
      .populate('category')
      .populate('subs')
      .sort([[sort, order]])
      .limit(perPage);
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

exports.count = async (req, res) => {
  let count = await Product.count();
  res.json(count);
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

exports.leaveRating = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const user = await User.findOne({ email: req.user.email });

    const { star } = req.body;
    const existingRating = product.ratings.find((rating) => {
      return rating.postedBy.toString() === user._id.toString();
    });

    if (existingRating === undefined) {
      const rating = {
        star,
        postedBy: user._id,
      };
      product.ratings.push(rating);
      await product.save();
      res.json(product);
    } else {
      existingRating.star = star;
      await product.save();
      res.json(product);
    }
  } catch (err) {
    console.log(err);
    // res.status(400).send({ err });
    console.log('PRODUCT RATING ERR: ', err);
    res.status(400).json({
      err: err.message,
    });
  }
}

exports.listRelated = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const related = await Product.find({ 
      _id: { $ne: product._id },// exclude this product
      category: product.category,
    })
    .limit(3);
    res.json(related);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
};

const handleQuery = async (req, res, query) => {
  // text and description fields are defined 
  // with text: true in schema
  try {
    const products = await Product
      .find({ $text: { $search: query } })
      // .populate('category', '_id name')
      // .populate('subs', '_id name');
    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
};

const handleQueryRegex = async (req, res, query) => {
  try {
    const products = await Product
      .find({
        $or: [
          {title: { $regex: query, $options: 'i' }},
          {description: { $regex: query, $options: 'i' }},
        ],
      })
      // .populate('category', '_id name')
      // .populate('subs', '_id name');
    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
}

const handlePrice = async (req, res, price) => {
  try {
    const products = await Product
      .find({
        price: {
          $gte: price[0],
          $lte: price[1],
        }
      });

    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
};

const handleCategory = async (req, res, category) => {
  try {
    const products = await Product
      .find({ category });

    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
};

const handleStar = async (req, res, stars) => {
  try {
    const products = await Product.aggregate([
      {
        $project: {
          document: '$$ROOT', // access to entire project
          floorAverage: {
            $floor: { $avg: '$ratings.star' }
          }
        }
      },
      {
        $match: { floorAverage: stars },
      }
    ]).limit(12);
    console.log(products);
    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
}

exports.searchFilters = async (req, res) => {
  const { 
    query, 
    price,
    category, // category _id
    stars,
   } = req.body;

  if (query) {
    console.log('query', query);
    await handleQueryRegex(req, res, query);
  }
  // price comes in as array:
  // [min, max]
  if (price) {
    await handlePrice(req, res, price);
  }

  if (category) {
    await handleCategory(req, res, category);
  }

  if (stars) {
    await handleStar(req, res, stars);
  }
};








