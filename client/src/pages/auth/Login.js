import React, { useState, useEffect } from 'react';
import { auth, googleAuthProvider } from '../../firebase';
import { toast } from 'react-toastify';
import { Button } from 'antd';
import { MailOutlined, GoogleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import axios from 'axios';
import { createOrUpdateUser } from '../../functions/auth';


const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  let dispatch = useDispatch();
  const { user } = useSelector(state => state);
  
  useEffect(() => {
    const fromState = history.location.state;
    if (fromState) return;
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
    setLoading(true);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
 	    const { user } = result;
 	    const idTokenResult = await user.getIdTokenResult();
      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          dispatch({
            type: 'LOGGED_IN_USER',
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            }
          });
          roleBasedRedirect(res);
        })
        .catch((err) => {
          console.log(err);
        })
      // history.push('/');
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  }

  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
              dispatch({
              type: 'LOGGED_IN_USER',
              payload: {
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              }
            });
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

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input 
          type='email' 
          className='form-control' 
          value={email} 
          onChange={e => setEmail(e.target.value)}
          autoFocus
          placeholder='Enter your email'
        />
      </div>
      <div className="form-group">
        <input 
          type='password' 
          className='form-control' 
          value={password} 
          onChange={e => setPassword(e.target.value)}
          placeholder='Enter your password'
        />
      </div>
      <Button
        onClick={handleSubmit}
        type='primary' // color type
        className='mb-3'
        block // to make it stretch horizontally
        shape='round'
        icon={<MailOutlined />}
        size='large'
        disabled={!email || password.length < 6}
      >
      	Login with Email/Password
      </Button>
    </form>
  );

  return (
    <div className='container p-5'>
 	  <div className="row">
 	    <div className="col-md-6 offset-md-4">
 	      {loading === true ? (
 	      	  <h4 className='text-danger'>Loading...</h4>
 	      	) : (
 	      	  <h4>Login</h4>
 	      	)}
 	      {loginForm()}

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
        <div
          className='d-flex flex-column align-items-end'
        >
          <Link 
            to='/forgot/password' 
            className='text-danger'
          >
            Forgot Password
          </Link>
        </div>
 	    </div>
 	  </div>
    </div>
  );
};

export default Login;