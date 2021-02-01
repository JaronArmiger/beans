exports.generateOrderEmailText = (order) => {
  const {
    _id,
    userEmail,
    userAddress,
    chargeAmount,
    products,
    shipping,
  } = order;

  const productInfo = products.map((p) => {
    return `${p.product.title} x${p.count}\n`;
  })
  .join('    ');
  const contactInfo = 'Contact Us:\n  Phone: (312) 243-5915\n  Email: vintageon18th@gmail.com';
  const address = userAddress ? 
    `  Shipping Address:\n    ${userAddress.firstName} ${userAddress.lastName}\n    ${userAddress.streetAddress}\n    ${userAddress.city}, ${userAddress.state}\n    ${userAddress.zip}`
    : '';
  let text = '*DO NOT REPLY directly to this email. Please send all replies to vintageon18th@gmail.com*\n\n'
  text += `Thank you for shopping with Pilsen Vintage!\n\n`;
  if (shipping) {
    text += 'Orders ship every Tuesday morning as long the order was placed at least 48 hours beforehand. Be on the lookout for an email with shipping and tracking information from vintageon18th@gmail.com.';
    text += 'If you have any other questions or concerns, feel free to email, call, or DM us on instagram (@PilsenVintageChicago).\n'
  } else {
    text += 'Your order will be ready for pickup in 48 hours. If you need your item sooner, please contact us via instagram (@PilsenVintageChicago), or call Paul at (773) 671-2513. Please bring a valid state ID when picking up your item.\n'
  }
  
  text += `\nOrder Summary:\n${address}\n  Total: $${chargeAmount ? chargeAmount.toFixed(2) : '$0'}\n  Products:\n    ${productInfo}`;
  text += `\nView your order and download a receipt here: ${process.env.ROOT_URL}/order/${order._id}\n`;
  text += '\n\nStay Weird!';
  text += `\n\n${contactInfo}`;

  return text;
};

exports.generateOrderEmailHtml = (order) => {
  const {
    _id,
    userEmail,
    userAddress,
    chargeAmount,
    products,
    shipping,
  } = order;

  const productInfo = products.map((p) => {
    return `<p style="margin-top: 0; margin-bottom: 0; margin-left: 20px;">${p.product.title} x${p.count}</p>`;
  })
  .join('    ');
  const contactInfo = '<p style="margin-bottom: 0;">Contact Us:</p><p style="margin-top: 0; margin-bottom: 0; margin-left: 5px;">  Phone: (312) 243-5915</p><p style="margin-top: 0; margin-bottom: 0; margin-left: 5px;">  Email: vintageon18th@gmail.com</p>';
  const address = userAddress ? 
    `<p style="margin-top: 0; margin-bottom: 0; margin-left: 10px;">Shipping Address:</p>
     <p style="margin-top: 0; margin-bottom: 0; margin-left: 20px;">${userAddress.firstName} ${userAddress.lastName}</p>
     <p style="margin-top: 0; margin-bottom: 0; margin-left: 20px;">${userAddress.streetAddress}</p>
     <p style="margin-top: 0; margin-bottom: 0; margin-left: 20px;">${userAddress.city}, ${userAddress.state} ${userAddress.zip}</p>`
    : '';
  let text = '<p><b>*DO NOT REPLY directly to this email. Please send all replies to vintageon18th@gmail.com*</b></p>'
  text += `<p>Thank you for shopping with Pilsen Vintage!</p>`;
  if (shipping) {
    text += '<p>Orders ship every Tuesday morning as long the order was placed at least 48 hours beforehand. Be on the lookout for an email with shipping and tracking information from vintageon18th@gmail.com. ';
    text += 'If you have any other questions or concerns, feel free to email, call, or DM us on instagram (@PilsenVintageChicago).</p>'
  } else {
    text += '<p>Your order will be ready for pickup in 48 hours. If you need your item sooner, please contact us via instagram (@PilsenVintageChicago), or call Paul at (773) 671-2513. Please bring a valid state ID when picking up your item.</p>'
  }
  
  text += `
    <p style="margin-bottom: 0; font-weight: bold;">Order Summary:</p><p>${address}</p>
    <p style="margin-left: 10px;">Total: $${chargeAmount ? chargeAmount.toFixed(2) : '$0'}</p>
    <p style="margin-left: 10px; margin-bottom: 0;">Products:${productInfo}</p>
  `;

  text += `<p>View your order and download a receipt <a href="${process.env.ROOT_URL}/order/${order._id}">here</a></p>`;

  text += '<p>Stay Weird!</p>';
  text += `<p>${contactInfo}</p>`;

  return text;
};