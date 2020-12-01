import axios from 'axios';

export const getWishlist = async (authtoken) => {
  return await axios.get(
    `${process.env.REACT_APP_API}/user/wishlist`,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const addToWishlist = async (productId, authtoken) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/user/wishlist`,
    { productId },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const removeFromWishlist = async (productId, authtoken) => {
  return await axios.delete(
    `${process.env.REACT_APP_API}/user/wishlist/${productId}`,
    {
      headers: {
        authtoken,
      },
    },
  );
};