import React, { useState, useEffect } from 'react';
import UserNav from '../../components/nav/UserNav';
import OrderCard from '../../components/cards/OrderCard';
import { getUserOrders } from '../../functions/user';
import { useSelector } from 'react-redux';

const History = () => {
  const [orders, setOrders] = useState([]);
  const { token } = useSelector(state => state.user);

  useEffect(() => {
    loadUserOrders();
  }, []);

  const loadUserOrders = () => {
    getUserOrders(token)
      .then(res => {
        console.log(res.data);
        setOrders(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  };

  const showOrders = () => (
    orders.map((o, idx) => (
      <div
        key={idx}
      >
        <OrderCard order={o} />
      </div>
    ))
  );

  return (
  	<div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col pt-3">
          <h4>
            Your Orders
          </h4>
          {orders.length > 0 ? 
            showOrders() :
            'No orders yet :\'('
          }
        </div>
      </div>
  	</div>
  );
};

export default History;