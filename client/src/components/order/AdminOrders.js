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
  const showOrders = () => (
    orders.map((o, idx) => (
      <div key={idx} className="row m-5 p-3 card bg-light">
        <PaymentInfo order={o} showStatus={false}/>
        <div className="row">
          <div className="col-md-4">
            Delivery Status
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