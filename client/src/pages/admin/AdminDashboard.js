import React, { useState, useEffect } from 'react';
import AdminOrders from '../../components/order/AdminOrders';
import ProductCreate from './product/ProductCreate';
import AllProducts from './product/AllProducts';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const AdminDashboard = ({ match }) => {
  const { key } = match.params;
  const [openKey, setOpenKey] = useState(key || '1');

  return (
  	<div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-10 p-2">
          <Tabs 
            activeKey={openKey}
            size='large' 
            style={{ 
              marginBottom: 32,
            }}
            tabPosition='top'
            onChange={(key) => setOpenKey(key)}
          >
            <TabPane tab="Orders" key="1">
              <AdminOrders />
            </TabPane>
            <TabPane tab="Product Create" key="2">
              <ProductCreate setOpenKey={setOpenKey}/>
            </TabPane>
            <TabPane tab="Product View" key="3">
              <AllProducts />
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