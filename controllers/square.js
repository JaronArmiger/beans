exports.confirmPaymentDetails = async (req, res) => {
  const { squareInfo } = req.body;
  console.log('_______SQUARE_INFO_______');
  console.log(squareInfo);
};