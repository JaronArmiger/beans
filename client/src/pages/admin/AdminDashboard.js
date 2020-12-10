import React, { useState, useEffect } from 'react';
import AdminNav from '../../components/nav/AdminNav';
import AdminOrders from '../../components/order/AdminOrders';
import {
  getOrders,
  changeOrderStatus,
} from '../../functions/admin';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const AdminDashboard = () => {
  // const [orders, setOrders] = useState([]);

  // const { token } = useSelector(state => state.user);

  // useEffect(() => {
  //   loadOrders();
  // }, []);

  // const loadOrders = () => {
  //   getOrders(token)
  //     .then(res => {
  //       console.log(res.data);
  //       setOrders(res.data);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })
  // };

  // const handleStatusChange = (orderId, newStatus) => {
  //   changeOrderStatus(orderId, newStatus, token)
  //     .then(res => {
  //       if (res.data.ok) {
  //         loadOrders()
  //         toast.success(`Order status updated to "${newStatus}"`)
  //       };
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  return (
  	<div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-10 p-2">
          <Tabs 
            defaultActiveKey="1" 
            size='large' 
            style={{ 
              marginBottom: 32,
            }}
            tabPosition='top'
          >
            <TabPane tab="Orders" key="1">
              <AdminOrders />
            </TabPane>
            <TabPane tab="Product Create" key="2">
              tab 2
            </TabPane>
            <TabPane tab="Product View" key="3">
              tab 3
            </TabPane>
            <TabPane tab="Category" key="4">
              tab 1
            </TabPane>
            <TabPane tab="Sub-Category" key="5">
              tab 2
            </TabPane>
            <TabPane tab="Coupon" key="6">
              tab 3
            </TabPane>
            <TabPane tab="Password" key="7">
              tab 3
            </TabPane>
          </Tabs>
        </div>
      </div>
  	</div>
  );
};

export default AdminDashboard;