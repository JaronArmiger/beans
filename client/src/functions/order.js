import axios from 'axios';

export const getOrder = async (orderId) => {
  return await axios.get(`${process.env.REACT_APP_API}/order/${orderId}`);
};

export const createOrder = async (paymentId, addressId) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/order`,
    { paymentId, addressId },
  );
};