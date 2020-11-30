import React, { useState, useEffect } from 'react';
import UserNav from '../../components/nav/UserNav';
import PaymentInfo from '../../components/cards/PaymentInfo';
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

  const showProductInfo = (product, idx) => {
    const {
      title,
      price,
      color, 
      count 
    } = product;
    const {
      brand,
      shipping,
    } = product.product;
    return (
      <tr key={idx}>
        <td>
          <b>{title}</b>
        </td>
        <td>
          {price}
        </td>
        <td>
          {brand}
        </td>
        <td>
          {color}
        </td>
        <td>
          {count}
        </td>
        <td className='text-center'>
          {shipping === 'Yes' ?
            <CheckCircleOutlined className='text-success'/> :
            <CloseCircleOutlined className='text-danger'/>
          }
        </td>
      </tr>
    );
  };

  const showProductsInOrder = (products) => {
    return (
      <table className="table table-bordered">
        <thead className='thead-light'>
          <tr>
            <th scope='col'>
              Title
            </th>
            <th scope='col'>
              Price
            </th>
            <th scope='col'>
              Brand
            </th>
            <th scope='col'>
              Color
            </th>
            <th scope='col'>
              Count
            </th>
            <th scope='col'>
              Shipping
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, idx) => (
            showProductInfo(p, idx)
          ))}
        </tbody>
      </table>
    )
  };

  const showOrders = () => (
    orders.map((o, idx) => (
      <div 
        className="m-5 p-3 card"
        key={idx}
      >
        <PaymentInfo
          order={o}
        />
        {showProductsInOrder(o.products)}
        <div className="row">
          <div className="col">
            <p>Download PDF</p>
          </div>
        </div>
      </div>
    ))
  );

  return (
  	<div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col">
          <h4>
            Your Orders
          </h4>
          {orders.length > 0 ? 
            showOrders() :
            'No orders yet :\'('
          }
        </div>
      </div>
  	</div>
  );
};

export default History;