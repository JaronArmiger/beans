import React from 'react';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import PaymentInfo from '../cards/PaymentInfo';

const statusOptions = [
  'Not Processed',
  'Processing',
  'Dispatched',
  'Cancelled',
  'Completed',
];


const AdminOrders = ({ orders, handleStatusChange }) => {
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
          {price && price.toLocaleString('en-US',{
              style: 'currency',
              currency: 'USD',
            })}
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
      <div key={idx} className="row m-5 p-3 card bg-light">
        <PaymentInfo order={o} showStatus={false}/>
        {showProductsInOrder(o.products)}
        <div className="row">
          <div className="col-md-4">
            <h4 style={{ fontSize: '20px' }}>Delivery Status</h4>
          </div>
          <div className="col-md-8">
            <select
              name='order-status'
              className='form-control'
              style={{ cursor: 'pointer' }}
              defaultValue={o.orderStatus}
              onChange={e => handleStatusChange(o._id, e.target.value)}
            >
              {statusOptions.map((op, idx) => (
                <option value={op} key={idx}>
                  {op}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    ))
  );

  return (
    <React.Fragment>
      {orders && orders.length > 0 ?
        showOrders() :
        'No orders yet :\'('
      }
    </React.Fragment>
  );
};

export default AdminOrders;