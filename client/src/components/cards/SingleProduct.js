import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import {
  HeartOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';

const { Meta } = Card;

const SingleProduct = ({ product }) => {
  const {
  	title,
  	description,
  	images,
  	slug,
  } = product;

  return (
    <React.Fragment>
      <div className="col-md-7">
        image carousel
      </div>
      <div className="col-md-5">
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
          <Meta 
            title={title}
            description={description}
          />
        </Card>
      </div>
    </React.Fragment>
  );
};

export default SingleProduct;