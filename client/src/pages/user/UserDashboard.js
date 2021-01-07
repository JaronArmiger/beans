import React from 'react';
import { Tabs } from 'antd';
import OrderHistory from './OrderHistory';
import Password from './Password';
import Wishlist from './Wishlist';
import { useSelector } from 'react-redux';

const { TabPane } = Tabs;

const UserDashboard = () => {
  const { user } = useSelector(state => state);
  return (
    <div
      className='container-fluid'
    >
      <div className="row justify-content-center">
        <div className="col-md-8 p-2">
          <h4>{user.email}</h4>
          <Tabs 
            defaultActiveKey="1" 
            size='large' 
            style={{ 
              marginBottom: 32,
            }}
          >
            <TabPane tab="Orders" key="1">
              <OrderHistory />
            </TabPane>
            <TabPane tab="Password" key="2">
              <Password />
            </TabPane>
            <TabPane tab="Wishlist" key="3">
              <Wishlist />
            </TabPane>
          </Tabs>
        </div>
      </div>
      </div>
  );
};

export default UserDashboard;