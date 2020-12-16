import React, { useState, useEffect } from 'react';
import {
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import {
  useSelector,
  useDispatch,
} from 'react-redux';
import { 
  Link,
  useHistory,
} from 'react-router-dom';
import {
  createPaymentIntent,
} from '../functions/stripe';
import {
  emptyUserCart,
} from '../functions/user';
import {
  createStripeOrder,
} from '../functions/order';
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
  addressId,
  setActiveKey,
  setPayable,
  emptyCart,
}) => {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();

  const { 
    cartId,
  } = useSelector(state => state);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    createPaymentIntent(cartId, shipping)
      .then(res => {
        const {
          clientSecret,
          chargeAmount,
        } = res.data;
        setClientSecret(clientSecret);
        setPayable(chargeAmount);
      })
      .catch(err => console.log(err));
  }, []);

  const handleChange = async (e) => {
    // listen for changes in the cart element
    // and display any errors as the customer types
    setDisabled(e.empty);
    setError(e.error ? e.error.message : '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
      const payload = await stripe
        .confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
          }
        });
      if (payload.error) {
        setError(`Payment failed ${payload.error.message}`);
        setProcessing(false);
      } else {
        createStripeOrder(cartId, addressId, payload.paymentIntent)
          .then(res => {
            if (res.data.ok) {
              console.log('payment successful');
              emptyCart();
              toast.success('Your order has been placed!');

              history.push(`/order/${res.data.orderId}`);
            };
          })
          .catch(err => {
            console.log(err);
            toast.error('An error has occurred');
          });
        
        setError(null);
        setProcessing(false);
        setSucceeded(true);
      }
    } catch (err) {
      console.log(err);
      toast.error('An error has occurred. Order not placed.')
    }

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
              'Complete Payment'
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