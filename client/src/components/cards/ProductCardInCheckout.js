import React from 'react';
import ModalImage from 'react-modal-image';
import defaultImage from '../../images/snake.jpg';
import { useDispatch } from 'react-redux';

const ProductCardInCheckout = ({ product }) => {
  const {
  	title,
  	price,
  	brand,
  	color,
  	count,
  	images,
  	quantity,
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
        if (p._id === product._id) {
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
        if (p._id === product._id) {
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
        <td>Shipping Icon</td>
        <td>Delete Icon</td>
  	  </tr>
  	</tbody>
  );
};

export default ProductCardInCheckout;