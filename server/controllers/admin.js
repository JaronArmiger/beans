const Order = require('../models/order');

exports.listOrders = async (req, res) => {
  try {
    const orders = await Order
      .find()
      .sort('-createdAt')
      .populate('products.product');

    res.json(orders);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
};

exports.udpateOrderStatus = async (req, res) => {
  try {
    const { orderId, orderStatus } = req.body;
    const updated = await Order
      .findByIdAndUpdate(
        orderId,
        { orderStatus },
        { new: true }
      );
    
    res.json(updated);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
};