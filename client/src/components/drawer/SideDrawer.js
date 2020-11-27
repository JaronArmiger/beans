import React from 'react';
import {
  Drawer,
  Button,
} from 'antd';

import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import defaultImage from '../../images/snake.jpg';

const SideDrawer = ({ children }) => {
  const dispatch = useDispatch();
  const { drawer, cart } = useSelector(state => state);
  console.log(cart);

  return (
  	<Drawer
  	  visible={true}
  	>
  	  {cart && cart.map((p) => {
  	  	return (
  	  	  
  	  	);
  	  })}
  	</Drawer>
  );
};

export default SideDrawer;