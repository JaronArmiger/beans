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
  LoadingOutlined,
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
    loadCoupons();
  }, []);

  const loadCoupons = () => {
    getCoupons()
      .then(res => setCoupons(res.data)) 
      .catch(err => console.log(err));
  };

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
 	    loadCoupons();
      })
      .catch(err => console.log(err));
  };

  const handleRemove = (couponId) => {
    if (window.confirm('Delete this coupon?')) {
      setLoading(true);
      removeCoupon(couponId, token)
        .then(res => {
          setLoading(false);
          toast.success(`"${res.data.name}" deleted`);
          loadCoupons();
        })
        .catch(err => console.log(err));
    }
  };

  return (
  	<React.Fragment>
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
            max='99'
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
      <h4>{coupons.length} Coupon{coupons.length !== 1 ? 's' : ''}</h4>
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
          	<th scope='col'>Name</th>
          	<th scope='col'>Expiry</th>
          	<th scope='col'>Discount</th>
          	<th scope='col'>Action</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((c, idx) => (
          	<tr
          	  key={idx}
          	>
          	  <td>{c.name}</td>
          	  <td>{new Date(c.expiry).toLocaleDateString()}</td>
          	  <td>{c.discount}%</td>
          	  <td
          	    className='text-center'
          	  >
          	    <DeleteOutlined
          	      className='text-danger'
          	      style={{ cursor: 'pointer' }}
          	      onClick={() => handleRemove(c._id)}
          	    />
          	  </td>
          	</tr>
          ))}
        </tbody>
      </table>
  	</React.Fragment>
  );
};

export default CreateCouponPage;