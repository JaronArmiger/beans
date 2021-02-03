import React, { useState, useEffect } from 'react';
import OrderCard from '../cards/OrderCard';
import {
  getOrders,
  changeOrderStatus,
} from '../../functions/admin';
import {
  deleteOrder,
} from '../../functions/order';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  LoadingOutlined,
} from '@ant-design/icons';



const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const { token } = useSelector(state => state.user);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    setLoading(true);
    getOrders(token)
      .then(res => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      })
  };

  const handleStatusChange = (orderId, newStatus) => {
    changeOrderStatus(orderId, newStatus, token)
      .then(res => {
        if (res.data.ok) {
          loadOrders();
          toast.success(`Order status updated to "${newStatus}"`)
        };
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleOrderDelete = (orderId, orderStatus, allPulled) => {
    if (orderStatus !== 'Completed' || !allPulled) return;
    const answer = window.confirm(`Are you sure you want to delete this order?`);
    if (answer) {
      deleteOrder(orderId, token)
      .then(res => {
        if (res.data.ok) {
          loadOrders();
          toast.success('Order deleted successfully.');
          return;
        }
        toast.error('An error has occurred. Order not deleted.');
      })
      .catch(err => {
        console.log(err);
        toast.error('An error has occurred. Order not deleted.');
      });
    }
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
          handleOrderDelete={handleOrderDelete}
        />
      </div>
    ))
  );

  return (
    loading ? (
      <LoadingOutlined className='h1'/>
    ) : (
      <React.Fragment>
        {orders && orders.length > 0 ?
          showOrders() :
          'No orders yet :\'('
        }
      </React.Fragment>
    )
  );
};

export default AdminOrders;