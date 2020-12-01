import React, { useState, useEffect } from 'react';
import AdminNav from '../../components/nav/AdminNav';
import AdminOrders from '../../components/order/AdminOrders';
import {
  getOrders,
  changeOrderStatus,
} from '../../functions/admin';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
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

  return (
  	<div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col text-center">
          <h4>Orders</h4>
          <AdminOrders 
            orders={orders}
            handleStatusChange={handleStatusChange}
          />
        </div>
      </div>
  	</div>
  );
};

export default AdminDashboard;