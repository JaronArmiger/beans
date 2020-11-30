import React, { useState, useEffect } from 'react';
import UserNav from '../../components/nav/UserNav';
import { getUserOrders } from '../../functions/user';
import { useSelector } from 'react-redux';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import { toast } from 'react-toastify';

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

  return (
  	<div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col">
          user history
        </div>
      </div>
  	</div>
  );
};

export default History;