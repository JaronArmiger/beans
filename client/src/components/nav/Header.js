import React, { useState } from "react";
import { 
  Menu, 
  Badge,
  Dropdown,
  Button,
} from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Search from "../forms/Search";
import SubHeader from './SubHeader';
import logo from '../../images/pilsen_logo.png';

const { SubMenu, Item } = Menu;

const categories = [
  {
    title: 'Women\'s',
    subs: [
      {
        title: 'Bottoms',
        slug: 'bottoms-w',
      },
      {
        title: 'Tops',
        slug: 'tops-w',
      },
      {
        title: 'Outerwear',
        slug: 'outerwear-w',
      },
      {
        title: 'Dresses',
        slug: 'dresses-w',
      },
      {
        title: 'Shoes',
        slug: 'shoes-w',
      },
    ],
  },
  {
    title: 'Men\'s',
    subs: [
      {
        title: 'Bottoms',
        slug: 'bottoms-m',
      },
      {
        title: 'Tops',
        slug: 'tops-m',
      },
      {
        title: 'Outerwear',
        slug: 'outerwear-m',
      },
      {
        title: 'Shoes',
        slug: 'shoes-m',
      },
    ],
  },
  {
    title: 'Accessories',
    subs: [
      {
        title: 'Jewelry',
        slug: 'jewelry',
      },
      {
        title: 'Sunglasses',
        slug: 'sunglasses',
      },
      {
        title: 'Bags',
        slug: 'bags',
      },
    ],
  },
  {
    title: 'Other',
    subs: [
      {
        title: 'Electronics',
        slug: 'electronics',
      },
      {
        title: 'Home Goods',
        slug: 'home-goods',
      },
      {
        title: 'Gift Cards',
        slug: 'gift-cards',
      },
    ],
  },
];

  

const Header = () => {
  // const [current, setCurrent] = useState("home");

  let dispatch = useDispatch();
  let { user, cart } = useSelector((state) => ({ ...state }));

  let history = useHistory();

  // const handleClick = (e) => {
  //   // console.log(e.key);
  //   setCurrent(e.key);
  // };

  const renderSubs = (subs, c_idx) => {
    const subItems = subs.map((s, i) => (
      <Item
        key={i}
      >
        <Link
          to={`/sub/${s.slug}`}
          className='p-2'
        >
          {s.title}
        </Link>
      </Item>
    ));
    return (
      <Menu
        key={c_idx}
      >
        {subItems}
      </Menu>
    );
  };


  const renderCategories = () => (
    categories.map((c, i) => (
      <Dropdown
        key={i}
        overlay={renderSubs(c.subs, i)}
        placement='bottomCenter'
      >
        <Button
          style={{ border: 'none' }}
        >
        {c.title}</Button>
      </Dropdown>
    ))
  );

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.push("/login");
  };

  return (
    <React.Fragment>
      <Menu 
        mode="horizontal"
        style={{ position: 'fixed', zIndex: 1, width: '100%' }}
      > 
        <Dropdown
          overlay={
            <Search />
          }
        >
          <Button
            style={{ border: 'none' }}
          >
            <SearchOutlined />
          </Button>
        </Dropdown>
        {renderCategories()}
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
            icon={<SettingOutlined />}
            className="float-right"
          >
            {user && user.role === "subscriber" && (
              <Item>
                <Link to="/user/history">Dashboard</Link>
              </Item>
            )}

            {user && user.role === "admin" && (
              <Item>
                <Link to="/admin/dashboard">Dashboard</Link>
              </Item>
            )}

            <Item icon={<LogoutOutlined />} onClick={logout}>
              Logout
            </Item>
          </SubMenu>
        )}

        <Item 
          key="cart" 
          icon={<ShoppingCartOutlined />}
          className='float-right'
        >
          <Link to="/cart">
            <Badge count={cart.length} offset={[9, 0]}>
              Cart
            </Badge>
          </Link>
        </Item>
      </Menu>
      <div
        className='d-flex justify-content-center py-1'
        style={{ backgroundColor: '#03fca1' }}
      >
        <Link
          to='/'
        >
          <img 
            src={logo} 
            alt="logo" 
            style={{ 
              width: '250px',
              height: 'auto',
            }}
          />
        </Link>
      </div>
    </React.Fragment>
  );
};

export default Header;
