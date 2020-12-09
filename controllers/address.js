const Address = require('../models/address');

exports.create = async (req, res) => {
  try {
    const addressFields = req.body.address;
    const address = await new Address(addressFields);
    await address.save();
    res.json({
      addressId: address._id,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    })
  }
};