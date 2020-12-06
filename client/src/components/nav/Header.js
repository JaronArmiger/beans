import React, { useState } from 'react';
import { Menu, Badge } from 'antd';
import { 
  UserOutlined, 
  AppstoreOutlined, 
  SettingOutlined ,
  UserAddOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Search from '../forms/Search';

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState('home');
  const dispatch = useDispatch();
  const { user, cart } = useSelector((state) => state);
  const history = useHistory();
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
    <React.Fragment>
      <div 
        onClick={handleClick} 
        selectedKeys={[current]} 
        mode="horizontal"
        className='d-flex'
      >
        <div 
          style={{ 
            border: '1px solid black',
            width: '33%'
          }}
        >
          <Menu 
            onClick={handleClick} 
            selectedKeys={[current]} 
            mode="horizontal"
          >
            <Item key="home" icon={<AppstoreOutlined />}>
              <Link to="/">Home</Link>
            </Item>

            <Item key="shop" icon={<ShoppingOutlined />}>
              <Link to="/shop">Shop</Link>
            </Item>

            <Item key="cart" icon={<ShoppingCartOutlined />}>
              <Link to="/cart">
                <Badge 
                  count={cart.length}
                  offset={[9, 0]}
                >
                  Cart
                </Badge>
              </Link>
            </Item>
          </Menu>
        </div>
        <div 
          className="flex-grow-1 d-flex justify-content-center"
          style={{ 
            border: '1px solid black',
            width: '33%'
          }}
        >
          
        </div>
        <div 
          className="flex-grow-1 d-flex justify-content-right"
          style={{ 
            border: '1px solid black',
            width: '33%'
          }}
        >
          <Menu 
            onClick={handleClick} 
            mode="horizontal"
          >
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
          </Menu>
        </div>
        
      </div>
      <Menu 
        onClick={handleClick} 
        selectedKeys={[current]} 
        mode="horizontal"
        className='d-flex justify-content-center'
      >
        <SubMenu
          key="mens"
          title={'Men\'s'}
        >
          <Item>
            <Link to='/user/history'>
              Dashboard
            </Link>
          </Item>
        </SubMenu>

        <SubMenu
          key="womens"
          title={'Women\'s'}
        >
          <Item>
            <Link to='/user/history'>
              Dashboard
            </Link>
          </Item>
        </SubMenu>

        <SubMenu
          key="accessories"
          title={'Accessories'}
        >
          <Item>
            <Link to='/user/history'>
              Dashboard
            </Link>
          </Item>
        </SubMenu>
        <SubMenu
          key="other"
          title={'Other'}
        >
          <Item>
            <Link to='/user/history'>
              Dashboard
            </Link>
          </Item>
        </SubMenu>
      </Menu>
    </React.Fragment>
  );
};

export default Header;