import axios from 'axios';

export const sendOrderEmail = async (orderId) => {
  return await axios.post(`${process.env.REACT_APP_API}/mail/order`, { orderId });
};