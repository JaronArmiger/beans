import React, { useState, useEffect } from 'react';
import {
  getOrder,
} from '../functions/order';
import OrderCard from '../components/cards/OrderCard';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


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
  const [order, setOrder] = useState(orderBeforeLoad);

  const { user } = useSelector(state => state);

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
      <div className="row justify-content-center">
        <div 
          className="col-md-8 pt-3"
        > 
          <h4>Order Receipt</h4>
          <OrderCard order={order} />
          {
            <div
              className='p-2'
            >
              { user && 
                <Link
                  to='/user/dashboard'
                >
                  View in your order dashboard >> 
                </Link>
            }
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default OrderReceipt;