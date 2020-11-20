import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import {
  HeartOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import defaultImage from '../../images/snake.jpg';
import ProductListItems from './ProductListItems';


const SingleProduct = ({ product }) => {
  const {
  	title,
  	images,
  } = product;

  return (
    <React.Fragment>
      <div className="col-md-7">
        <Carousel
          showArrows={true}
          autoPlay
          infiniteLoop
        >
          {(images && images.length > 0) ? images.map((i) => {
          	return (
          	  <img src={i.url} alt={title} key={i.public_id} />
          	);
          }) : <img src={defaultImage} alt={title} />}
        </Carousel>
      </div>
      <div className="col-md-5">
        <h1 className='bg-info p-3'>{title}</h1>
        <Card
          actions={[
          	<React.Fragment>
          	  <ShoppingCartOutlined className='text-success'/>
          	  Add to Cart
          	</React.Fragment>,
          	<Link to=''>
          	  <HeartOutlined className='text-info'/>
          	  <br />
          	  Add to Wishlist
          	</Link>
          ]}
        >
          <ProductListItems
            product={product}
          />
        </Card>
      </div>
    </React.Fragment>
  );
};

export default SingleProduct;