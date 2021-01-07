import React, { useState, useEffect } from 'react';
import { getProducts, getProductsCount } from '../../functions/product';
import ProductCard from '../cards/ProductCard';
import LoadingCards from '../cards/LoadingCards';
import { Pagination } from 'antd'; 

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);
  const perPage = 3;

  useEffect(() => {
    loadProducts();
  }, [page]);

  useEffect(() => {
    getProductsCount()
      .then((res) => {
        setProductsCount(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  const loadProducts = () => {
  	setLoading(true);
    // sort, order, limit
  	getProducts('createdAt', 'desc', perPage, page)
  	  .then((res) => {
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
  	  <div className="container">
        {loading ? 
          (<LoadingCards count={3} />) :
        	(<div className="row">
              {products.map((product) => {
              	return (
              	  <div className="col-md-4" key={product._id}>
              	    <ProductCard 
              	     product={product}
              	    />
              	  </div>
        	                  	);
        	     })}
        	   </div>)}
      </div>

      <div className="row">
        <nav className='col-md-4 offset-md-4 text-center p-3 mt-5'>
          <Pagination 
            current={page}
            total={(productsCount / perPage) * 10}
            onChange={value => setPage(value)}
          />
        </nav>
      </div>
  	</React.Fragment>
  );
}

export default NewArrivals;
