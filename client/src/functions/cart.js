import axios from 'axios';

export const getCart = async (cartId) => {
  return await axios.get(`${process.env.REACT_APP_API}/cart/${cartId}`);
};

export const createCart = async (cart, userEmail, cartId=null) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/cart`, 
    { 
      cart, 
      cartId,
      userEmail,
    }
  );
};

export const applyCoupon = async (cartId, coupon) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/cart/coupon`,
    { 
      coupon,
      cartId
    },
  );
};
















