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
import { Link } from 'react-router-dom';

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
        	  billing_details: {
        	  	name: e.target.name.value,
        	  },
        	}
        });
      if (payload.error) {
        setError(`Payment failed ${payload.error.message}`);
        setProcessing(false);
      } else {
        // create order and save in database for admin to process
        // empty user cart from redux store and local storage
        console.log(payload);
        setError(null);
        setProcessing(false);
        setSucceeded(true);
      }
    } catch (err) {
      console.log(err);
    }

  };

  return (
    <React.Fragment>
      <p className={`result-message ${!succeeded ? 'hidden' : ''}`}>
        Payment Successful!{'   '}
        <Link to='/user/history'>
          View in your purchase history
        </Link>
      </p>
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