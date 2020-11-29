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
    _id,
    quantity,
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
      setTooltip("Remove from cart");

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
    setTooltip("Click to add");
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
            {quantity}
            View
          </Link>,
          <Tooltip title={tooltip}>
            {_.some(cart, product) ?
              (<a onClick={handleRemoveFromCart}
                >
                          <ShoppingCartOutlined 
                            className='text-danger'
                          />
                          <br />
                          Remove from Cart
                        </a>) :
              (<a onClick={handleAddToCart}
                disabled={quantity===0}>
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
          className={
            `text-center ${quantity === 0 ? 'alert alert-danger' : ''}`
          }
          title={title}
          description={
            quantity === 0 ?
            'OUT OF STOCK' :
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