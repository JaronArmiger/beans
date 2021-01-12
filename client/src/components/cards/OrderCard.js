import React, { useState } from 'react';
import {
  Collapse,
} from 'antd';
import defaultImage from '../../images/snake.jpg';
import Invoice from '../order/Invoice';
import { PDFDownloadLink } from '@react-pdf/renderer';
import {
  CloseCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';

const { Panel } = Collapse;

const statusOptions = [
  'Not Processed',
  'Processing',
  'Dispatched',
  'Cancelled',
  'Completed',
];

const OrderCard = ({ order, admin=false, handleStatusChange=null }) => {
  const [activeKey, setActiveKey] = useState([]);
  const address = order.userAddress || null;
  const products = order.products || [];

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

  const showDownloadLink = () => {
    const date = new Date(order.createdAt)
      .toLocaleDateString();

    return (
      <PDFDownloadLink
        document={
          <Invoice order={order} />
        }
        fileName={
          `invoice${date}.pdf`
        }
        className='btn btn-sm btn-outline-primary'
      >
        Download PDF of Receipt
      </PDFDownloadLink>
    );
  };

  const showOrderDetail = () => (
    <div>
      { admin ? (
          <React.Fragment>
            <b>Status: </b>
            <select
              name='order-status'
              className='p-2 ml-5'
              style={{ 
                cursor: 'pointer',
                color: calcStatusColor(),
                fontWeight: 'bold',
                fontSize: '17px',
                border: 'none',
              }}
              defaultValue={order.orderStatus}
              onChange={e => handleStatusChange(order._id, e.target.value)}
              disabled={!(products.every((p) =>{
                if (p.product){
                  return p.product.pulled === true;
                } else {
                  return false;
                }
              }))}
            >
              {statusOptions.map((op, idx) => (
                <option value={op} key={idx}>
                  {op}
                </option>
              ))}
            </select>
          </React.Fragment>
        ) : (
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
        )}
      <p className='mb-0'><b>Order Id: </b>{order._id}</p>
      <p className='mb-0'><b>User Email: </b>{order.userEmail}</p>
      <p className='mb-0'><b>Date Placed: </b>{new Date(order.createdAt).toLocaleDateString()}</p>
      <p className='mb-0'>
        <b>
          Total:{' '}
        </b>
        ${order.chargeAmount ?
          (order.chargeAmount)
            .toLocaleString('en-US', {
              type: 'currency',
              currency: 'USD'
            }) : (
            '$0'
          )
          }
      </p>
      {address ? (
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
        ) : (
          <p>In-Store pickup</p>
        )
      }
      <div
        className='d-flex justify-content-center'
      >
        {!admin && showDownloadLink()} 
      </div>
    </div>
  );

  const showProducts = () => {
    if (products) {
      return products.map((p, i) => {
          const {
            title,
            images,
            pulled,
          } = p.product;
          return (
            <React.Fragment key={i}>
              <div
                className='d-flex justify-content-between'
              >
                <img 
                  src={images && images[0] ? images[0].url : defaultImage }
                  alt={p.product}
                  style={{ maxWidth: '100px', height: 'auto' }}
                />
                <div
                  className='text-right'
                >
                  <p>{title}</p>
                  <p>${parseInt(p.price).toLocaleString('en-US', { type: 'currency', currency: 'USD' })}</p>
                </div>
              </div>
              {admin && 
                <p className='d-flex align-items-center mt-2'>
                  <b>Pulled?</b>
                  {pulled ? (
                      <CheckCircleOutlined 
                        className='text-success ml-4'
                        style={{ fontSize: '30px' }}
                      />
                    ) : (
                      <CloseCircleOutlined 
                        className='text-danger ml-4'
                        style={{ fontSize: '30px' }}
                      />
                    )
                  }
                </p>
              }
              <hr />
            </React.Fragment>
          );
        })
    };
  };

  return (
      <div
        style={{ backgroundColor: '#d5deed'}}
        className='mb-3'
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
  );
};

export default OrderCard;