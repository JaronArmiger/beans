import React, { useState } from 'react';
import { 
  Card, 
  Tooltip 
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
    description,
    images,
    slug,
    price,
  } = product;

  const [tooltip, setTooltip] = useState('Click to add');
  const { user, cart } = useSelector(state => state);

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
        type: "ADD_TO_CART",
        payload: unique,
      });
      toast.success(`${title} added to cart!`);
    }
  };

  const handleRemoveFromCart = () => {
    console.log('remove');
    toast.warning(`${title} removed from cart!`);
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
          </Tooltip>
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