import axios from 'axios';

export const getOrder = async (orderId) => {
  return await axios.get(`${process.env.REACT_APP_API}/order/${orderId}`);
};

export const createOrder = async (paymentId, addressId, shipping) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/order`,
    { paymentId, addressId, shipping },
  );
};

export const createStripeOrder = async (paymentId, addressId, shipping) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/order-stripe`,
    { paymentId, addressId, shipping },
  );
};