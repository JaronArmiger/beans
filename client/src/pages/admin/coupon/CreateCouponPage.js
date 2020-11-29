import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import {
  getCoupons,
  createCoupon,
  removeCoupon,
} from '../../../functions/coupon';
import 'react-datepicker/dist/react-datepicker.css';
import {
  DeleteOutlined,
} from '@ant-design/icons';
import AdminNav from '../../../components/nav/AdminNav';

const CreateCouponPage = () => {
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);

  const { token } = useSelector(state => state.user);

  useEffect(() => {
    getCoupons()
      .then(res => setCoupons(res.data)) 
      .catch(err => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createCoupon({
      name,
      expiry,
      discount,
    }, token)
      .then((res) => {
 	    setLoading(false);
 	    setName('');
 	    setExpiry('');
 	    setDiscount(0);
 	    toast.success(`"${res.data.name}" coupon created`);
      })
      .catch(err => console.log(err));
  };

  return (
  	<div className="container-fluid">
  	  <div className="row">
  	    <div className="col-md-2">
  	      <AdminNav />
  	    </div>
  	    <div className="col-md-10">
  	      <h4>Coupon</h4>
  	      <form
  	        onSubmit={handleSubmit}
  	      >
  	      	<div className="form-group">
  	      	  <label className="text-muted">
  	      	    Name (must be 6-12 characters)
  	      	  </label>
  	      	  <input 
  	      	    type="text"
  	      	    className='form-control'
  	      	    onChange={(e) => setName(e.target.value)}
  	      	    value={name}
  	      	    autoFocus
  	      	    required
  	      	  />
  	      	</div>
  	      	<div className="form-group">
  	      	  <label className="text-muted">
  	      	    Discount %
  	      	  </label>
  	      	  <input 
  	      	    type="number"
  	      	    className='form-control'
  	      	    onChange={(e) => setDiscount(e.target.value)}
  	      	    value={discount}
  	      	    min='0'
  	      	    required
  	      	  />
  	      	</div>
  	      	<div className="form-group">
  	      	  <label className="text-muted">
  	      	    Expiry
  	      	  </label>
  	      	  <br />
  	      	  <DatePicker 
  	      	    className='form-control'
  	      	    selected={new Date()}
  	      	    value={expiry}
  	      	    onChange={setExpiry}
  	      	    required
  	      	  />
  	      	</div>
  	      	<button 
  	      	  className="btn btn-outline-primary"
  	      	  disabled={name.length > 12 || name.length < 6}
  	      	>
  	      	  Save
  	      	</button>
  	      </form>
  	      <br />
  	      {JSON.stringify(coupons)}
  	    </div>
  	  </div>
  	</div>
  );
};

export default CreateCouponPage;