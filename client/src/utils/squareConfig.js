import { v4 } from 'uuid';
import store from '../store';
import { confirmPaymentDetails } from '../functions/square';

const idempotency_key = v4();

const cardNonceResponseReceived = (errors, nonce, cardData) => {
  if (errors) {
    console.error('Encountered errors:');
    errors.forEach((err) => {
      console.error(' ' + err.message);
    });
    alert('Errors occurred, check console');
    return;
  };
  createPayment(nonce);
};

const createPayment = (nonce) => {
  const state = store.getState();
  const { cartId } = state;

  const squareInfo = {
    nonce,
    idempotency_key,
    location_id: process.env.REACT_APP_SQUARE_LOCATION_ID,
  };

  confirmPaymentDetails(cartId, squareInfo)
    .then((res) => {
      if (res.data.ok) {
        store.dispatch({
          type: 'SET_PAYMENT_STATUS',
          payload: 'confirmed',
        });
        store.dispatch({
          type: 'SET_PAYMENT_ID',
          payload: res.data.paymentId,
        });
      } else {
        store.dispatch({
          type: 'SET_PAYMENT_STATUS',
          payload: 'error',
        });
      }
    })
    .catch((err) => {
      console.log(err);
      store.dispatch({
        type: 'SET_PAYMENT_STATUS',
        payload: 'error',
      });
    });
  

  // fetch(`${process.env.REACT_APP_API}/process-square-payment`, {
  //   method: 'POST',
  //   headers: {
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     nonce,
  //     idempotency_key,
  //     location_id: process.env.REACT_APP_LOCATION_ID,
  //   })
  // }).catch(err => {
  //   alert('Network error: ', err);
  // }).then(res => {
  //   if (!res.ok) {
  //     return res.json().then(errorInfo => Promise.reject(errorInfo));
  //   }
  // }).then(data => {
  //   console.log(data);
  //   console.log('payment complete');
  // }).catch(err => {
  //   console.error(err);
  // })
};

const config = {
  applicationId: process.env.REACT_APP_SQUARE_APP_ID,
  inputClass: 'sq-input',
  autoBuild: false,
  // card: {
  //   elementId: 'sq-card',
  // },
  inputStyles: [{
    fontSize: '16px',
    lineHeight: '24px',
    padding: '16px',
    placeholderColor: '#a0a0a0',
    backgroundColor: 'transparent',
  }],
  cardNumber: {
    elementId: 'sq-card-number',
    placeholder: 'Card Number'
  },
  cvv: {
    elementId: 'sq-cvv',
    placeholder: 'CVV'
  },
  expirationDate: {
    elementId: 'sq-expiration-date',
    placeholder: 'MM/YY'
  },
  postalCode: {
    elementId: 'sq-postal-code',
    placeholder: 'Postal'
  },
  callbacks: {
    cardNonceResponseReceived,
  }
};

export default config;