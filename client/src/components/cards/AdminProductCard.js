import React from 'react';
import { Card } from 'antd';
import defaultImage from '../../images/snake.jpg';
import {
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

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
  	  	  	src={(images && images.length > 0) ? images[0].url : defaultImage}
  	  	  	style={{ height: '150px', objectFit: 'cover' }}
  	  	  	className='p-1'
  	  	 />)
  	  }
  	  actions={[
  	  	<EditOutlined
  	  	  className='text-warning'
  	  	/>, 
  	  	<DeleteOutlined 
  	  	  className='text-danger'
  	  	/>
  	  ]}
  	>
  	  <Meta 
  	    title={title}
  	    description={
  	      description ? (
            (description.length > 30) ?
  	        (`${description.substring(0, 30)}...`)
  	        : description
  	      ) : ''
  	    }
  	  />
  	</Card>
  );
};

export default AdminProductCard;