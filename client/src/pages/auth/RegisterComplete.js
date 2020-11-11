import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';

// history is available because entire app is wrapped
// with BrowserRouter
const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setEmail(window.localStorage.getItem('emailForRegistration'));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await auth.signInWithEmailLink(
        email, 
        window.location.href
      );
    } catch (error) {
      console.log(error);
    }
  }

  const completeRegistrationForm = () => (
    <form onSubmit={handleSubmit}>
      <input 
        type='email' 
        className='form-control' 
        defaultValue={email} 
        disabled
      />
      <input 
        type='password' 
        className='form-control' 
        value={password} 
        onChange={e => setPassword(e.target.value)}
        placeholder='Enter Password'
        autoFocus
      />
      <br/>
      <button type='submit' className='btn btn-raised'>
        Complete Registration
      </button>
    </form>
  );

  return (
    <div className='container p-5'>
 	  <div className="row">
 	    <div className="col-md-6 offset-md-4">
 	      <h4>Complete Registration</h4>
 	      {completeRegistrationForm()}
 	    </div>
 	  </div>
    </div>
  );
};

export default RegisterComplete;