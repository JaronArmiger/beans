import React from 'react';
import SelectUSState from 'react-select-us-states';
import { Radio } from 'antd';


const ShippingAddress = ({ 
  address, 
  handleAddressSubmit,
  handleAddressChange,
  handleUSStateChange,
  addressErrors,
  shipping,
  setShipping,
  continueWithoutShipping,
  noneSold,
}) => {  
  const showAddressForm = () => (
    <form
      onSubmit={handleAddressSubmit}
    >  
      {addressErrors.length > 0 &&
        <div
          className='alert alert-danger'
        >
          Errors:
          <ul>
            {addressErrors.map((err, i) => (
              <li
                key={i}
              >
                {err}
              </li>
            ))}
          </ul>
        </div>
      }
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
      <div className="form-group">
        {addressErrors.length > 0 &&
          <div
            className='alert alert-danger'
          >
           Invalid input, see errors above
          </div>}
        <button
          className='btn btn-outline-info'
          disabled={!noneSold}
        >
          Save and Continue
        </button>
      </div>
    </form>
  );

  const onRadioChange = e => {
    setShipping(e.target.value);
  };

  return (
    <React.Fragment>
      <div
        className='mb-4 mt-2'
      >
        <Radio.Group onChange={onRadioChange} value={shipping}>
          <Radio value={false}>I'll pick up my order in store</Radio>
          <Radio value={true}>I want my order shipped</Radio>
        </Radio.Group>
        {shipping ? (
          <React.Fragment>
            <p
              className='mt-2 mb-2 text-secondary'
              style={{
                fontSize: '0.9em',
              }}
            >
              Orders ship every Tuesday morning, provided they were placed 48 hours prior.
            </p>
            <p
              className='mb-0 text-secondary'
              style={{
                fontSize: '0.9em',
              }}
            >
              Flat-rate shipping only applies to domestic orders. Email us at vintageon18@gmail.com if you're interested in having your order shipped internationally.
            </p>
          </React.Fragment>
        ) : (
          <p
            className='mt-2 text-secondary'
            style={{
              fontSize: '0.9em',
            }}
          >
            Your order will be ready for pickup 48 hours after it is placed. Please bring a valid state ID when picking up your order.
          </p>
        )}
        <p
            className='mt-2 text-secondary'
            style={{
              fontSize: '0.9em',
            }}
          >
           Once you place your order, you will receive an email with further information.
        </p>
      </div>
      {!shipping && 
        <button
          className='btn btn-outline-info'
          onClick={continueWithoutShipping}
          disabled={!noneSold}
        >
          Continue
        </button>
      }
      {shipping && showAddressForm()}
    </React.Fragment>
  );

};

export default ShippingAddress;