const User = require('../models/user');

exports.createOrUpdateUser = async (req, res) => {
  const { email, name } = req.user;
  const user = await User
    .findOneAndUpdate(
      { email },
      { name },
      { new: true }, // to return updated information
    )

  if (user) {
  	console.log('USER UPDATED', user);
  	res.json(user);
  } else {
  	const newUser = await new User({
  	  email,
      name: email.split('@')[0],
  	}).save();
  	console.log('USER CREATED', newUser);
  	res.json(newUser)
  }
}

exports.currentUser = async (req, res) => {
  User.findOne({ email: req.user.email })
    .exec((err, user) => {
      if (err) throw new Error(err);
      res.json(user);
    })
}