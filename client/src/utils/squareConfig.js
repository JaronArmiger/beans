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

  const body = {
    nonce,
    idempotency_key,
    location_id: process.env.REACT_APP_SQUARE_LOCATION_ID,
  };

  confirmPaymentDetails(cartId, body);
  

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
  card: {
    elementId: 'sq-card',
  },
  callbacks: {
    cardNonceResponseReceived,
  }
};

export default config;