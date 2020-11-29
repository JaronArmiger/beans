import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductCardInCheckout from '../components/cards/ProductCardInCheckout';
import { userCart } from '../functions/user';
import { toast } from 'react-toastify';

const Cart = ({ history }) => {
  const { user, cart } = useSelector(state => state);
  const dispatch = useDispatch();

  const getTotal = () => {
    return cart.reduce((acc, c) => {
      return acc + (c.count * c.price);
    }, 0)
  };

  const saveOrdertoDb = () => {
    userCart(cart, user.token)
      .then((res) => {
        console.log('CART POST RES', res);
        if (res.data.ok) history.push('/checkout');
      })
      .catch((err) => {
        console.log(err.response);
        if (err.response) {
          if (err.response.statusText === 'Unauthorized') {
            toast.error('Error: Logout and then log in again.')
          }
        }
      });
  };

  const showCartItems = () => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope='col'>Image</th>
          <th scope='col'>Title</th>
          <th scope='col'>Price</th>
          <th scope='col'>Brand</th>
          <th scope='col'>Color</th>
          <th scope='col'>Count</th>
          <th scope='col'>Shipping</th>
          <th scope='col'>Remove</th>
        </tr>
      </thead>
      {cart && cart.map((p) => (
      	<ProductCardInCheckout
      	  key={p._id}
      	  product={p}
      	/>
      ))}
    </table>
  );

  return (
  	<div className="container-fluid pt-2">
  	  <div className="row">
  	  <div className="col-md-8">
  	    <h4>
  	      Cart / {cart.length} product
  	      {cart.length !== 1 ? 's' : ''}
  	    </h4>
  	    {cart.length === 0 ? (
  	      <p>No products in cart</p>
  	      ) : (
  	      showCartItems()
  	    )}
  	  </div>
  	  <div className="col-md-4">
  	    <h4>Order Summary</h4>
  	    <hr />
  	    <p>Products</p>
  	    {cart.map((c, idx) => (
  		  <div 
  		    key={idx}
  		    className=""
  		  >
  		    <p>{c.title} x {c.count} = ${c.price * c.count}</p>
  		  </div>
  	    ))}
  	    <hr />
  	      Total: <b>${getTotal()}</b>
  	    <hr />
  	    {
  	      user ? (
  	        <button
  	          onClick={saveOrdertoDb}
  	          className='btn btn-sm btn-primary mt-2 btn-block'
  	          disabled={cart.length === 0}
  	        >
  	          Proceed to checkout
  	        </button>
  	      ) : (
  	        <button
  	          className='btn btn-sm btn-primary mt-2 btn-block'
  	        >
  	          <Link to={{
  	          	pathname: '/login',
  	          	state: { from: '/cart' }
  	            }}
  	          >
  	          	Log in to checkout
  	          </Link>
  	        </button>
  	      )
  	    }
  	  </div>
  	  </div>
  	</div>
  );
};

export default Cart;