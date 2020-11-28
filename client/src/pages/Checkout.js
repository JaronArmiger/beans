import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserCart } from '../functions/user';

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const dispatch = useDispatch();
  const { user } = useSelector(state => state);

  useEffect(() => {
    getUserCart(user.token)
      .then((res) => {
        setProducts(res.data.products);
        setTotal(res.data.cartTotal);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  const saveAddressToDb = () => {
    
  };

  return (
  	<div className="row">
  	  <div className="col-md-6">
  	    <h4>Delivery Address</h4>
  	    <br />
  	    <br />
  	    textarea
  	    <button 
  	      className="btn btn-primary mt-2"
  	      onClick={saveAddressToDb}
  	    >
  	      Save
  	    </button>
  	    <hr />
  	    <h4>Have a coupon?</h4>
  	    <br />
  	    coupon input and apply button
  	  </div>
  	  <div className="col-md-6">
  	    <h4>Order Summary</h4>
  	    <hr />
  	    <p>{products.length} Product{products.length !== 1 ? 's' : ''}</p>
  	    <hr />
  	    {products.map((p, idx) => (
          <div key={idx}>
            <p>{p.title} ({p.color}) x {p.count} = ${p.price * p.count}</p>
          </div>
        ))}
  	    <hr />
  	    <p>Cart Total: ${total}</p>
  	    <div className="row">
  	      <div className="col-md-6">
  	        <button className="btn btn-primary">Place Order</button>
  	      </div>
  	      <div className="col-md-6">
  	        <button className="btn btn-primary">Empty Cart</button>
  	      </div>
  	    </div>
  	  </div>
  	</div>
  );
};

export default Checkout;