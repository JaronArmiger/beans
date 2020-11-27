import React from 'react';

const ProductCardInCheckout = ({ product }) => {
  const {
  	title,
  	price,
  	brand,
  	color,
  	count,
  } = product;
  return (
  	<tbody>
  	  <tr>
  	  	<td>Image</td>
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