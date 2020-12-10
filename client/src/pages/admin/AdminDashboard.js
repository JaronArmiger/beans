import React, { useState, useEffect } from 'react';
import AdminOrders from '../../components/order/AdminOrders';
import ProductCreate from './product/ProductCreate';
import CategoryCreate from './category/CategoryCreate';
import SubCreate from './sub/SubCreate';
import CouponCreate from './coupon/CouponCreate';
import AllProducts from './product/AllProducts';
import Password from '../user/Password';
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
              <CategoryCreate />
            </TabPane>
            <TabPane tab="Sub-Category" key="5">
              <SubCreate />
            </TabPane>
            <TabPane tab="Coupon" key="6">
              <CouponCreate />
            </TabPane>
            <TabPane tab="Password" key="7">
              <Password />
            </TabPane>
          </Tabs>
        </div>
      </div>
  	</div>
  );
};

export default AdminDashboard;