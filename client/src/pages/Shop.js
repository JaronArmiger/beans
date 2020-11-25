import React, { useState, useEffect } from 'react';
import { 
  getProductsByCount,
  fetchProductsByFilter,
} from '../functions/product';
import { 
  getCategories,
} from '../functions/category';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../components/cards/ProductCard';
import { 
  LoadingOutlined, 
  DollarOutlined,
  AimOutlined,
} from '@ant-design/icons';
import {
  Menu,
  Slider,
  Checkbox
} from 'antd';

const { SubMenu, ItemGroup } = Menu;

const Shop = () => {
  const max = 10000;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [ok, setOk] = useState(false); 
  const [price, setPrice] = useState([0, max]);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);

  const dispatch = useDispatch();
  const { text } = useSelector(state => state.search);

  useEffect(() => {
    loadAllProducts(12);
    getCategories()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.log(err));
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

  // useEffect(() => {
  //   if (categoryIds.length === 0) {
  //     loadAllProducts(12);
  //   } else {
  //     fetchProducts({ category: categoryIds });
  //   }
  // }, [categoryIds]);

  const loadAllProducts = (count) => {
  	setLoading(true);
  	getProductsByCount(count)
  	  .then((res) => {
  	  	setProducts(res.data);
  	  	setLoading(false);
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
    setCategoryIds([]);
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
  };

  const handleCheck = (e) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: {
        text: '',
      },
    });
    setPrice([0, max]);
    const idArr = [...categoryIds];
    const checked = e.target.value;
    const idx = idArr.indexOf(checked);
    if (idx === -1) {
      idArr.push(checked);
    } else {
      idArr.splice(idx, 1);
    }
    setCategoryIds(idArr);
    fetchProducts({ category: idArr });
  };

  const showCategories = () => {
    const categoryDivs = categories.map((c) => {
      return (
        <div key={c._id}>
          <Checkbox 
            className='pb-2 px-4'
            value={c._id}
            name='category'
            onChange={handleCheck}
            checked={categoryIds.includes(c._id)}
          >
            {c.name}
          </Checkbox>  
          <br />    
        </div>)
    });
    return categoryDivs;
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 pt-2">
          <h4>Filters</h4>
          <hr />
          <Menu
            mode='inline'
            defaultOpenKeys={['1', '2']}
          >
            {/* Price */}
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
          {/* Category */}
            <SubMenu 
              key='2' 
              title={
                <span className='h6'>
                  <AimOutlined />
                  Categories
                </span>
              }
            >
              <div
                style={{ marginTop: '-10px' }}
              >
                {showCategories()}
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