import React, { useState, useEffect } from 'react';
import {
  getOrder,
} from '../functions/order';

const OrderReceipt = ({ match }) => {
  const { orderId } = match.params;
  console.log(orderId);
  return (
    <h4>OrderReceipt</h4>
  );
};

export default OrderReceipt;