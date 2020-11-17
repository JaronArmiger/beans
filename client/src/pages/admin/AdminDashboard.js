import React, { useState, useEffect } from 'react';
import AdminNav from '../../components/nav/AdminNav';
import { LoadingOutlined } from '@ant-design/icons';

const AdminDashboard = () => {
  return (
  	<div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          <h4>All Products</h4>
        </div>
      </div>
  	</div>
  );
};

export default AdminDashboard;