import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { createCart } from '../functions/cart';
import { useSelector, useDispatch } from 'react-redux';

const PreCheckout = () => {
  const [email, setEmail] = useState('');
  const { cart, cartId } = useSelector(state => state);

  const dispatch = useDispatch();
  // need to save cart from here too
  

  const handleSubmit = (e) => {
    e.preventDefault();
    createCart(cart, email, cartId)
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: 'MODIFY_CART_ID',
          payload: res.data.cartId,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col">
          <h4 className='text-center py-2'>Checkout</h4>
          <div
            className='d-flex flex-column align-items-center'
          >
            <div>
              <Link 
                to={{
                  pathname: '/login',
                  state: { from: '/beta-checkout' }
                }}
              >
                <Button
                  // onClick={googleLogin}
                  type='danger' // color type
                  className='mb-3'
                   // to make it stretch horizontally
                  size='large'
                >
                  Login to Complete Purchase
                </Button>
              </Link>
            </div>
            <br />
            <h5 className='mb-5'>or</h5>
            <h5>Continue as Guest</h5>
            <form
              onSubmit={handleSubmit}
              className='d-flex flex-column align-items-center'
            >
              <div className="form-group">
                <input 
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Email *'
                  className='form-control'
                />
              </div>
              <button
                className='btn btn-primary'
              >
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreCheckout;