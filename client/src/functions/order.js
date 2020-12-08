import axios from 'axios';

export const createOrder = async (paymentId) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/order`,
    { paymentId },
  );
};