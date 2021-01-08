const Product = require('../models/product');

exports.checkNoneSold = async (products) => {
  let noneSold = true;
  for (let i = 0; i < products.length; i++) {
    const {sold} = await Product.findById(products[i]._id);
    if (sold) {
      noneSold = false;
      break;
    };
  };
  return noneSold;
};