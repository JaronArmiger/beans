import React, { useState } from 'react';
import {
  Card,
  Collapse,
} from 'antd';
import defaultImage from '../../images/snake.jpg';

const { Panel } = Collapse;

const OrderCard = ({ order }) => {
  const [activeKey, setActiveKey] = useState([]);
  const address = order.userAddress;
  const products = order.products;

  const calcStatusColor = () => {
    switch (order.orderStatus) {
      case 'Not Processed':
        return '#d9ad0d';
        break;
      case 'Processing':
        return '#1a6ab0';
        break;
      case 'Dispatched':
        return '#980dd9';
        break;
      case 'Canceled':
        return '#d90d40';
        break;
      case 'Completed':
        return '#1c9956';
        break;
      default:
        return '#000000';
    }
    
  };

  const showOrderDetail = () => (
    <div>
      <p>
        <b>STATUS: </b>
        <b 
          style={{ 
            color: calcStatusColor(),
          }}
        >
          {order.orderStatus}
        </b>
      </p>
      <p className='mb-0'><b>Order Id: </b>{order._id}</p>
      <p className='mb-0'><b>User Email: </b>{order.userEmail}</p>
      <p className='mb-0'><b>Date Placed: </b>{new Date(order.createdAt).toLocaleDateString()}</p>
      <p className='mb-0'>
        <b>
          Total:{' '}
        </b>
        {/*(order.chargeAmount)
          .toLocaleString('en-US', {
            type: 'currency',
            currency: 'USD'
          })*/}
      </p>
      <Collapse
        activeKey={activeKey}
        onChange={(key) => setActiveKey(key)}
        bordered='false'
        ghost
      >
        <Panel
          header={<p><b>Ship To: </b>{`${address.firstName} ${address.lastName}`}</p>}
          key='1'
        >
          <p>{address.streetAddress}</p>
          <p>{`${address.city}, ${address.state} ${address.zip}`}</p>
        </Panel>
      </Collapse>
    </div>
  );

  const showProducts = () => (
    products.map((p, i) => {
      const {
        title,
        images,
      } = p.product;
      return (
        <React.Fragment key={i}>
          <div
            className='d-flex justify-content-between'
          >
            <img 
              src={images && images[0] ? images[0].url : defaultImage }
              alt={p.product}
              style={{ maxWidth: '100px'}}
            />
            <div
              className='text-right'
            >
              <p>{title}</p>
              <p>${parseInt(p.price).toLocaleString('en-US', { type: 'currency', currency: 'USD' })}</p>
            </div>
          </div>
          <hr />
        </React.Fragment>
      );
    })
  );

  return (
    <React.Fragment>
      <h4>Order Receipt</h4>
      <div
        style={{ backgroundColor: '#d5deed'}}
      >
        <h6
          className='p-2'
          style={{ backgroundColor: '#99b4e0'}}
        >
          Id: {order._id}
        </h6>
        <div
          className='p-2'
        >
          {showOrderDetail()}
          <hr />
          {showProducts()}
        </div>
      </div>
    </React.Fragment>
  );
};

export default OrderCard;