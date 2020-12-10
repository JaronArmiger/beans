import React from 'react';
import { Card } from 'antd';
import defaultImage from '../../images/snake.jpg';
import { Link } from 'react-router-dom';
import {
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

const { Meta } = Card;

const AdminProductCard = ({ product, handleRemove }) => {
  const {
  	title,
  	description,
  	images,
    slug,
  } = product;
  return (
  	<Card
  	  hoverable
  	  cover={
  	  	(<img 
  	  	  	src={(images && images.length > 0) ? images[0].url : defaultImage}
  	  	  	style={{ height: '150px', objectFit: 'cover' }}
  	  	  	className='p-1'
            alt={title}
  	  	 />)
  	  }
  	  actions={[
        <Link
          to={`/admin/product/${slug}`}
        >
  	  	  <EditOutlined
  	  	    className='text-primary'
  	  	  />
        </Link>, 
  	  	<DeleteOutlined 
  	  	  className='text-danger'
          onClick={() => handleRemove(slug)}
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