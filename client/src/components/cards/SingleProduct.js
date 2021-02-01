import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Tabs, 
} from 'antd';
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
import { addToWishlist } from '../../functions/wishlist';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';


const SingleProduct = ({ 
  product, 
  onStarClick,
  star,
}) => {
  const {
  	title,
  	images,
    _id,
    sold,
  } = product;

  const intialWidth = typeof window !== 'undefined' ? window.innerWidth : 1000;
  const [windowWidth, setWindowWidth] = useState(intialWidth);
  const { cart, user } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', () => {
      setWindowWidth(window.innerWidth);
    })
    }
  }, []);

  const handleAddToCart = () => {
    if (sold) {
      toast.error(`${title} is currently out of stock. Sorry :(`);
      return;
    }
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
    toast.info(`${title} removed from cart!`);
  };

  const handleAddToWishlist = (e) => {
    addToWishlist(_id, user.token)
      .then(res => {
        if (res.data.ok) {
          toast.success(`"${title}" added to wishlist! View in your dashboard!`);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      <div className="col-md-7">
        <Carousel
          infiniteLoop
          dots={false}
        >
          {(images && images.length > 0) ? images.map((i, idx) => {
            return (
              <div
                key={idx}
                style={{
                  height: `${(windowWidth > 900 ? '75vh' : '400px')}`,
                  width: '100%',
                  backgroundImage: `url(${i.url})`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                }}
              />
            );
          }) : <div 
                  style={{
                    height: '400px',
                    width: `400px`,
                    backgroundImage: `url(${defaultImage})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                  }}
                />
          }
        </Carousel>
      </div>
      <div className="col-md-5">
        <ProductListItems product={product}/>
        <div>
          {_.some(cart, product) ? (
            <button
              className='btn btn-outline'
              onClick={handleRemoveFromCart}
            >
              Remove from Cart
            </button>
          ) : (
            <button
              className='btn btn-outline'
              onClick={handleAddToCart}
              disabled={sold}
            >
              Add to Cart
            </button>
          )}
        </div>
        {/*<Card
                  actions={[
                    <React.Fragment>
                    {_.some(cart, product) ?
                      (<a onClick={handleRemoveFromCart}>
                          <ShoppingCartOutlined 
                            className='text-danger'
                          />
                          <br />
                          Remove from Cart
                        </a>) :
                      (<a onClick={handleAddToCart}
                          disabled={sold}
                        >
                          <ShoppingCartOutlined 
                            className='text-success'
                          />
                          <br />
                          Add to Cart
                        </a>)}
                    </React.Fragment>,
                    // <a onClick={handleAddToWishlist}>
                    //   <HeartOutlined className='text-info'/>
                    //   <br />
                    //   Add to Wishlist
                    // </a>,
                   //  <RatingModal>
                   //    <StarRating
                   //      name={_id}
                   //      numberOfStars={5}
                   //      rating={star}
                   //      changeRating={onStarClick}
                   //      isSelectable={true}
                   //      starRatedColor='purple'
                   //    />
                   //  </RatingModal>
                  ]}
                >
          <ProductListItems
            product={product}
          />
        </Card>*/}
      </div>
    </React.Fragment>
  );
};

export default SingleProduct;