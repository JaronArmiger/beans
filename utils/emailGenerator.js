exports.generateOrderEmailText = (order) => {
  const {
    _id,
    userEmail,
    userAddress,
    chargeAmount,
    products,
  } = order;

  const productInfo = products.map((p) => {
    return `${p.product.title} x${p.count}\n`;
  })
  .join('    ');
  const contactInfo = 'Contact Us:\n  Phone: (312) 243-5915\n  Email: vintageon18th@gmail.com';
  const address = userAddress ? 
    `  Shipping Address:\n    ${userAddress.firstName} ${userAddress.lastName}\n    ${userAddress.streetAddress}\n    ${userAddress.city}, ${userAddress.state}\n    ${userAddress.zip}`
    : '';
  const text = `Thank you for shopping with Pilsen Vintage!\n\nOrder Summary:\n${address}\n  Total: ${chargeAmount ? chargeAmount.toLocaleString('en-US',{
    style: 'currency',
    currency: 'USD',
  }) : '$0'}\n  Products:\n    ${productInfo}\n\n${contactInfo}`;

  return text;
};