import React, { useState } from 'react';
import { auth } from '../../firebase';
import { toast } from  'react-toastify';

const Password = () => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    await auth.currentUser.updatePassword(password)
      .then(() => {
        setLoading(false);
        toast.success('Password updated');
        setPassword('');
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error(err.message);
      })
  }

  const passwordUpdateForm = () => {
    return (
      <form
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label>Password</label>
          <input 
            type="password"
            onChange={e => setPassword(e.target.value)}
            className='form-control'
            placeholder='Enter new password'
            disabled={loading}
            value={password}
          />
          <button 
            className='btn btn-primary'
            disabled={!password || password.length < 6 || loading}
          >
            Submit
          </button>
        </div>
      </form>
    );
  }

  return (
    <React.Fragment>
      {passwordUpdateForm()}
    </React.Fragment>
  );
};

export default Password;