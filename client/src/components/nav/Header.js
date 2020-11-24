import React, { useState } from 'react';
import { Menu } from 'antd';
import { 
  UserOutlined, 
  AppstoreOutlined, 
  SettingOutlined ,
  UserAddOutlined,
  LogoutOutlined,
  ShoppingOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Search from '../forms/Search';

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState('home');
  let dispatch = useDispatch();
  let { user } = useSelector((state) => state);
  let history = useHistory();
  // console.log(JSON.stringify(user));

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: 'LOGOUT',
      payload: null,
    });
    history.push('/login');
  }

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<AppstoreOutlined />}>
        <Link to="/">Home</Link>
      </Item>

      <Item key="shop" icon={<ShoppingOutlined />}>
        <Link to="/shop">Shop</Link>
      </Item>

      {!user && (
        <Item key="register" icon={<UserAddOutlined />} className="float-right">
          <Link to="/register">Register</Link>
        </Item>
      )}

      {!user && (
        <Item key="login" icon={<UserOutlined />} className="float-right">
          <Link to="/login">Login</Link>
        </Item>
      )}

      {user && (
        <SubMenu 
          key="SubMenu" 
          icon={<SettingOutlined />} 
          title={user.email && user.email.split('@')[0]}
          className='float-right'
        >
          {user && user.role === 'subscriber' && (
            <Item>
              <Link to='/user/history'>
                Dashboard
              </Link>
            </Item>
          )}
          {user && user.role === 'admin' && (
            <Item>
              <Link to='/admin/dashboard'>
                Dashboard
              </Link>
            </Item>
          )}
            <Item 
              key="setting:3" 
              icon={<LogoutOutlined />}
              onClick={logout}
            >
              Logout
            </Item>
        </SubMenu>
      )}
      <span className="float-right p-1">
        <Search />
      </span>
    </Menu>
  );
};

export default Header;