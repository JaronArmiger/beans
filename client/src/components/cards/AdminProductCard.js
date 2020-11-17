import React from 'react';
import { Card } from 'antd';

const { Meta } = Card;

const AdminProductCard = ({ product }) => {
  const {
  	title,
  	description,
  	images,
  } = product;
  return (
  	<Card
  	  hoverable
  	  cover={
  	  	(<img 
  	  	  	src={(images && images.length > 0) ? images[0].url : ''}
  	  	  	style={{ height: '150px', objectFit: 'cover' }}
  	  	 />)
  	  }
  	  className='p-1'
  	>
  	  <Meta 
  	    title={title}
  	    description={description}
  	  />
  	</Card>
  );
};

export default AdminProductCard;