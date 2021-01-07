import React from 'react';
import ModalImage from 'react-modal-image';
import defaultImage from '../../images/snake.jpg';
import { useDispatch } from 'react-redux';
import {
  DeleteOutlined,
} from '@ant-design/icons';
import { toast } from 'react-toastify';

const ProductCardInCheckout = ({ product }) => {
  const {
  	_id,
  	title,
  	price,
  	// brand,
  	// color,
  	count,
  	images,
  	quantity,
  	// shipping,
    sold,
  } = product;

  // const colors = [
  //   'Black',
  //   'Brown',
  //   'Silver',
  //   'White',
  //   'Blue',
  // ];

  const dispatch = useDispatch();

  // const handleColorChange = (e) => {
  //   let cart = [];
  //   if (typeof window !== undefined) {
  //     if (localStorage.getItem('cart')) {
  //     	cart = JSON.parse(localStorage.getItem('cart'));
  //     }
  //     cart.map((p, idx) => {
  //       if (p._id === _id) {
  //         p.color = e.target.value;
  //       }
  //       return p;
  //     });
  //     localStorage.setItem('cart', JSON.stringify(cart));
  //     dispatch({
  //     	type: 'MODIFY_CART',
  //     	payload: cart
  //     })
  //   }
  // };

  const handleQuantityChange = (e) => {
    let cart = [];
    if (typeof window !== undefined) {
      if (localStorage.getItem('cart')) {
      	cart = JSON.parse(localStorage.getItem('cart'));
      }
      cart.map((p, idx) => {
        if (p._id === _id) {
          p.count = e.target.value;
        }
        return p;
      });
      localStorage.setItem('cart', JSON.stringify(cart));
      dispatch({
      	type: 'MODIFY_CART',
      	payload: cart
      })
    }
  };

  const handleRemove = () => {
    let cart = [];
    if (typeof window !== undefined) {
      if (localStorage.getItem('cart')) {
      	cart = JSON.parse(localStorage.getItem('cart'));
      }
      const newCart = cart.filter((p) => p._id !== _id);
      localStorage.setItem('cart', JSON.stringify(newCart));
      dispatch({
      	type: 'MODIFY_CART',
      	payload: newCart,
      })
    };
    toast.warning(`${title} removed from cart!`);
  };

  return (
    <React.Fragment>
      <div
        className='d-flex justify-content-around'
      >
        <div
          style={{ maxWidth: '150px', height: 'auto' }}
          className='d-flex justify-content-start'
        >
          <ModalImage
            className='float-right'
        	  small={images[0] ? images[0].url : defaultImage}
        	  large={images[0] ? images[0].url : defaultImage}
          />
        </div>
        <div
          className='d-flex flex-column justify-content-around'
        >
          <div>
      	  	<p>{title}</p>
            {sold &&
              <p className="alert alert-danger">
                SOLD
              </p>
            }
      	  	<p>
              {price && price.toLocaleString('en-US',{
                style: 'currency',
                currency: 'USD',
              })}
            </p>
            <div className="d-flex align-items-center pb-1">
              <span>QTY: </span>
              <input 
                style={{ maxWidth: '50px' }}
                type="number"
                className='form-control text-center'
                value={count}
                min='1'
                max={quantity}
                onChange={handleQuantityChange}
              />
            </div>
          </div>
          <DeleteOutlined 
            onClick={handleRemove}
            className='text-danger h-3 align-self-end'
            style={{ cursor: 'pointer' }}
          />
        </div>
      </div>
      <hr />
    </React.Fragment>
  );
};

export default ProductCardInCheckout;