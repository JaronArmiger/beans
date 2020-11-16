const cloudinary = require('cloudinary');

// config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET,
});

// we will be sending JSON data from front end
// which will be binary data
exports.upload = async (req, res) => {
  const result = await cloudinary.uploader.upload(req.body.image, {
  	public_id: `${Date.now()}`,
  	resource_type: 'auto',
  });
  res.json({
  	public_id: result.public_id,
  	url: result.secure_url,
  });
};

exports.remove = (req, res) => {
  const imageId = req.body.public_id;
  cloudinary.uploader.destroy(imageId, (err, result) => {
  	if (err) return res.status(400).json({
  	  success: false,
  	  err: err.message,
  	});
  	res.send('ok');
  })
};