import React, { useState, useEffect } from 'react';
import { auth, googleAuthProvider } from '../../firebase';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { TeamOutlined, GoogleOutlined } from '@ant-design/icons';
import { createOrUpdateUser } from '../../functions/auth';
import { addEmail } from '../../functions/mailingList';

const Register = ({ history }) => {
  const [email, setEmail] = useState('');
  const [wantMail, setWantMail] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector(state => state);
  
  useEffect(() => {
    if (user && user.token) history.push('/');
  }, [user, history]);

  const roleBasedRedirect = (res) => {
    const fromState = history.location.state;
    if (fromState) {
      history.push(fromState.from);
    } else {
      if (res.data.role === 'admin') {
      history.push('/admin/dashboard');
      } else {
        history.push('/');
      }
    };  
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, config);
    if (wantMail) {
      await addEmail(email);
    }
    toast.success(`Email is sent to ${email}. Click the link to complete your registration!`);
    // save user email in localstorage
    window.localStorage.setItem('emailForRegistration', email);
    // clear state
    setEmail('');
  }

  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        createOrUpdateUser(idTokenResult.token)
          .then(async (res) => {
              dispatch({
              type: 'LOGGED_IN_USER',
              payload: {
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              }
            });
            if (wantMail) {
              await addEmail(res.data.email);
            }
            roleBasedRedirect(res);
          })
          .catch((err) => {
            console.log(err);
          })
        // history.push('/');
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  }

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input 
        type='email' 
        className='form-control' 
        value={email} 
        onChange={e => setEmail(e.target.value)}
        autoFocus
        placeholder='Enter your email'
      />
      <div className="form-check mt-4">
        <input 
          type='checkbox' 
          className='form-check-input'
          id='wantMailCheck'
          checked={wantMail} 
          onChange={e => setWantMail(e.target.checked)}
        />
        <label 
          htmlFor="wantMailCheck" 
          className="form-check-label"
          style={{
            fontSize: '.9em',
            color: 'FFF'
          }}
        >
          I want to receive emails about dope deals and events
        </label>
      </div>
      <br />
      <Button 
        type='primary' // color type
        block // to make it stretch horizontally
        shape='round'
        icon={<TeamOutlined />}
        size='large'
        onClick={handleSubmit}
      >
        Register
      </Button>
    </form>
  );

  return (
    <div className='container p-5'>
 	  <div className="row">
 	    <div className="col-md-6 offset-md-4">
 	      <h4>Register</h4>
 	      {registerForm()}
        <Button
            onClick={googleLogin}
            type='danger' // color type
            className='mb-3'
            block // to make it stretch horizontally
            shape='round'
            icon={<GoogleOutlined />}
            size='large'
          >
          Login with Google
        </Button>
        <Link 
            to='/login'
        >
          I already have an account
        </Link>
 	    </div>

 	  </div>
    </div>
  );
};

export default Register;