import axios from 'axios';

export const createPaymentIntent = async (cartId, shipping) => {
  return await axios.post(
  	`${process.env.REACT_APP_API}/create-payment-intent`,
    { cartId, shipping }
  );
};