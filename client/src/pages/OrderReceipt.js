import React, { useState, useEffect } from 'react';
import {
  getOrder,
} from '../functions/order';
import {
  Card,
  Collapse,
} from 'antd';
import defaultImage from '../images/snake.jpg';
import OrderCard from '../components/cards/OrderCard';

const { Panel } = Collapse;

const orderBeforeLoad = {
  userEmail: '',
  orderStatus: '',
  chargeAmount: '',
  userAddress: {
    firstName: '',
    lastName: '',
    streetAddress: '',
    apartment: '',
    city: '',
    state: '',
    zip: '',
    phoneNumber: '',
  },
  products: [{
      count: 0,
      price: 0,
      product: {
        images: [],
        title: '',
      }
    }]
}

const OrderReceipt = ({ match }) => {
  const { orderId } = match.params;

  const [activeKey, setActiveKey] = useState([]);
  const [order, setOrder] = useState(orderBeforeLoad);

  useEffect(() => {
    getOrder(orderId)
     .then(res => {
       setOrder(res.data);
     })
     .catch(err => {
       console.log(err);
     })
  }, []);


  return (
    <div className="container-fluid">
      <div className="row">
        <div 
          className="col-md-6"
          style={{ border: '1px solid blue' }}
        > 
          <OrderCard order={order} />
        </div>
          
        <div 
          className="col-md-6"
          style={{ border: '1px solid blue' }}
        >
        adsa</div>
      </div>
    </div>
  );
};

export default OrderReceipt;