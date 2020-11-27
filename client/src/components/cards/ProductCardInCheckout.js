import React from 'react';
import ModalImage from 'react-modal-image';
import defaultImage from '../../images/snake.jpg';

const ProductCardInCheckout = ({ product }) => {
  const {
  	title,
  	price,
  	brand,
  	color,
  	count,
  	images,
  } = product;
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
  	  	<td>{color}</td>
  	  	<td>{count}</td>
        <td>Shipping Icon</td>
        <td>Delete Icon</td>
  	  </tr>
  	</tbody>
  );
};

export default ProductCardInCheckout;