import React from 'react';

const ProductListItems = ({ product }) => {
  const {
    title,
  	price,
  	shipping,
  	sold,
  } = product;

  return (
    <div
      className='d-flex flex-column align-items-center'
    >
      {sold && (
        <div 
          className="alert alert-danger"
          style={{ width: '100%' }}
        >
          SOLD
        </div>
      )}
      <h6>{title}</h6>
      <h6>{price ? price.toLocaleString('en-US',{
              style: 'currency',
              currency: 'USD',
            }) : ''}</h6>
      <p><b>Shipping Available? </b>{shipping}</p>
    </div>
  );
};

export default ProductListItems;