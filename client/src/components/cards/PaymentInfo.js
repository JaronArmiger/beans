import React from 'react';

const PaymentInfo = ({ order }) => {
  return (
    <div>
      <p>
        <span>
          Order Id: {order.paymentIntent.id}{' '}
        </span>
        <span>
          Amount Paid: {(order.paymentIntent.amount / 100)
            .toLocaleString('en-US',{
              style: 'currency',
              currency: 'USD',
            })
          }{' '}
        </span>
        <span>
          Currency: {order.paymentIntent.currency.toUpperCase()}{' '}
        </span>
        <span>
          Method: {order.paymentIntent.payment_method_types[0]}{' '}
        </span>
        <span>
          Payment Status: {order.paymentIntent.status.toUpperCase()}{' '}
        </span>
        <span>
          Orderered On: {
            new Date(order.paymentIntent.created * 1000).toLocaleString()
          }{' '}
        </span>
        <span
          className='badge bg-primary text-white'
        >
          Order Status: {order.orderStatus}{' '}
        </span>
      </p>
    </div>
  );
};

export default PaymentInfo;