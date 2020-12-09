import React from 'react';
import config from '../../utils/squareConfig';

const SquarePaymentForm = ({ paymentForm }) => {
  paymentForm = new paymentForm(config);
  paymentForm.build();
  console.log('squareConfig', config);

  const requestCardNonce = (e) => {
    e.preventDefault();
    paymentForm.requestCardNonce();
  };

  return (
    <div id="form-container">
      <div id="sq-card"></div>
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