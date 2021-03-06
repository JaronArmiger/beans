import React, { useState, useEffect } from 'react';
import {
  Collapse,
} from 'antd';
import defaultImage from '../../images/snake.jpg';
import Invoice from '../order/Invoice';
import { PDFDownloadLink } from '@react-pdf/renderer';
import {
  CloseCircleOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

const { Panel } = Collapse;

const statusOptions = [
  'Not Processed',
  'Processing',
  'Dispatched',
  'Cancelled',
  'Completed',
];

const OrderCard = ({ order, admin=false, handleStatusChange=null, handleOrderDelete }) => {
  const [activeKey, setActiveKey] = useState([]);
  const [allPulled, setAllPulled] = useState(false);
  const address = order?.userAddress || null;
  const products = order?.products || [];

  useEffect(() => {
    const checkPulled = products.every((p) => {
      if (p.product){
        return p.product.pulled === true;
      } else {
        return false;
      }
    });
    setAllPulled(checkPulled);
  }, [products])

  const calcStatusColor = () => {
    switch (order?.orderStatus) {
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

  const showRetrievalInfo = () => {
    if (address) {
      return (
        <React.Fragment>
          <p
            className='mt-2 mb-0 text-secondary'
            style={{
              fontSize: '0.9em',
            }}
          >
            Orders ship every Tuesday morning, provided they were placed 48 hours prior.
          </p>
          <p
            className='mb-0 text-secondary'
            style={{
              fontSize: '0.9em',
            }}
          >
            Flat-rate shipping only applies to domestic orders. Email us at vintageon18@gmail.com if you're interested in having your order shipped internationally.
          </p>
        </React.Fragment>
        )
      } else {
        return (
          <p
            className='mt-2 text-secondary'
            style={{
              fontSize: '0.9em',
            }}
          >
            Your order will be ready for pickup 48 hours after it is placed. Please bring a valid state ID when picking up your order.
          </p>
        )
      }
  }

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
              defaultValue={order?.orderStatus}
              onChange={e => handleStatusChange(order._id, e.target.value)}
              disabled={!allPulled}
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
            {order?.orderStatus}
          </b>
        </p>
        )}
      <p className='mb-0'><b>Order Id: </b>{order?._id}</p>
      <p className='mb-0'><b>User Email: </b>{order?.userEmail}</p>
      <p className='mb-0'><b>Date Placed: </b>{new Date(order?.createdAt).toLocaleDateString()}</p>
      <p className='mb-0'>
        <b>
          Total:{' '}
        </b>
        ${order?.chargeAmount ? order.chargeAmount.toFixed(2) : 0}
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
      {!admin ? showRetrievalInfo() : ''}
      <div
        className='d-flex justify-content-center mt-4'
      >
        {showDownloadLink()} 
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
                  <p>{title || 'No title'}</p>
                  <p>${p.price ? p.price.toFixed(2) : 0}</p>
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
          Id: {order?._id}
        </h6>
        <div
          className='p-2'
        >
          {showOrderDetail()}
          <hr />
          {showProducts()}
        </div>
        {admin && <div
          className='d-flex justify-content-end'
        >
          <DeleteOutlined 
            style={{ fontSize: '20px' }}
            className={`${(order.orderStatus !== 'Completed' || !allPulled) ? 'text-secondary' : 'text-danger'} mb-4 mr-3`}
            onClick={() => handleOrderDelete(order._id, order.orderStatus, allPulled)}
            disabled={order.orderStatus !== 'Completed'}
          />
        </div>}
      </div>
  );
};

export default OrderCard;