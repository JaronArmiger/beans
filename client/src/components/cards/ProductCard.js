import React, { useState } from 'react';
import { 
  Card, 
} from 'antd';
import {
  EyeOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import defaultImage from '../../images/snake.jpg';
import { Link } from 'react-router-dom';
import { showAverage } from '../../functions/rating';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const {
    title,
    images,
    slug,
    price,
    _id,
    quantity,
    sold,
  } = product;

  const { cart } = useSelector(state => state);

  const dispatch = useDispatch();

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
              className='text-link'
            />
            <br />
            View
          </Link>,
          <React.Fragment>
            {_.some(cart, product) ?
              (<a onClick={handleRemoveFromCart}
                >
                          <ShoppingCartOutlined 
                            className='text-danger'
                          />
                          <br />
                          Remove from Cart
                        </a>) :
              (<a 
                  onClick={handleAddToCart}
                  disabled={sold}
                >
                    <ShoppingCartOutlined 
                      className='text-success'
                    />
                    <br />
                    Add to Cart
                  </a>)}
            </React.Fragment>
        ]}
      >
        <Meta
          className={
            `text-center ${sold ? 'alert alert-danger' : ''}`
          }
          title={title}
          description={
            sold ?
            'SOLD' :
            `${price ? price.toLocaleString('en-US',{
              style: 'currency',
              currency: 'USD',
            }) : ''}`
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