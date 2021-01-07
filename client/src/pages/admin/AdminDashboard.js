import React, { useState } from 'react';
import AdminOrders from '../../components/order/AdminOrders';
import ProductsToPull from './product/ProductsToPull';
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
            <TabPane tab="To Pull" key="1">
              <ProductsToPull />
            </TabPane>
            <TabPane tab="Orders" key="2">
              <AdminOrders />
            </TabPane>
            <TabPane tab="Product Create" key="3">
              <ProductCreate setOpenKey={setOpenKey}/>
            </TabPane>
            <TabPane tab="Product View" key="4">
              <AllProducts />
            </TabPane>
            <TabPane tab="Category" key="5">
              <CategoryCreate />
            </TabPane>
            <TabPane tab="Sub-Category" key="6">
              <SubCreate />
            </TabPane>
            <TabPane tab="Coupon" key="7">
              <CouponCreate />
            </TabPane>
            <TabPane tab="Password" key="8">
              <Password />
            </TabPane>
          </Tabs>
        </div>
      </div>
  	</div>
  );
};

export default AdminDashboard;