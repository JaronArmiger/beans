import React, { useState } from "react";
import { 
  Menu ,
  Dropdown,
  Button,
} from "antd";
import { Link } from "react-router-dom";

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

const SubHeader = () => {
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

  return (
    <Menu 
      mode="horizontal"
      className='d-flex justify-content-between py-2'
    >
      {renderCategories()}
    </Menu>
  );
};

export default SubHeader;