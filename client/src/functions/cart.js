import axios from 'axios';

export const createOrUpdateCart = async (cart, cartId=null) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/cart`, 
    { cart, cartId }
  );
}