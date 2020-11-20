import React, { useState, useEffect } from 'react';
import { Card, Tabs } from 'antd';
import { Link } from 'react-router-dom';
import {
  HeartOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import StarRating from 'react-star-ratings';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import defaultImage from '../../images/snake.jpg';
import ProductListItems from './ProductListItems';

const { TabPane } = Tabs;

const SingleProduct = ({ product }) => {
  const {
  	title,
  	images,
  	description,
    _id,
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
        <Tabs
          type='card'
        >
          <TabPane
            tab='Description'
            key='1'
          >
            {description && description}
          </TabPane>
          <TabPane
            tab='Wisdom'
            key='2'
          >
            way more grimy
          </TabPane>
        </Tabs>
      </div>
      <div className="col-md-5">
        <h1 className='bg-info p-3'>{title}</h1>
        <StarRating
          name={_id}
          numberOfStars={5}
          rating={2.3}
          changeRating={(newRating, name) => console.log(newRating, name)}
          isSelectable={true}
          starRatedColor='purple'
        />
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