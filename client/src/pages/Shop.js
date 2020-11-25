import React, { useState, useEffect } from 'react';
import { 
  getProductsByCount,
  fetchProductsByFilter,
} from '../functions/product';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../components/cards/ProductCard';
import { LoadingOutlined, DollarOutlined } from '@ant-design/icons';
import {
  Menu,
  Slider,
} from 'antd';

const { SubMenu, ItemGroup } = Menu;

const Shop = () => {
  const max = 10000;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [ok, setOk] = useState(false); 
  const [price, setPrice] = useState([0, max]);

  const dispatch = useDispatch();
  const { text } = useSelector(state => state.search);

  useEffect(() => {
    loadAllProducts(12);
  }, []);

  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
    }, 300);
    return () => clearTimeout(delayed);
  }, [text])

  useEffect(() => {
    console.log('ok to request');
    fetchProducts({ price });
  }, [ok]);

  const loadAllProducts = (count) => {
  	setLoading(true);
  	getProductsByCount(count)
  	  .then((res) => {
  	  	setProducts(res.data);
  	  	setLoading(false);
        console.log(loading);
  	  })
  	  .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const fetchProducts = async (arg) => {
    setLoading(true);
    fetchProductsByFilter(arg)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleSlider = (priceArr) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: {
        text: '',
      },
    });
    setPrice(priceArr);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  }


  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 pt-2">
          <h4>Filters</h4>
          <hr />
          {loading ? 'loading' : 'chillin'}
          <Menu
            mode='inline'
            defaultOpenKeys={['1']}
          >
            <SubMenu 
              key='1' 
              title={
                <span className='h6'>
                  <DollarOutlined />
                  Price
                </span>
              }
            >
              <div>
                <Slider 
                  className='mx-4'
                  tipFormatter={(v) => `$${v}`}
                  range
                  value={price}
                  onChange={handleSlider}
                  max={max}
                />
              </div>
            </SubMenu>
          </Menu>
        </div>
        <div className="col-md-9 pt-2">
     		  {products.length < 1 ? (
     		  	<h4>No products found</h4>
     		  ) : (
     		    <h4>Showing {products.length} products</h4>
     		  )}
     		  {loading && <LoadingOutlined className='text-warning h1'/>}
     		  <div className="row pb-5">
     		    {products.map((p) => {
     		      return (
     		      	<div
     		      	  key={p._id}
     		      	  className='col-md-4 mt-3'
     		      	>
     		      	  <ProductCard product={p} />
     		      	</div>
     		      );
     		    })}
     		  </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;