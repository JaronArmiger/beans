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

export const createStripeOrder = async (cartId, addressId, shipping, paymentIntent) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/order-stripe`,
    { 
      cartId, 
      addressId,
      shipping,
      paymentIntent
    },
  );
};

export const deleteOrder = async (orderId, authtoken) => {
  return await axios.delete(
     `${process.env.REACT_APP_API}/order/${orderId}`,
     {
       headers: {
         authtoken,
       },
     }
  );
};