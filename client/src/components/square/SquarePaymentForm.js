import React from 'react';
import config from '../../utils/squareConfig';

const SquarePaymentForm = ({ paymentForm }) => {
  paymentForm = new paymentForm(config);
  paymentForm.build();

  const requestCardNonce = (e) => {
    e.preventDefault();
    paymentForm.requestCardNonce();
  };

  return (
    <div id="form-container">
      <div id="sq-card-number"></div>
      <div className="third" id="sq-expiration-date"></div>
      <div className="third" id="sq-cvv"></div>
      <div className="third" id="sq-postal-code"></div>
      <button 
        id="sq-creditcard" 
        className="button-credit-card"
        onClick={requestCardNonce}
        style={{ border: 0, fontWeight: 500 }}
      >
        Confirm Details
      </button>
    </div>
  );
};

export default SquarePaymentForm;