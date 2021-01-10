import React from 'react';

const ProductListItems = ({ product }) => {
  const {
    title,
  	price,
  	shipping,
  	sold,
    size,
    description,
  } = product;

  return (
    <div
      className='d-flex flex-column align-items-start'
      style={{ textTransform: 'uppercase' }}
    >
      {sold && (
        <div 
          className="alert alert-danger"
          style={{ width: '100%' }}
        >
          SOLD
        </div>
      )}
      <p className='mb-3'>{title}</p>
      <p className='mb-3'>
        ${price}
      </p>
      <p className='mb-1'>{description}</p>
      <hr />
      <p className='mb-1'>Size: {size}</p>
      <p className='mb-2'><b>Shipping Available? </b>{shipping}</p>
    </div>
  );
};

export default ProductListItems;