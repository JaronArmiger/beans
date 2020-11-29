import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  getUserCart,
  emptyUserCart,
  saveUserAddress,
} from '../functions/user';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState('');
  const [addressSaved, setAddressSaved] = useState(false);

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
    saveUserAddress(user.token, address)
      .then(res => {
        if (res.data.ok) setAddressSaved(true);
        toast.success('Address saved')
      })
      .catch(err => console.log(err));
  };

  const emptyCart = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart');
    };
    dispatch({ type: 'CLEAR_CART' });

    emptyUserCart(user.token)
      .then((res) => {
        setProducts([]);
        setTotal(0);
        toast.success('Cart emptied');
      })
      .catch((err) => console.log(err));
  };

  const showAddressField = () => (
    <React.Fragment>
      <ReactQuill 
        theme='snow'
        value={address}
        onChange={setAddress}
      />
      <button 
        className="btn btn-primary mt-2"
        onClick={saveAddressToDb}
      >
        Save
      </button>
    </React.Fragment>
  );

  const showProductSummary = () => {
    const productDivs = products
      .map((p, idx) => (
        <div key={idx}>
          <p>{p.title} ({p.color}) x {p.count} = ${p.price * p.count}</p>
        </div>
      ));
    return productDivs;
  };

  return (
    <div className="container-fluid">
  	<div className="row">
  	  <div className="col-md-6">
  	    <h4>Delivery Address</h4>
  	    <br />
  	    <br />
  	    {showAddressField()}
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
  	    {showProductSummary()}
  	    <hr />
  	    <p>Cart Total: ${total}</p>
  	    <div className="row">
  	      <div className="col-md-6">
  	        <button 
              className="btn btn-primary"
              disabled={!addressSaved}
            >
              Place Order
            </button>
  	      </div>
  	      <div className="col-md-6">
  	        <button 
              className="btn btn-primary"
              onClick={emptyCart}
              disabled={products.length === 0}
            >
              Empty Cart
            </button>
  	      </div>
  	    </div>
  	  </div>
  	</div>
    </div>
  );
};

export default Checkout;