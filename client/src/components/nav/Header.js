import React, { useState } from "react";
import { Menu, Badge } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Search from "../forms/Search";
import SubHeader from './SubHeader';

const { SubMenu, Item } = Menu;

const Header = () => {
  // const [current, setCurrent] = useState("home");

  let dispatch = useDispatch();
  let { user, cart } = useSelector((state) => ({ ...state }));

  let history = useHistory();

  // const handleClick = (e) => {
  //   // console.log(e.key);
  //   setCurrent(e.key);
  // };

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

        {user && (
          <SubMenu
            icon={<SettingOutlined />}
            title={user.email && user.email.split("@")[0]}
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
        <Item
          key='search'
          className='float-left'
        >
            <Search />
        </Item>
        
      </Menu>
      <SubHeader />
    </React.Fragment>
  );
};

export default Header;
