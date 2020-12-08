import axios from 'axios';

export const confirmPaymentDetails = (cartId, body) => {
  // console.log('nonce', body.nonce);
  // console.log('idempotency_key', body.idempotency_key);
  // console.log('location_id', body.location_id);
  return axios.post(
    `${process.env.REACT_APP_API}/confirm-payment-details`,
    { body }
  );
}