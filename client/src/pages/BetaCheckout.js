import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  userCart,
  // getUserCart,
  emptyUserCart,
  saveUserAddress,
  createCashOrder,
} from '../functions/user';
import {
  getCart,
  applyCoupon,
} from '../functions/cart';
import { validateAddress } from '../functions/address';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import SelectUSState from 'react-select-us-states';
import { Collapse } from 'antd';
import ShippingAddress from './ShippingAddress';
import defaultImage from '../images/snake.jpg';
import ModalImage from 'react-modal-image';
import SquareContainer from '../components/square/SquareContainer';


const { Panel } = Collapse;

const initialAddress = {
  firstName: '',
  lastName: '',
  streetAddress: '',
  apartment: '',
  city: '',
  state: '',
  zip: '',
  firstName: '',
}

const BetaCheckout = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [address, setAddress] = useState(initialAddress);
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(null);
  const [activeKey, setActiveKey] = useState(['1']);
  const [addressErrors, setAddressErrors] = useState([]);
  const [chargeAmount, setChargeAmount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);

  const dispatch = useDispatch();
  const { 
    user, 
    cart,
    COD,
    cartId,
  } = useSelector(state => state);

  useEffect(() => {
    if (user) {
      userCart(cart, user.token)
        .then((res) => {
          setProducts(res.data.products);
          setCartTotal(res.data.cartTotal);
          setTotalAfterDiscount(parseInt(res.data.totalAfterDiscount));
          dispatch({
            type: 'MODIFY_CART_ID',
            payload: res.data._id,
          });
          if (typeof window !== 'undefined') {
            localStorage.setItem("cartId", res.data._id);
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      if (cartId) {
        getCart(cartId)
          .then((res) => {
            setProducts(res.data.products);
            setCartTotal(res.data.cartTotal);
            setTotalAfterDiscount(res.data.totalAfterDiscount);
            dispatch({
              type: 'MODIFY_CART_ID',
              payload: res.data._id,
            });
            if (typeof window !== 'undefined') {
              localStorage.setItem("cartId", res.data._id);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }, [user]);

  useEffect(() => {
    setChargeAmount(totalAfterDiscount || cartTotal);
  }, [cartTotal, totalAfterDiscount]);

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
        setCartTotal(0);
        setTotalAfterDiscount(null);
        toast.success('Cart emptied');
      })
      .catch((err) => console.log(err));
  };

  const applyDiscountCoupon = () => {
    applyCoupon(cartId, coupon)
      .then(res => {
        console.log(res.data);
        setTotalAfterDiscount(parseInt(res.data));
        dispatch({
          type: 'COUPON_APPLIED',
          payload: true,
        });
        toast.success(`${coupon} applied successfully!`);
        setCouponApplied(true);
        setCoupon('');
      })
      .catch(err => {
        if (err.response.data.err) {
          console.log(err.response.data.err);
          toast.warning(err.response.data.err);
        }
        setCoupon('');
      })
  };

  const handleAddressChange = (e) => {
    setAddress({...address, [e.target.name]: e.target.value});
  };

  const showProductSummary = () => {
    const productDivs = products
      .map((p, idx) => {
        const {
          images,
          title,
          price,
        } = p.product

        return (
          <React.Fragment
            key={idx}
          >
            <div 
              className='d-flex justify-content-between align-items-center'
            > 
              <img
                  src={(images && images[0]) ? images[0].url : defaultImage}
                  alt={`${title}`}
                  style={{ maxWidth: '100px', height: 'auto' }}
                />
              <span>{title} x {p.count} = {(p.price * p.count).toLocaleString('en-US',{
              style: 'currency',
              currency: 'USD',
            })}</span>
            </div>
            <hr />
          </React.Fragment>
        );
      });
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
      <div className="d-flex justify-content-around">
        <button 
          className="btn btn-outline-info mt-2"
          onClick={applyDiscountCoupon}
        >
          Apply
        </button>
        <button 
          className="btn btn-outline-info mt-2"
          onClick={() => setActiveKey(['3'])}
        >
          Continue
        </button>
      </div>
      {couponApplied &&
        <div
          className='text-center bg-success py-2 mt-1'
        >
          Coupon Applied!
        </div>
      }
    </React.Fragment>
  );

  const handleOrder = () => {
    const amount = totalAfterDiscount || cartTotal;
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
              <SquareContainer chargeAmount={chargeAmount}/>
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
          <p>Cart Total: {cartTotal.toLocaleString('en-US',{
              style: 'currency',
              currency: 'USD',
            })}</p>
          {totalAfterDiscount && (
            <p className="bg-success p-2">
              Discount Applied; Total Payable: ${totalAfterDiscount.toLocaleString('en-US',{
              style: 'currency',
              currency: 'USD',
            })}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BetaCheckout;