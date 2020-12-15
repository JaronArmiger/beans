import React, { useState, useEffect } from 'react';
import SquarePaymentForm from './SquarePaymentForm';

const SquareContainer = React.memo(({ chargeAmount, shipping }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const sqPaymentScript = document.createElement('script');
    sqPaymentScript.src = 'https://js.squareupsandbox.com/v2/paymentform';
    sqPaymentScript.type = 'text/javascript';
    sqPaymentScript.async = false;
    sqPaymentScript.onload = () => {
      setLoading(false);
    };
    document
      .getElementsByTagName('head')[0]
      .appendChild(sqPaymentScript);
  }, []);

  return(
    <React.Fragment>
      <p className='text-center'>
        <b>Charge Amount:</b> {(shipping ? (chargeAmount + 8) : chargeAmount).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
      </p>
      {!loading && 
        <SquarePaymentForm 
          paymentForm={ window.SqPaymentForm }
        />
      }
    </React.Fragment>
  );
})

export default SquareContainer;
