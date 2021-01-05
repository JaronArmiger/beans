import React, { useState } from 'react';
import { NavBar } from 'antd-mobile';
import { 
  Menu,
  Drawer,
  Badge,
} from 'antd';
import { 
  HomeOutlined,
  MailOutlined,
  SettingOutlined,
  MenuOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  UserAddOutlined,
  UserOutlined,
  LogoutOutlined,

} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import firebase from 'firebase';
import { useHistory } from 'react-router-dom';
import logo from '../../images/pilsen_logo3.png';


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

const rootSubmenuKeys = [
  'sub0',
  'sub1',
  'sub2',
  'sub3',
];

const AltMobileHeader = () => {
  const [openKeys, setOpenKeys] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const { cart, user } = useSelector(state => state);

  const toggleOpen = () => {
    setDrawerOpen(!drawerOpen);
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: 'LOGOUT',
      payload: null,
    });
    setDrawerOpen(false);
    history.push('/login');
  }

  const onOpenChange = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const renderSubs = (subs) => (
    subs.map((s, i) => (
      <Item
        key={i}
      >
        <Link 
          to={`/sub/${s.slug}`}
          onClick={() => setDrawerOpen(false)}
        >
          {s.title}
        </Link>
      </Item>
    ))
  );

  const renderCategories = () => (
    categories.map((c, i) => (
      <SubMenu
        key={`sub${i}`}
        title={c.title}
      >
        {renderSubs(c.subs)}
      </SubMenu>
    ))
  );

  return (
    <React.Fragment>
      <NavBar
        onLeftClick={toggleOpen}
        style={{ 
          cursor: 'pointer', 
          backgroundColor: '#03fca1',
          position: 'fixed', 
          zIndex: 1, 
          width: '100%',
          height: '50px'
        }}
        leftContent={<MenuOutlined style={{ color: 'black' }}/>}
      >
        <img 
          src={logo} 
          alt="" 
          style={{ 
            width: '150px', 
            height: 'auto', 
            padding: '5px'
          }}
        />
      </NavBar>
      <div style={{ height: '50px' }}></div>
      <Drawer
        visible={drawerOpen}
        placement='left'
        onClose={toggleOpen}
      >
        <Menu
          mode='inline'
          openKeys={openKeys}
          onOpenChange={onOpenChange}
        >
          <Item key="home" icon={<HomeOutlined />}>
            <Link 
              to="/"
              onClick={() => setDrawerOpen(false)}
            >
              Home
            </Link>
          </Item>

          <Item key="shop" icon={<ShoppingOutlined />}>
            <Link 
              to="/shop"
              onClick={() => setDrawerOpen(false)}
            >
              Shop
            </Link>
          </Item>

          <Item key="cart" icon={<ShoppingCartOutlined />}>
            <Link 
              to="/cart"
              onClick={() => setDrawerOpen(false)}
            >
              <Badge 
                count={cart.length}
                offset={[9, 0]}
              >
                Cart
              </Badge>
            </Link>
          </Item>
          {renderCategories()}
          {!user && (
            <Item key="register" icon={<UserAddOutlined />} className="float-right">
              <Link 
                to="/register"
                onClick={() => setDrawerOpen(false)}
              >
                Register
              </Link>
            </Item>
          )}

          {!user && (
            <Item key="login" icon={<UserOutlined />} className="float-right">
              <Link 
                to="/login"
                onClick={() => setDrawerOpen(false)}
              >
                Login
              </Link>
            </Item>
          )}
          {user && (
          <SubMenu
            icon={<SettingOutlined />}
            title='Account'
          >
            {user && user.role === "subscriber" && (
              <Item>
                <Link 
                  to="/user/history"
                  onClick={() => setDrawerOpen(false)}
                >
                  Dashboard
                </Link>
              </Item>
            )}

            {user && user.role === "admin" && (
              <Item>
                <Link 
                  to="/admin/dashboard"
                  onClick={() => setDrawerOpen(false)}
                >
                  Dashboard
                </Link>
              </Item>
            )}

            <Item icon={<LogoutOutlined />} onClick={logout}>
              Logout
            </Item>
          </SubMenu>
        )}
        </Menu>
      </Drawer>
    </React.Fragment>  
  );
};

export default AltMobileHeader;