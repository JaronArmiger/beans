import React, { useState } from 'react';
import {
  addEmail,
} from '../../functions/mailingList';
import { toast } from 'react-toastify';

const JoinNewsletterForm = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addEmail(email)
      .then(res => {
        if (res.data.ok) {
          toast.success('You\'re on our list ;)');
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <div className="row">
      <div className="col-md-4 offset-md-4 my-5"
        style={{
          border: '1px solid black'
        }}
      >
        <p 
          className="text-center p-3 mt-2 mb-1 font-weight-bold"
          style={{fontSize: '20px'}}
        >
          JOIN OUR NEWSLETTER!
        </p>
        <p className="text-center text-secondary">
          Subscribe to our newsletter to receive the latest news about events, sales, new arrivals and more!
        </p>
        <form
          className='d-flex flex-column'
          onSubmit={handleSubmit}
        >
          <div className="form-group mt-2">
            <input 
              type="email" 
              name="email"
              className='form-control'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email'
            />
          </div>
          <br />
          <button className="btn btn-outline-dark">
            SUBSCRIBE
          </button>
        </form>
      </div>
    </div>
  );
}

export default JoinNewsletterForm;