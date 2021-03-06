import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { createCart } from '../functions/cart';
import { useSelector, useDispatch } from 'react-redux';
import { addEmail } from '../functions/mailingList';

const PreCheckout = ({ history }) => {
  const [email, setEmail] = useState('');
  const [wantMail, setWantMail] = useState(false);
  const { cart, cartId, user } = useSelector(state => state);

  useEffect(() => {
    if (user) history.push('/beta-checkout');
  }, [user]);

  const dispatch = useDispatch();
  // need to save cart from here too
  

  const handleSubmit = (e) => {
    e.preventDefault();
    createCart(cart, email, cartId)
      .then(async (res) => {
        dispatch({
          type: 'MODIFY_CART_ID',
          payload: res.data.cartId,
        });
        if (typeof window !== 'undefined') {
          localStorage.setItem("cartId", res.data.cartId);
        }
        if (wantMail) {
          await addEmail(email);
        }
        history.push('/gamma-checkout');
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
              <div className="form-check mb-2">
                <input 
                  type='checkbox' 
                  className='form-check-input'
                  id='wantMailCheck'
                  checked={wantMail} 
                  onChange={e => setWantMail(e.target.checked)}
                />
                <label 
                  htmlFor="wantMailCheck" 
                  className="form-check-label"
                  style={{
                    fontSize: '.9em',
                    color: 'FFF'
                  }}
                >
                  I want to receive emails about dope deals and events
                </label>
              </div>
              <button
                className='btn btn-primary'
                disabled={!email}
              >
                Continue
              </button>
            </form>
            <p>
              {wantMail ? 'yes' : 'no'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreCheckout;