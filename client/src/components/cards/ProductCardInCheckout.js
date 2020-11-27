import React from 'react';
import ModalImage from 'react-modal-image';
import defaultImage from '../../images/snake.jpg';
import { useDispatch } from 'react-redux';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
} from '@ant-design/icons';

const ProductCardInCheckout = ({ product }) => {
  const {
  	_id,
  	title,
  	price,
  	brand,
  	color,
  	count,
  	images,
  	quantity,
  	shipping,
  } = product;

  const colors = [
    'Black',
    'Brown',
    'Silver',
    'White',
    'Blue',
  ];

  const dispatch = useDispatch();

  const handleColorChange = (e) => {
    let cart = [];
    if (typeof window !== undefined) {
      if (localStorage.getItem('cart')) {
      	cart = JSON.parse(localStorage.getItem('cart'));
      }
      cart.map((p, idx) => {
        if (p._id === _id) {
          p.color = e.target.value;
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
    }
  };

  return (
  	<tbody>
  	  <tr>
  	  	<td>
  	  	  <div 
  	  	    style={{maxWidth: '150px', height: 'auto'}}
  	  	  >
  	        <ModalImage
  	      	  small={images ? images[0].url : defaultImage}
  	      	  large={images ? images[0].url : defaultImage}
            />
  	  	  </div>
  	  	</td>
  	  	<td>{title}</td>
  	  	<td>${price}</td>
  	  	<td>{brand}</td>
  	  	<td>
  	  	  <select 
  	  	    name="color" 
  	  	    id=""
  	  	    className='form-control'
  	  	    style={{ cursor: 'pointer' }}
  	  	    onChange={handleColorChange}
  	  	    defaultValue={color}
  	  	  >
  	  	    {colors.map((c, idx) => (
  	  	      <option 
  	  	        value={c}
  	  	        key={idx}
  	  	      >{c}
  	  	      </option>
  	  	    ))}
  	  	  </select>
  	  	</td>
  	  	<td>
  	  	  <input 
  	  	    style={{ maxWidth: '50px' }}
  	  	    type="number"
  	  	    className='form-control'
  	  	    value={count}
  	  	    min='1'
  	  	    max={quantity}
  	  	    onChange={handleQuantityChange}
  	  	  />
  	  	</td>
        <td className='text-center'>
          {(shipping && shipping ==='Yes') ? (
          	<CheckCircleOutlined className='text-success' />
          ) : (
            <CloseCircleOutlined className='text-danger' />
          )}
        </td>
        <td className='text-center'>
          <CloseOutlined 
            onClick={handleRemove}
            className='text-danger'
            style={{ cursor: 'pointer' }}
          />
        </td>
  	  </tr>
  	</tbody>
  );
};

export default ProductCardInCheckout;