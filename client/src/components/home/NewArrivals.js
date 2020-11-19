import React, { useState, useEffect } from 'react';
import { getProducts } from '../../functions/product';
import ProductCard from '../cards/ProductCard';
import LoadingCards from '../cards/LoadingCards';
import Jumbotron from '../cards/Jumbotron';
import { LoadingOutlined } from '@ant-design/icons';

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
  	setLoading(true);
    // sort, order, limit
  	getProducts('createdAt', 'desc', 6)
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
  	</React.Fragment>
  );
}

export default NewArrivals;
