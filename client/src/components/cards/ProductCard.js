import React from 'react';
import { Card } from 'antd';
import {
  EyeOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import defaultImage from '../../images/snake.jpg';
import { Link } from 'react-router-dom';
import { showAverage } from '../../functions/rating';

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const {
    title,
    description,
    images,
    slug,
    price,
  } = product;

  return (
    <React.Fragment>
      {(product && product.ratings && product.ratings.length > 0) ? (
          showAverage(product.ratings)
        ) : (
          <div className="text-center pt-1 pb-3">
            No ratings yet
          </div>
        )}
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
          className='text-center'
          title={title}
          description={
            `$${price}`
            // description ? (
            //   (description.length > 30) ?
            //   (`${description.substring(0, 30)}...`)
            //   : description
            // ) : ''
          }
        /> 
      </Card>
    </React.Fragment>
  );
};

export default ProductCard;