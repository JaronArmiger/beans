import React, { useState, useEffect } from 'react';
import { getProductsByCount } from '../functions/product';
import ProductCard from '../components/cards/ProductCard';
import { LoadingOutlined } from '@ant-design/icons';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
  	setLoading(true);
  	getProductsByCount(3)
  	  .then((res) => {
  	  	console.log(res.data);
        setProducts(res.data);
        setLoading(false);
  	  })
  	  .catch((err) => {
 		setLoading(false);
 		console.log(err);
  	  })
  }

  return (
  	<React.Fragment>
  	  <div className='jumbotron'>
        <h4>All Products</h4>
        {loading && <LoadingOutlined className='text-warning h1'/>}
      </div>
  	  <div className="container">
        <div className="row">
          {products.map((product) => {
          	return (
          	  <div className="col-md-4" key={product._id}>
          	    <ProductCard 
          	     product={product}
          	    />
          	  </div>
          	);
          })}
        </div>
      </div>
  	</React.Fragment>
  );
}

export default Home;
