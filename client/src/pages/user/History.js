import React, { useState, useEffect } from 'react';
import UserNav from '../../components/nav/UserNav';
import PaymentInfo from '../../components/cards/PaymentInfo';
import Invoice from '../../components/order/Invoice';
import OrderCard from '../../components/cards/OrderCard';
import { getUserOrders } from '../../functions/user';
import { useSelector } from 'react-redux';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import { PDFDownloadLink } from '@react-pdf/renderer';

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

  // const showDownloadLink = (order) => {
  //   const date = new Date(order.paymentIntent.created * 1000)
  //     .toLocaleDateString();

  //   return (
  //     <PDFDownloadLink
  //       document={
  //         <Invoice order={order} />
  //       }
  //       fileName={
  //         `invoice${date}.pdf`
  //       }
  //       className='btn btn-sm btn-outline-primary'
  //     >
  //       Download PDF of Receipt
  //     </PDFDownloadLink>
  //   );
  // };

  // const showProductInfo = (product, idx) => {
  //   const {
  //     title,
  //     price,
  //     color, 
  //     count 
  //   } = product;
  //   const {
  //     brand,
  //     shipping,
  //   } = product.product;
  //   return (
  //     <tr key={idx}>
  //       <td>
  //         <b>{title}</b>
  //       </td>
  //       <td>
  //         {price && price.toLocaleString('en-US',{
  //             style: 'currency',
  //             currency: 'USD',
  //           })}
  //       </td>
  //       <td>
  //         {brand}
  //       </td>
  //       <td>
  //         {color}
  //       </td>
  //       <td>
  //         {count}
  //       </td>
  //       <td className='text-center'>
  //         {shipping === 'Yes' ?
  //           <CheckCircleOutlined className='text-success'/> :
  //           <CloseCircleOutlined className='text-danger'/>
  //         }
  //       </td>
  //     </tr>
  //   );
  // };

  // const showProductsInOrder = (products) => {
  //   return (
  //     <table className="table table-bordered">
  //       <thead className='thead-light'>
  //         <tr>
  //           <th scope='col'>
  //             Title
  //           </th>
  //           <th scope='col'>
  //             Price
  //           </th>
  //           <th scope='col'>
  //             Brand
  //           </th>
  //           <th scope='col'>
  //             Color
  //           </th>
  //           <th scope='col'>
  //             Count
  //           </th>
  //           <th scope='col'>
  //             Shipping
  //           </th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {products.map((p, idx) => (
  //           showProductInfo(p, idx)
  //         ))}
  //       </tbody>
  //     </table>
  //   )
  // };

  const showOrders = () => (
    orders.map((o, idx) => (
      <div
        key={idx}
      >
        <OrderCard order={o} />
      </div>
    ))
  );

  return (
  	<div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col pt-3">
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