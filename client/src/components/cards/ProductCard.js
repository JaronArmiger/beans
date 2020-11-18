import React from 'react';
import { Card } from 'antd';
import {
  EyeOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import defaultImage from '../../images/snake.jpg';
import { Link } from 'react-router-dom';

const { Meta } = Card;

const ProductCard = ({ product, }) => {
  const {
    title,
    description,
    images,
    slug,
  } = product;

  return (
    <Card
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
          to={`/product/${slug}`}
        >
          <EyeOutlined
            className='text-warning'
          />
          <br />
          View
        </Link>, 
        <React.Fragment>
          <ShoppingCartOutlined 
            className='text-danger'
          />
          <br />
          Add to Cart
        </React.Fragment>
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

export default ProductCard;