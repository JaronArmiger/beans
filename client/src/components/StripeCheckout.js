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
  createPaymentIntent,
} from '../functions/stripe';

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

const StripeCheckout = ({ history }) => {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');

  const dispatch = useDispatch();
  const { token } = useSelector(state => state.user);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    createPaymentIntent(token)
      .then(res => {
      	console.log(res.data.clientSecret);
      	setClientSecret(res.data.clientSecret);
      })
      .catch(err => console.log(err));
  }, []);

  const handleChange = async (e) => {
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
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
        disabled={processing || disabled || succeeded}
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
  	</form>
  );
};

export default StripeCheckout;