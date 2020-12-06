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


const ShippingAddress = ({ 
  address, 
  handleAddressSubmit,
  handleAddressChange,
  handleUSStateChange
}) => {

  return (
    <form
      onSubmit={handleAddressSubmit}
    >
      <div className="form-group">
        <label>First Name</label>
        <input 
          type="text"
          name='firstName'
          className='form-control'
          onChange={handleAddressChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Last Name</label>
        <input 
          type="text"
          name='lastName'
          className='form-control'
          onChange={handleAddressChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Street Address</label>
        <input 
          type="text"
          name='streetAddress'
          className='form-control'
          onChange={handleAddressChange}
          required
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
          required
        />
      </div>
      <div className="form-group">
        <label>State</label>
        <SelectUSState 
          className='form-control pointer'
          onChange={handleUSStateChange} 
          required
        />
      </div>
      <div className="form-group">
        <label>ZIP / Postal Code</label>
        <input 
          type="text"
          name='zip'
          className='form-control'
          onChange={handleAddressChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Phone Number</label>
        <input 
          type="tel"
          name='phoneNumber'
          className='form-control'
          onChange={handleAddressChange}
          required
        />
      </div>
      <button
        className='btn btn-outline-info'
      >
        Save and Continue
      </button>
    </form>
  );

};

export default ShippingAddress;