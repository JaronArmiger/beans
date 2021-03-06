import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductCardInCheckout from '../components/cards/ProductCardInCheckout';

const Cart = ({ history }) => {
  const { user, cart } = useSelector(state => state);
  const [noneSold, setNoneSold] = useState(false);
  const [canShip, setCanShip] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    let anySold = false;
    let allShippable = true;
    cart.forEach((p) => {
      if (p.sold === true) {
        anySold = true;
      };
      if (p.shipping === 'No') {
        allShippable = false;
      }
    });
    if (!anySold) setNoneSold(true);
    setCanShip(allShippable);
  }, [cart]);

  const getTotal = () => {
    return cart.reduce((acc, c) => {
      return acc + (c.count * c.price);
    }, 0).toLocaleString('en-US',{
              style: 'currency',
              currency: 'USD',
            });
  };

  const emptyCart = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart');
    };
    dispatch({ type: 'CLEAR_CART' });
  };

  // const saveOrdertoDb = (cod=false) => {
  //   if (cod) {
  //     dispatch({
  //       type: 'COD',
  //       payload: true,
  //     })
  //   };
  //   userCart(cart, user.token)
  //     .then((res) => {
  //       console.log('CART POST RES', res);
  //       if (res.data.ok) history.push('/checkout');
  //     })
  //     .catch((err) => {
  //       console.log(err.response);
  //       if (err.response) {
  //         if (err.response.statusText === 'Unauthorized') {
  //           toast.error('Error: Logout and then log in again.')
  //         }
  //       }
  //     });
  // };

  // const saveOrdertoDbBeta = () => {
  //   if (!noneSold) return;

  //   if (user) {
  //     history.push('/beta-checkout');
  //   } else {
  //     history.push('/pre-checkout');
  //   }
  // };
  const saveOrdertoDbGamma = () => {
    if (!noneSold) return;

    if (user) {
      history.push('/gamma-checkout');
    } else {
      history.push('/pre-checkout');
    }
  };

  // check sold

  const showCartItems = () => (
    <React.Fragment>
      {cart && cart.map((p) => (
      	<ProductCardInCheckout
      	  key={p._id}
      	  product={p}
      	/>
      ))}
    </React.Fragment>
  );

  return (
  	<div className="container-fluid pt-2">
  	  <div className="row justify-content-center">
    	  <div className="col-lg-6">
    	    <h4>
    	      Cart / {cart.length} product
    	      {cart.length !== 1 ? 's' : ''}
    	    </h4>
          <hr />
    	    {cart.length === 0 ? (
    	      <p>No products in cart</p>
    	      ) : (
    	      showCartItems()
    	    )}
          {cart.length > 0 && (
            <button 
              className="btn btn-outline-danger m-1 float-right"
              onClick={emptyCart}
            >
              Empty Cart
            </button>
          )}
    	  </div>
        <div className="col-lg-6">
          <h4>Order Summary</h4>
          <hr />
          <p>Products</p>
          {cart.map((c, idx) => (
          <div 
            key={idx}
            className=""
          >
            <p>
              {c.title} x {c.count} = {(c.price * c.count).toLocaleString('en-US',{
                style: 'currency',
                currency: 'USD',
              })}
            </p>
          </div>
          ))}
          <hr />
            Total: <b>{getTotal()}</b>
          <hr />
          {!noneSold && 
            <div className="alert alert-danger">
              <p className='mb-0'>A product in your cart has been sold already.</p>
              <p className='mb-0'>Please remove it in order to proceed to checkout.</p>
            </div>
          }
          <React.Fragment>
            {/*<button
                          onClick={saveOrdertoDbBeta}
                          className='btn btn-sm btn-primary btn-outline-primary mt-2 btn-block'
                          disabled={cart.length === 0 || !noneSold}
                        >
                          Checkout
                        </button>*/}
            {!canShip && (
              <React.Fragment>
                <p 
                  className='mb-0'
                  style={{ 
                    color: 'orange',
                    fontWeight: 'bold'
                  }}
                 >
                   Notice: Your cart contains items that aren't available for shipping.
                 </p>
                 <p 
                   className='mb-0'
                  style={{ 
                    color: 'orange',
                    fontWeight: 'bold'
                  }}
                 >
                   Remove these items if you want your order shipped.
                 </p>
              </React.Fragment>
            )}
            <button
              onClick={saveOrdertoDbGamma}
              className='btn btn-sm btn-primary btn-outline-primary mt-2 btn-block'
              disabled={cart.length === 0 || !noneSold}
            >
              Checkout
            </button>
            {/* <br />
                            <button
                              onClick={() => saveOrdertoDb(false)}
                              className='btn btn-sm btn-primary btn-outline-primary mt-2 btn-block'
                              disabled={cart.length === 0}
                            >
                              Checkout
                            </button>
                            <br />
                            <button
                              onClick={() => saveOrdertoDb(true)}
                              className='btn btn-sm btn-warning btn-outline-warning mt-2 btn-block'
                              disabled={cart.length === 0}
                            >
                              Pay Cash on Delivery
                            </button>*/}
          </React.Fragment>
        </div>
      </div>
      <div className="row justify-content-center">

  	  </div>
  	</div>
  );
};

export default Cart;