import React, { useState, useEffect } from 'react';
import OrderCard from '../cards/OrderCard';
import ModalImage from 'react-modal-image';
import defaultImage from '../../images/snake.jpg';
import {
  getOrders,
  changeOrderStatus,
} from '../../functions/admin';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';



const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const { token } = useSelector(state => state.user);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    getOrders(token)
      .then(res => {
        console.log(res.data);
        setOrders(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  };

  const handleStatusChange = (orderId, newStatus) => {
    changeOrderStatus(orderId, newStatus, token)
      .then(res => {
        if (res.data.ok) {
          loadOrders()
          toast.success(`Order status updated to "${newStatus}"`)
        };
      })
      .catch(err => {
        console.log(err);
      });
  };

  const showOrders = () => (
    orders.map((o, idx) => (
      <div
        key={idx}
      >
        <OrderCard 
          order={o} 
          admin={true}
          handleStatusChange={handleStatusChange}
        />
      </div>
    ))
  );

  return (
    <React.Fragment>
      {orders && orders.length > 0 ?
        showOrders() :
        'No orders yet :\'('
      }
    </React.Fragment>
  );
};

export default AdminOrders;