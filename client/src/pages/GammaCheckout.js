import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  userCart,
  saveUserAddress,
  createCashOrder,
} from '../functions/user';
import {
  getCart,
  applyCoupon,
  removeCart,
} from '../functions/cart';
import {
  createOrder,
} from '../functions/order';
import {
  saveAddress,
  validateAddress,
} from '../functions/address';
import { toast } from 'react-toastify';
import SelectUSState from 'react-select-us-states';
import { Collapse } from 'antd';
import ShippingAddress from './ShippingAddress';
import defaultImage from '../images/snake.jpg';
import ModalImage from 'react-modal-image';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripeCheckout from '../components/StripeCheckout';
import '../stripe.css';

const promise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY);


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
  const [addressId, setAddressId] = useState('');
  const [coupon, setCoupon] = useState('');
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(null);
  const [activeKey, setActiveKey] = useState(['1']);
  const [addressErrors, setAddressErrors] = useState([]);
  const [chargeAmount, setChargeAmount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [shipping, setShipping] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [cardElement, setCardElement] = useState(null);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [payable, setPayable] = useState(0);

  const dispatch = useDispatch();

  const { 
    user, 
    cart,
    COD,
    cartId,
  } = useSelector(state => state);

  useEffect(() => {
    let mounted = true;
    if (user) {
      userCart(cart, user.token)
        .then((res) => {
          if (mounted) {
            setProducts(res.data.products);
            setCartTotal(res.data.cartTotal);
            setTotalAfterDiscount(parseInt(res.data.totalAfterDiscount));
          }
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
          console.log(err.response);
          // if ()
        });
    } else {
      if (cartId) {
        getCart(cartId)
          .then((res) => {
            if (mounted) {
              setProducts(res.data.products);
              setCartTotal(res.data.cartTotal);
              setTotalAfterDiscount(res.data.totalAfterDiscount);
            }
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
    return () => mounted = false;
  }, [user]);

  useEffect(() => {
    setChargeAmount(totalAfterDiscount || cartTotal);
  }, [cartTotal, totalAfterDiscount]);


  const emptyCart = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart');
    };
    dispatch({ type: 'CLEAR_CART' });

    removeCart(cartId)
      .then((res) => {
        setProducts([]);
        setCartTotal(0);
        setTotalAfterDiscount(null);
        dispatch({
          type: 'MODIFY_CART_ID',
          payload: null,
        });

        if (typeof window !== 'undefined') {
          localStorage.removeItem('cartId');
        };
        dispatch({
          type: 'COUPON_APPLIED',
          payload: false,
        });
        dispatch({
          type: 'SET_PAYMENT_STATUS',
          payload: null,
        });
        dispatch({
          type: 'SET_PAYMENT_ID',
          payload: null,
        });
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

  const handleUSStateChange = (stateVal) => {
    setAddress({...address, state: stateVal })
  };

  const continueWithoutShipping = () => {
    setActiveKey(['2']);
    setAddressSaved(true);
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    console.log(address);
    const errorResult = validateAddress(address);
    setAddressErrors(errorResult);

    if (errorResult.length === 0) {
      saveAddress(address)
        .then(res => {
          setAddressId(res.data.addressId);
          setActiveKey(['2']);
          setAddressSaved(true);
        })
        .catch(err => {
          console.log(err);
          toast.error('Error saving address');
        });
    }
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
              <div className='text-right'>
                {title} x {p.count} = {(p.price * p.count).toLocaleString('en-US',{
                  style: 'currency',
                  currency: 'USD',
                })}
              </div>
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

  const handleOrder = async () => {
    // try {
      // const payload = await stripe
      //   .confirmCardPayment(clientSecret, {
      //     payment_method: {
      //       card: cardElement
      //     }
      //   });
    //   if (payload.error) {
    //     toast.error('An error has occurred. Order not placed.');
    //   } else {
    //     // create order and save in database for admin to process
    //     createOrder(payable)
    //       .then(res => {
    //         if (res.data.ok) {
    //           if (typeof window !== undefined) {
    //             localStorage.removeItem('cart');
    //           }
    //         }
    //         // dispatch({ type: 'CLEAR_CART' });
    //         // dispatch({
    //         //   type: 'COUPON_APPLIED',
    //         //   payload: false
    //         // });
    //         // emptyUserCart(user.token)
    //         //   .then((res) => {
    //         //     if (res.data.ok) console.log('cart deleted on backend');
    //         //   })
    //         //   .catch(err => console.log(err.response));
    //       })
    //       .catch(err => {
    //         console.log(err);
    //       })
        
    //     // console.log(payload);
    //     // setError(null);
    //     // setProcessing(false);
    //     // setSucceeded(true);
    //   }
    // } catch (err) {
    //   console.log(err);
    //   toast.error('An error has occurred. Order not placed.');
    // };
  };


  return (
    <div className="container-fluid">
      <div className="row justify-content-md-center">
        <div className="col-md-6 pt-3">
          <Collapse
            activeKey={activeKey}
            onChange={(key) => setActiveKey(key)}
          >
            <Panel 
              header="Shipping" 
              key="1"
             >
              <ShippingAddress
                handleAddressSubmit={handleAddressSubmit}
                address={address}
                addressErrors={addressErrors}
                handleAddressChange={handleAddressChange}
                handleUSStateChange={handleUSStateChange}
                shipping={shipping}
                setShipping={setShipping}
                continueWithoutShipping={continueWithoutShipping}
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
              forceRender={true}
             >
              <Elements
                stripe={promise}
              >
                <StripeCheckout 
                  shipping={shipping}
                  setActiveKey={setActiveKey}
                  setClientSecret={setClientSecret}
                  setCardElement={setCardElement}
                  setPaymentConfirmed={setPaymentConfirmed}
                  setPayable={setPayable}
                />
              </Elements>
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
          <p className='text-right'>
            Sub Total: {cartTotal.toLocaleString('en-US',{
              style: 'currency',
              currency: 'USD',
            })}
          </p>
          <hr />
          {(couponApplied && totalAfterDiscount) &&
            <React.Fragment>
              <p className='text-right'>
                Discount: -{(cartTotal - totalAfterDiscount).toLocaleString('en-US',{
                  style: 'currency',
                  currency: 'USD',
                })}
              </p>
            </React.Fragment>
          }
          {shipping &&
            <React.Fragment>
              <p className='text-right'>
                Shipping: $8.00
              </p>
            </React.Fragment>
          }
          <p className='text-right'>
            <b>Order Total: {(shipping ? (chargeAmount + 8) : chargeAmount).toLocaleString('en-US',{
              style: 'currency',
              currency: 'USD',
            })}
            </b>
          </p>
          {/*totalAfterDiscount ? (
            <p className="bg-success p-2">
              Discount Applied; Total Payable: {totalAfterDiscount.toLocaleString('en-US',{
              style: 'currency',
              currency: 'USD',
            })}
            </p>
          ) : (<br />)*/}
          <div className="row">
            <div className="col d-flex justify-content-center">
              <button 
                className="btn btn-outline-primary"
                disabled={!paymentConfirmed || !addressSaved}
                onClick={handleOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BetaCheckout;