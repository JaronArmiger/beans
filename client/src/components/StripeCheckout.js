import React, { useState } from 'react';
import {
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import {
  useSelector,
  useDispatch,
} from 'react-redux';
import { Link } from 'react-router-dom';
import {
  createPaymentIntent,
} from '../functions/stripe';
import {
  createOrder,
  createStripeOrder,
  emptyUserCart,
} from '../functions/user';
import {
  Card
} from 'antd';
import {
  DollarOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import { toast } from 'react-toastify';

const cardStyle = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: "Arial, sans-serif",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#32325d",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

const StripeCheckout = ({ 
  shipping, 
  setActiveKey,
  setClientSecret,
  setCardElement,
  setPaymentConfirmed,
  setPayable,
}) => {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const dispatch = useDispatch();
  const { cartId } = useSelector(state => state);

  const stripe = useStripe();
  const elements = useElements();

  const handleChange = async (e) => {
    // listen for changes in the cart element
    // and display any errors as the customer types
    setDisabled(e.empty);
    setError(e.error ? e.error.message : '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    createPaymentIntent(cartId, shipping)
      .then(res => {
        console.log(res.data);
        const {
          clientSecret,
          chargeAmount,
        } = res.data;
        setProcessing(false);
        setClientSecret(clientSecret);
        setPayable(chargeAmount);
        setActiveKey([]);
        setSucceeded(true);
        setPaymentConfirmed(true);
        setCardElement(elements.getElement(CardElement))
        toast.success('Payment details confirmed.');
      })
      .catch(err => {
        console.log(err);
        setProcessing(false);
        toast.warning('Error confirming payment details.');
      });
    // e.preventDefault();
    // setProcessing(true);
    // try {
    //   const payload = await stripe
    //     .confirmCardPayment(clientSecret, {
    //     	payment_method: {
    //     	  card: elements.getElement(CardElement),
    //     	  billing_details: {
    //     	  	name: e.target.name.value,
    //     	  },
    //     	}
    //     });
    //   if (payload.error) {
    //     setError(`Payment failed ${payload.error.message}`);
    //     setProcessing(false);
    //   } else {
    //     // create order and save in database for admin to process
    //     createOrder(user.token, payload)
    //       .then(res => {
    //         if (res.data.ok) {
    //           if (typeof window !== undefined) {
    //             localStorage.removeItem('cart');
    //           }
    //         }
    //         dispatch({ type: 'CLEAR_CART' });
    //         dispatch({
    //           type: 'COUPON_APPLIED',
    //           payload: false
    //         });
    //         emptyUserCart(user.token)
    //           .then((res) => {
    //             if (res.data.ok) console.log('cart deleted on backend');
    //           })
    //           .catch(err => console.log(err.response));
    //       })
    //       .catch(err => {
    //         console.log(err);
    //       })
        
    //     console.log(payload);
    //     setError(null);
    //     setProcessing(false);
    //     setSucceeded(true);
    //   }
    // } catch (err) {
    //   console.log(err);
    //   toast.error('An error has occurred. Order not placed.')
    // }

  };

  return (
    <React.Fragment>
    	<form 
    	  id="payment-form"
    	  className='stripe-form'
    	  onSubmit={handleSubmit}
    	>
        <CardElement 
          id='card-element'
          options={cardStyle}
          onChange={handleChange}
        />
        <button 
          className="stripe-button"
          disabled={disabled || processing || succeeded}
        >
          <span
            id='button-text'
          >
            {processing ? (
            	<div 
            	  className='spinner'
            	  id='spinner'
            	>
            	</div>
            ) : (
              'Confirm Details'
            )}
          </span>
        </button>
        <br />
        {error && (
    	  <div 
    	    className="card-error text-danger"
    	    role='alert'
    	  >
    	    {error}
    	  </div>
    	)}
    	</form>
    </React.Fragment>
  );
};

export default StripeCheckout;