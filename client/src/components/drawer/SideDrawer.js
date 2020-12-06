import React from 'react';
import {
  Drawer,
} from 'antd';

import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import defaultImage from '../../images/snake.jpg';

const SideDrawer = () => {
  const dispatch = useDispatch();
  const { drawer, cart } = useSelector(state => state);

  const hideDrawer = () => {
  	dispatch({
  	  type: 'SET_VISIBLE',
  	  payload: false,
  	});
  };
  
  const imageStyle = {
    width: '100%',
    objectFit: 'cover',
  };

  return (
  	<Drawer
  	  visible={drawer}
  	  title={`Cart / ${cart.length} Product${cart.length !== 1 ? 's' : ''}`}
  	  onClose={hideDrawer}
  	  className='text-center'
  	>
  	  {cart && cart.map((p, idx) => (
  	  	  <div 
  	  	    key={idx}
  	  	    className="row"
  	  	  >
  	  	    <div className="col">
  	  	      <img 
  	  	        src={p.images[0] ? (
  	  	        	  p.images[0].url
  	  	        	) : (defaultImage)} 
  	  	        alt={p.title}
  	  	        style={imageStyle}
  	  	      />
  	  	      <p 
  	  	        className="text-center bg-secondary text-light p-1"
  	  	      >
  	  	        {p.title} x {p.count}
  	  	      </p>
  	  	    </div>
  	  	  </div>
  	  	))}
  	  <Link
  	    to='/cart'
  	  >
  	    <button
  	      className='text-center btn btn-primary btn-raised btn-block'
  	      onClick={hideDrawer}
  	    >
  	      Go to Cart
  	    </button>
  	  </Link>
  	</Drawer>
  );
};

export default SideDrawer;