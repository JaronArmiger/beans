const Product = require('../models/product');
const User = require('../models/user');
const slugify = require('slugify');
const { removalPromise } = require('./cloudinary');

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
    let threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    const products = await Product.find({
      "$or": [
        {"sold": false},
        {"soldDate": {"$gte": threeDaysAgo}},
      ]
    })
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
    let threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    const products = await Product.find({
      "$or": [
        {"sold": false},
        {"soldDate": {"$gte": threeDaysAgo}},
      ]
    })
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
  let count = await Product.countDocuments();
  res.json(count);
}

exports.remove = async (req, res) => {
  try {
    const { slug } = req.params;
    const deleteImagePromises = [];
    const productToDelete = await Product.findOne({ slug });
    productToDelete.images.forEach((image) => {
      deleteImagePromises.push(removalPromise(image.public_id));
    });

    Promise.all(deleteImagePromises)
      .then(async result => {
        console.log('_______IMAGE_PROMISES_RESULT_______', result);
        const deleted = await Product.findOneAndRemove({ slug });
        res.json(deleted);
      })
      .catch(err => {
        res.status(400).json({
          err: err.message,
        });
      });

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
    let threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    const product = await Product.findById(req.params.id);
    const related = await Product.find({ 
      _id: { $ne: product._id },// exclude this product
      category: product.category,
      "$or": [
        {"sold": false},
        {"soldDate": {"$gte": threeDaysAgo}},
      ]
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
    let threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    const products = await Product
      .find({ 
        $text: { $search: query },
        "$or": [
          {"sold": false},
          {"soldDate": {"$gte": threeDaysAgo}},
        ]
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
};

const handleQueryRegex = async (req, res, query) => {
  try {
    let threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    const products = await Product
      .find({
        $or: [
          {title: { $regex: query, $options: 'i' }},
          {description: { $regex: query, $options: 'i' }},
        ],
        "$or": [
          {"sold": false},
          {"soldDate": {"$gte": threeDaysAgo}},
        ]
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
    let threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    const products = await Product
      .find({
        price: {
          $gte: price[0],
          $lte: price[1],
        },
        "$or": [
          {"sold": false},
          {"soldDate": {"$gte": threeDaysAgo}},
        ]
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
    let threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    const products = await Product
      .find({ 
        category,
        "$or": [
          {"sold": false},
          {"soldDate": {"$gte": threeDaysAgo}},
        ]
      });

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
    const data = await Product.aggregate([
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
    // console.log(data);
    const products = data.map((el) => el.document);
    // console.log(products);
    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
};

const handleSub = async (req, res, sub) => {
  try {
    let threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    const products = await Product.find({
      subs: sub,
      "$or": [
        {"sold": false},
        {"soldDate": {"$gte": threeDaysAgo}},
      ]
    });
    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  };
};

const handleShipping = async (req, res, shipping ) => {
  try {
    let threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    const products = await Product.find({
      shipping,
      "$or": [
        {"sold": false},
        {"soldDate": {"$gte": threeDaysAgo}},
      ]
    });
    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  };
};

const handleColor = async (req, res, color) => {
  try {
    let threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    const products = await Product.find({
      color,
      "$or": [
        {"sold": false},
        {"soldDate": {"$gte": threeDaysAgo}},
      ]
    });
    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  };
};

const handleBrand = async (req, res, brand) => {
  try {
    let threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    const products = await Product.find({
      brand,
      "$or": [
        {"sold": false},
        {"soldDate": {"$gte": threeDaysAgo}},
      ]
    });
    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  };
};

exports.searchFilters = async (req, res) => {
  const { 
    query, 
    price,
    category, // category _id
    stars,
    sub,
    shipping,
    color,
    brand,
   } = req.body;
  console.log('searchFilters', req.body);
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

  if (sub) {
    await handleSub(req, res, sub);
  }

  if (shipping) {
    await handleShipping(req, res, shipping);
  }

  if (color) {
    await handleColor(req, res, color);
  }

  if (brand) {
    await handleBrand(req, res, brand);
  }
};

exports.getProductsToPull = async (req, res) => {
  try {
    const products = await Product
      .find({ 
        pulled: false,
        sold: true, 
      })
      .sort([['soldDate', 'asc']]);
    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
};

exports.markProductAsPulled = async (req, res) => {
  try {
    const {
      productId
    } = req.params;
    const product = await Product
      .findByIdAndUpdate(productId, { pulled: true });
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
};







