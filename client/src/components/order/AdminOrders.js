import React from 'react';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import PaymentInfo from '../cards/PaymentInfo';
import ProductCardInCheckout from '../cards/ProductCardInCheckout';
import ModalImage from 'react-modal-image';
import defaultImage from '../../images/snake.jpg';

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
      price,
      color, 
      count 
    } = product;
    const {
      brand,
      shipping,
      title,
      images,
    } = product.product;

    return (
      <div className='d-flex my-2 justify-content-between'>
        <div
          // style={{ maxWidth: '150px', height: 'auto' }}
          className='d-flex justify-content-start'
        >
          <ModalImage
            className='float-right'
            small={images[0] ? images[0].url : defaultImage}
            large={images[0] ? images[0].url : defaultImage}
          />
        </div>
        <div>
          <p>{title}</p>
          <p>{price}</p>
        </div>
      </div>
    );

    // return (
    //   <div
    //     key={idx}
    //   >

    //     <td>
    //       <b>{title}</b>
    //     </td>
    //     <td>
    //       {price && price.toLocaleString('en-US',{
    //           style: 'currency',
    //           currency: 'USD',
    //         })}
    //     </td>
    //     <td>
    //       {brand}
    //     </td>
    //     <td>
    //       {color}
    //     </td>
    //     <td>
    //       {count}
    //     </td>
    //     <td className='text-center'>
    //       {shipping === 'Yes' ?
    //         <CheckCircleOutlined className='text-success'/> :
    //         <CloseCircleOutlined className='text-danger'/>
    //       }
    //     </td>
    //   </div>
    // );
  };

  const showProductsInOrder = (products) => {
    return (
      <div>
        {products.map((p, idx) => (
          showProductInfo(p, idx)
        ))}
      </div>
    )
  };

  const showOrders = () => (
    orders.map((o, idx) => (
      <div key={idx} className="row card bg-light">
        {/*<PaymentInfo order={o} showStatus={false}/>*/}
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