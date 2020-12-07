import axios from 'axios';
import uniqid from 'uniqid';

export const userCart = async (cart, authtoken) => {
  return await axios.post(
  	`${process.env.REACT_APP_API}/user/cart`,
  	{ cart },
  	{
  	  headers: {
  	  	authtoken,
  	  },
  	}
  );
};

export const getUserCart = async (authtoken) => {
  return await axios.get(
    `${process.env.REACT_APP_API}/user/cart`,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const emptyUserCart = async (authtoken) => {
  return await axios.delete(
    `${process.env.REACT_APP_API}/user/cart`,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const saveUserAddress = async (authtoken, address) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/user/address`,
    { address },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const createOrder = async (authtoken, stripeResponse) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/user/order`,
    { 
      stripeResponse, 
      cashOnDelivery: false,
    },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getUserOrders = async (authtoken) => {
  return await axios.get(
    `${process.env.REACT_APP_API}/user/orders`,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const createCashOrder = async (authtoken, amount) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/user/order`,
    {
      stripeResponse: {
        paymentIntent: {
          id: uniqid(),
          amount: amount * 100,
          currency: 'usd',
          status: 'Cash On Delivery',
          created: Date.now(),
          payment_method_types: ['cash'],
        }
      },
      cashOnDelivery: true,
    },
    {
      headers: {
        authtoken,
      },
    }
  );
};





