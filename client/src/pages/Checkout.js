import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  getUserCart,
  emptyUserCart,
  saveUserAddress,
  createCashOrder,
} from '../functions/user';
import { 
  applyCoupon,
} from '../functions/cart';
import { validateAddress } from '../functions/address';
import { toast } from 'react-toastify';
import { Collapse } from 'antd';
import ShippingAddress from './ShippingAddress';
import defaultImage from '../images/snake.jpg';


const { Panel } = Collapse;

const initialAddress = {
  firstName: '',
  lastName: '',
  streetAddress: '',
  apartment: '',
  city: '',
  state: '',
  zip: '',
}

const Checkout = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState(initialAddress);
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(null);
  const [activeKey, setActiveKey] = useState(['1']);
  const [addressErrors, setAddressErrors] = useState([]);

  const dispatch = useDispatch();
  const { user, COD } = useSelector(state => state);

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
        setTotalAfterDiscount(null);
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

  const handleAddressChange = (e) => {
    setAddress({...address, [e.target.name]: e.target.value});
  };

  const showProductSummary = () => {
    const productDivs = products
      .map((p, idx) => (
        <div 
          key={idx}
          className='d-flex justify-content-between align-items-center'
        >
          <img
              src={(p.images && p.images[0]) ? p.images[0].url : defaultImage}
              alt={`${p.title}`}
              style={{ maxWidth: '100px', height: 'auto' }}
            />
          <span>{p.title} ({p.color}) x {p.count} = ${p.price * p.count}</span>
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

  const handleOrder = () => {
    const amount = totalAfterDiscount || total;
    if (COD) {
      createCashOrder(user.token, amount)
        .then(res => {
          if (res.data.ok) {
            emptyCart();
            dispatch({
              type: 'COUPON_APPLIED',
              payload: false,
            });
            dispatch({
              type: 'COD',
              payload: false,
            });
          }
          history.push('/user/history');
          return;
        })
        .catch(err => {
          console.log(err);
        })
    } else {
      history.push('/payment');
      return;
    }
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    console.log(address);
    const errorResult = validateAddress(address);
    setAddressErrors(errorResult);

    if (errorResult.length === 0) {
      dispatch({
        type: 'SAVE_ADDRESS',
        payload: address,
      });
      setActiveKey(['2']);
    }
  };

  const handleUSStateChange = (stateVal) => {
    setAddress({...address, state: stateVal })
  };

  const text = 'fuck';

  return (
    <div className="container-fluid">
      <div className="row justify-content-md-center">
        <div className="col-md-6">
          <Collapse
            activeKey={activeKey}
            onChange={(key) => setActiveKey(key)}
          >
            <Panel 
              header="Shipping Address" 
              key="1"
             >
              <ShippingAddress
                handleAddressSubmit={handleAddressSubmit}
                address={address}
                addressErrors={addressErrors}
                handleAddressChange={handleAddressChange}
                handleUSStateChange={handleUSStateChange}
              />
            </Panel>
            <Panel 
              header="Apply Coupon" 
              key="2"
             >
              <h4>Have a coupon?</h4>
              <br />
              {showApplyCoupon()}
            </Panel>
            <Panel 
              header="Payment" 
              key="3"
             >
              <p>{text}</p>
            </Panel>
          </Collapse>
        </div>
      </div>
      <div className="row justify-content-md-center">
        <div className="col-md-6">
          <h4 className='pt-2'>Order Summary</h4>
          <hr />
          <p>({products.length} Item{products.length !== 1 ? 's' : ''})</p>
          <hr />
          {showProductSummary()}
          <hr />
          <p>Cart Total: ${total}</p>
          {totalAfterDiscount && (
            <p className="bg-success p-2">
              Discount Applied Total Payable: ${totalAfterDiscount}
            </p>
          )}
          <div className="row">
            <div className="col-md-6">
              <button 
                className="btn btn-primary"
                disabled={!addressSaved}
                onClick={handleOrder}
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