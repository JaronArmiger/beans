import React, { useState, useEffect } from 'react';
import { 
  getProductsByCount,
  fetchProductsByFilter,
} from '../functions/product';
import { 
  getCategories,
} from '../functions/category';
import { 
  getSubs,
} from '../functions/sub';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../components/cards/ProductCard';
import Star from '../components/forms/Star';
import { 
  LoadingOutlined, 
  DollarOutlined,
  AimOutlined,
  StarOutlined,
} from '@ant-design/icons';
import {
  Menu,
  Slider,
  Checkbox,
  Radio,
  Button,
  Collapse,
} from 'antd';

const { Panel } = Collapse;
const { SubMenu } = Menu;

const Shop = ({ windowWidth }) => {
  const max = 10000;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [ok, setOk] = useState(false); 
  const [price, setPrice] = useState([0, max]);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [star, setStar] = useState('');
  const [subs, setSubs] = useState([]);
  const [colors, setColors] = useState([
    'Black', 
    'Brown', 
    'Silver', 
    'White',
    'Red',
    'Orange',
    'Yellow',
    'Green',
    'Blue',
    'Purple',
    'Other',
  ]);
  // const [brands, setBrands] = useState([
  //   'Apple', 
  //   'Samsung', 
  //   'Microsoft', 
  //   'Lenovo', 
  //   'Asos'
  // ]);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedShipping, setSelectedShipping] = useState('');

  const dispatch = useDispatch();
  const { text } = useSelector(state => state.search);

  useEffect(() => {
    loadAllProducts(12);
    getCategories()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.log(err));
    getSubs()
      .then((res) => {
        setSubs(res.data);
        console.log(subs);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
      if (text === '') loadAllProducts(12);
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

  const resetFilters = (exclude='') => {
    if (exclude !== 'price') {
      setPrice([0, max]);
    };
    if (exclude !== 'categoryIds') {
      setCategoryIds([]);
    };
    if (exclude !== 'query') {
      dispatch({
        type: 'SEARCH_QUERY',
        payload: {
          text: '',
        },
      });
    };
    if (exclude !== 'brand') {
      setSelectedBrand('');
    };
    if (exclude !== 'color') {
      setSelectedColor('');
    };
    if (exclude !== 'shipping') {
      setSelectedShipping('');
    };
  }

  const handleSlider = (priceArr) => {
    resetFilters('price');
    setPrice(priceArr);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  const handleCheck = (e) => {
    resetFilters('categoryIds');
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

  const handleStarClick = (num) => {
    resetFilters();
    setStar(num);
    fetchProducts({ stars: num});
  };

  const handleSub = (subId) => {
    resetFilters();
    fetchProducts({ sub: subId});
  };

  const radioChange = (e, filterType) => {
    resetFilters(filterType);
    const val = e.target.value;
    console.log(val);
    console.log(filterType);
    switch (filterType) {
      case 'brand':
        console.log('sent brand')
        setSelectedBrand(val);
        fetchProducts({ brand: val });
        break;
      case 'color':
        console.log('sent color');
        setSelectedColor(val);
        fetchProducts({ color: val });
        break;
      case 'shipping':
        console.log('sent shipping');
        setSelectedShipping(val);
        fetchProducts({ shipping: val });
        break;
    }
  };

  const handleReset = () => {
    resetFilters();
    loadAllProducts(12);
  }

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

  // const showStars = (numStars=5) => {
  //   const stars = [];
  //   for (let i = numStars; i > 0; i--) {
  //     stars.push(
  //       <Star
  //         key={i}
  //         starClick={handleStarClick}
  //         numberOfStars={i}
  //       />
  //     );
  //   }
  //   return stars;
  // };

  const showSubs = () => {
    return subs.map((s) => {
      return (
        <div
          onClick={() => handleSub(s._id)}
          className='p-1 m-1 badge badge-primary'
          style={{ cursor: 'pointer' }}
          key={s._id}
        >
          {s.name}
        </div>
      );
    });
  };

  // const showBrands = () => {
  //   const btns = brands.map((b, idx) => {
  //     return (
  //       <Radio
  //         key={idx}
  //         value={b}
  //         name={b}
  //       >
  //         {b}
  //       </Radio>
  //     );
  //   });
  //   return (
  //     <Radio.Group
  //       onChange={(e) => radioChange(e, 'brand')}
  //       value={selectedBrand}
  //     >
  //       {btns}
  //     </Radio.Group>
  //   );
  // };

  const showColors = () => {
    const btns = colors.map((c, idx) => {
      return (
        <Radio
          key={idx}
          value={c}
          name={c}
        >
          {c}
        </Radio>
      );
    });
    return (
      <Radio.Group
        value={selectedColor}
        onChange={(e) => radioChange(e, 'color')}
      >
        {btns}
      </Radio.Group>
    );
  };

  const showShipping = () => {
    const shippingArr = ['Yes', 'No'];
    const btns = shippingArr.map((c, idx) => {
      return (
        <Radio
          key={idx}
          value={c}
          name={c}
        >
          {c}
        </Radio>
      );
    });
    return (
      <Radio.Group
        value={selectedShipping}
        onChange={(e) => radioChange(e, 'shipping')}
      >
        {btns}
      </Radio.Group>
    );
  };

  const showFilters = () => (
    <React.Fragment>
      <Button
        block
        type='primary'
        onClick={handleReset}
      >
        Reset Filters
      </Button>
      <Menu
        mode='inline'
        defaultOpenKeys={['1', '2', '3', '4', '5', '6', '7']}
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
      {/* Stars */}
      {/*<SubMenu 
                    key='3' 
                    title={
                      <span className='h6'>
                        <StarOutlined />
                        Rating
                      </span>
                    }
                  >
                    <div
                      style={{ marginTop: '-10px' }}
                    >  
                      <div className="px-4 pb-2">
                        {showStars()}
                      </div>
                    </div>
                  </SubMenu>*/}
        {/* Subs */}
        <SubMenu 
          key='4' 
          title={
            <span className='h6'>
              <AimOutlined />
              Sub-Categories
            </span>
          }
        >
          <div
            style={{ marginTop: '-10px' }}
          >
            <div className="px-4 pb-2">
              {showSubs()}
            </div>
          </div>
        </SubMenu>
      {/* Brands */}
        {/*<SubMenu 
                      key='5' 
                      title={
                        <span className='h6'>
                          <AimOutlined />
                          Brands
                        </span>
                      }
                    >
                      <div
                        style={{ marginTop: '-10px' }}
                      >
                        <div className="px-4 pb-2">
                          {showBrands()}
                        </div>
                      </div>
                    </SubMenu>*/}
      {/* Colors */}
        <SubMenu 
          key='6' 
          title={
            <span className='h6'>
              <AimOutlined />
              Colors
            </span>
          }
        >
          <div
            style={{ marginTop: '-10px' }}
          >
            <div className="px-4 pb-2">
              {showColors()}
            </div>
          </div>
        </SubMenu>
      {/* Shipping */}
        <SubMenu 
          key='7' 
          title={
            <span className='h6'>
              <AimOutlined />
              Shipping
            </span>
          }
        >
          <div
            style={{ marginTop: '-10px' }}
          >
            <div className="px-4 pb-2">
              {showShipping()}
            </div>
          </div>
        </SubMenu>
      </Menu>
    </React.Fragment>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 pt-2">
          <Collapse
            defaultActiveKey={windowWidth > 768 ? ['1'] : []}
          >
            <Panel
              header={<h4 className='mb-0'>Filters</h4>}
              key='1'
            >
              {showFilters()}
            </Panel>
          </Collapse>
        </div>
        <div className="col-md-9 pt-2">
     		  {products.length < 1 ? (
     		  	<h4>No products found</h4>
     		  ) : (
     		    <h4>Showing {products.length} product{products.length > 1 ? 's' : ''}</h4>
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