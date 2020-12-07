import axios from 'axios';

export const createCart = async (cart, userEmail, cartId=null) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/cart`, 
    { 
      cart, 
      cartId,
      userEmail,
    }
  );
}