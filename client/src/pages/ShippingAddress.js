import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  getUserCart,
  emptyUserCart,
  saveUserAddress,
  applyCoupon,
  createCashOrder,
} from '../functions/user';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import SelectUSState from 'react-select-us-states';

const initialAddress = {
  streetAddress: '',
  apartment: '',
  city: '',
  state: '',
  zip: '',
}

const ShippingAddress = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState(initialAddress);
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(null);

  const dispatch = useDispatch();
  // const { user, COD } = useSelector(state => state);

  // useEffect(() => {
  //   getUserCart(user.token)
  //     .then((res) => {
  //       setProducts(res.data.products);
  //       setTotal(res.data.cartTotal);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  // }, []);

  // const saveAddressToDb = () => {
  //   saveUserAddress(user.token, address)
  //     .then(res => {
  //       if (res.data.ok) setAddressSaved(true);
  //       toast.success('Address saved')
  //     })
  //     .catch(err => console.log(err));
  // };

  const handleAddressChange = (e) => {
    setAddress({...address, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(address);
  };

  const showAddressFields = () => (
    <form
      onSubmit={handleSubmit}
    >
      <div className="form-group">
        <label>Street Address</label>
        <input 
          type="text"
          name='streetAddress'
          className='form-control'
          onChange={handleAddressChange}
        />
      </div>
      <div className="form-group">
        <label>Apartment, suite, etc. (Optional)</label>
        <input 
          type="text"
          name='apartment'
          className='form-control'
          onChange={handleAddressChange}
        />
      </div>
      <div className="form-group">
        <label>City</label>
        <input 
          type="text"
          name='city'
          className='form-control'
          onChange={handleAddressChange}
        />
      </div>
      <div className="form-group">
        <label>State</label>
        <SelectUSState 
          className='form-control pointer'
          onChange={(state) => setAddress({...address, state})} 
        />
      </div>
      <div className="form-group">
        <label>ZIP / Postal Code</label>
        <input 
          type="text"
          name='zip'
          className='form-control'
          onChange={handleAddressChange}
        />
      </div>
      <button
        className='btn btn-outline-info'
      >
        Save and Continue
      </button>
    </form>
  );

  return (
    <div className="container-fluid">
    <div className="row">
      <div className="col-md-6 offset-3 mt-2">
        <h4>Delivery Address</h4>
        <br />
        <br />
        {showAddressFields()}
        <hr />
      </div>
    </div>
    </div>
  );
};

export default ShippingAddress;