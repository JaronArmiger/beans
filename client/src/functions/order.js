import axios from 'axios';

export const createOrder = async (paymentId, addressId) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/order`,
    { paymentId, addressId },
  );
};