import React, { useState } from 'react';
import { NavBar } from 'antd-mobile';
import {
  Drawer,
  Badge,
} from 'antd';
import {
  LeftCircleOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

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



const MobileHeader = () => {
  const [open, setOpen] = useState(false);
  const [showSubs, setShowSubs] = useState(false);
  const [subs, setSubs] = useState([]);
  const { cart } = useSelector(state => state);

  const toggleOpen = () => {
    setOpen(!open);
  };

  const handleClick = () => {
    setOpen(false);
    setShowSubs(false);
  }

  const makeSelection = (category) => {
    setSubs(category.subs);
    setShowSubs(true);
  };

  const renderCategories = () => (
    categories.map((c, i) => (
      <div
        key={i}
        onClick={() => makeSelection(c)}
        className='p-3'
        style={{ cursor: 'pointer' }}
      >
        {c.title}
      </div>
    ))
  );

  const renderSubs = () => {
    const subDivs = subs.map((s, i) => (
      <div
        key={i}
        className='p-3'
        style={{ cursor: 'pointer' }}
        onClick={handleClick}
      >
        <Link
          to={`/${s.slug}`}
        >
          {s.title}
        </Link>
      </div>
    ));
    return (
      <React.Fragment>
        <div
          className='h4'
        >
          <LeftCircleOutlined 
            style={{ 
              cursor: 'pointer',
            }}
            onClick={() => setShowSubs(false)}
          />
        </div>
        {subDivs}
      </React.Fragment>
    );
  };

  return (
    <div>
      <NavBar
        onLeftClick={toggleOpen}
        style={{ cursor: 'pointer' }}
        leftContent={<MenuOutlined />}
      >
        Pilsen Vintage ;)
      </NavBar>
      <Drawer
        visible={open}
        title={'Menu'}
        placement='left'
        onClose={toggleOpen}
      >
        {!showSubs &&
          <React.Fragment>
            <div
              className='p-3'
              style={{ cursor: 'pointer' }}
              onClick={handleClick}
            >
              <Link to='/'>
                Home
              </Link>
            </div>
            <div
              className='p-3'
              style={{ cursor: 'pointer' }}
              onClick={handleClick}
            >
              <Link to='/shop'>
                Shop
              </Link>
            </div>
            <div
              className='p-3'
              style={{ cursor: 'pointer' }}
              onClick={handleClick}
            >
              <Link to='/cart'>
                <Badge 
                  count={cart.length}
                  offset={[9, 0]}
                >
                  Cart
                </Badge>
              </Link>
            </div>
          </React.Fragment>
        }
        {showSubs ? (
            renderSubs()
          ) : (renderCategories())
        }
      </Drawer>
    </div>
  );
};

export default MobileHeader;