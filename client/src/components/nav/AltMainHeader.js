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
    <nav>
      <ul
        className='d-flex'
      >
        <li>
          Search
        </li>
        <li>
          Cart
        </li>
      </ul>
    </nav>
  );
};

export default Header;
