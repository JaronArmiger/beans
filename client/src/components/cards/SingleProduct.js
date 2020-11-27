import React, { useState } from 'react';
import { 
  Card, 
  Tabs, 
  Tooltip,
} from 'antd';
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
import RatingModal from '../modals/RatingModal';
import { showAverage } from '../../functions/rating';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const { TabPane } = Tabs;

const SingleProduct = ({ 
  product, 
  onStarClick,
  star,
}) => {
  const {
  	title,
  	images,
  	description,
    _id,
  } = product;

  const [tooltip, setTooltip] = useState('Click to add');
  const { cart } = useSelector(state => state);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    let cart = [];
    if (typeof window !== "undefined") {
      // if cart is in local storage GET it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // push new product to cart
      cart.push({
        ...product,
        count: 1,
      });
      // remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);
      // save to local storage
      // console.log('unique', unique)
      localStorage.setItem("cart", JSON.stringify(unique));
      // show tooltip
      setTooltip("Added");

      // add to reeux state
      dispatch({
        type: "MODIFY_CART",
        payload: unique,
      });
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
      // toast.success(`${title} added to cart!`);
    }
  };

  const handleRemoveFromCart = () => {
    let cart = [];
    if (typeof window !== undefined) {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }
      const newCart = cart.filter((p) => p._id !== _id);
      localStorage.setItem('cart', JSON.stringify(newCart));
      dispatch({
        type: 'MODIFY_CART',
        payload: newCart,
      })
    }
    toast.warning(`${title} removed from cart!`);
  };

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
        {(product && product.ratings && product.ratings.length > 0) ? (
          showAverage(product.ratings)
        ) : (
          <div className="text-center pt-1 pb-3">
            No ratings yet
          </div>
        )}
        <Card
          actions={[
          	<Tooltip title={tooltip}>
            {_.some(cart, product) ?
              (<a onClick={handleRemoveFromCart}>
                          <ShoppingCartOutlined 
                            className='text-danger'
                          />
                          <br />
                          Remove from Cart
                        </a>) :
              (<a onClick={handleAddToCart}>
                          <ShoppingCartOutlined 
                            className='text-success'
                          />
                          <br />
                          Add to Cart
                        </a>)}
          </Tooltip>,
          	<Link to=''>
          	  <HeartOutlined className='text-info'/>
          	  <br />
          	  Add to Wishlist
          	</Link>,
            <RatingModal>
              <StarRating
                name={_id}
                numberOfStars={5}
                rating={star}
                changeRating={onStarClick}
                isSelectable={true}
                starRatedColor='purple'
              />
            </RatingModal>
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