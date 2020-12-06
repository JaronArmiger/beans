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
import {
  createOrder,
  emptyUserCart,
} from '../functions/user';
import {
  Card
} from 'antd';
import {
  DollarOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import pilsen from '../images/pilsenvintage.jpg';
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

const StripeCheckout = ({ history }) => {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const [cartTotal, setCartTotal] = useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(null);
  const [payable, setPayable] = useState(0);

  const dispatch = useDispatch();
  const { user, coupon } = useSelector(state => state);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    createPaymentIntent(user.token, coupon)
      .then(res => {
      	console.log(res.data);
        const {
          clientSecret,
          cartTotal,
          totalAfterDiscount,
          payable,
        } = res.data;
      	setClientSecret(clientSecret);
        setCartTotal(cartTotal);
        if (totalAfterDiscount !== undefined) {
          setTotalAfterDiscount(totalAfterDiscount);
        }
        setPayable(payable);
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
        createOrder(user.token, payload)
          .then(res => {
            if (res.data.ok) {
              if (typeof window !== undefined) {
                localStorage.removeItem('cart');
              }
            }
            dispatch({ type: 'CLEAR_CART' });
            dispatch({
              type: 'COUPON_APPLIED',
              payload: false
            });
            emptyUserCart(user.token)
              .then((res) => {
                if (res.data.ok) console.log('cart deleted on backend');
              })
              .catch(err => console.log(err.response));
          })
          .catch(err => {
            console.log(err);
          })
        
        console.log(payload);
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
      {(totalAfterDiscount !== null) ? (
        <div className='alert alert-success'>
          Coupon applied.
          You are saving ${cartTotal - totalAfterDiscount}!
        </div>
      ) : (
        <p className='alert alert-info'>No coupon applied</p>
      )}
      <div className="text-center pb-5">
        <Card 
          cover={
            <img
              alt={'Pilsen Vintage Store'}
              src={pilsen}
              style={{
                height: '200px',
                objectFit: 'cover',
                marginBottom: '-50px',
              }}
            />
          }
          actions={[
            <React.Fragment>
              <DollarOutlined className='text-info' />
              <br />
              Cart Total: ${cartTotal}
            </React.Fragment>,
            <React.Fragment>
              <CheckOutlined className='text-success' />
              <br />
              Amount Due: ${payable}
            </React.Fragment>
          ]}
        />
      </div>
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
      <p className={`result-message ${!succeeded ? 'hidden' : ''}`}>
        Payment Successful!{'   '}
        <Link to='/user/history'>
          View in your purchase history
        </Link>
      </p>
    </React.Fragment>
  );
};

export default StripeCheckout;