const User = require('../models/user');

exports.createOrUpdateUser = async (req, res) => {
  const { email, user_id } = req.user;
  const user = await User
    .findOneAndUpdate(
      { email }, 
      { name: user_id },
      { new: true }, // to return updated information
    )

  if (user) {
  	console.log('USER UPDATED', user);
  	res.json(user);
  } else {
  	const newUser = await new User({
  	  email,
  	}).save();
  	console.log('USER CREATED', newUser);
  	res.json({ newUser })
  }
}