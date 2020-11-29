import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  getUserCart,
  emptyUserCart,
  saveUserAddress,
  applyCoupon,
} from '../functions/user';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Checkout = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState('');
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);

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
        setTotalAfterDiscount(0);
        toast.success('Cart emptied');
      })
      .catch((err) => console.log(err));
  };

  const applyDiscountCoupon = () => {
    applyCoupon(user.token, coupon)
      .then(res => {
        console.log(res.data);
        setTotalAfterDiscount(res.data);
        dispatch({
          type: 'COUPON_APPLIED',
          payload: true,
        });
        toast.success(`${coupon} applied successfully!`);
        setCoupon('');
      })
      .catch(err => {
        if (err.response.data.err) {
          console.log(err.response.data.err);
          toast.error(err.response.data.err);
        }
        setCoupon('');
      })
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
        Save Address
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

  const showApplyCoupon = () => (
    <React.Fragment>
      <label className="text-muted">
        Coupon Code
      </label>
      <input 
        type="text"
        onChange={(e) => setCoupon(e.target.value)}
        value={coupon}
        className='form-control'
      />
      <button 
        className="btn btn-primary mt-2"
        onClick={applyDiscountCoupon}
      >
        Apply
      </button>
    </React.Fragment>
  );

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
  	    {showApplyCoupon()}
  	  </div>
  	  <div className="col-md-6">
  	    <h4>Order Summary</h4>
  	    <hr />
  	    <p>{products.length} Product{products.length !== 1 ? 's' : ''}</p>
  	    <hr />
  	    {showProductSummary()}
  	    <hr />
  	    <p>Cart Total: ${total}</p>
        {totalAfterDiscount > 0 && (
          <p className="bg-success p-2">
            Discount Applied Total Payable: ${totalAfterDiscount}
          </p>
        )}
  	    <div className="row">
  	      <div className="col-md-6">
  	        <button 
              className="btn btn-primary"
              disabled={!addressSaved}
              onClick={() => history.push('/payment')}
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