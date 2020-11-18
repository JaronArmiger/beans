import React, { useState, useEffect } from 'react';
import { getProductsByCount } from '../functions/product';
import ProductCard from '../components/cards/ProductCard';
import LoadingCards from '../components/cards/LoadingCards';
import { LoadingOutlined } from '@ant-design/icons';
import Jumbotron from '../components/cards/Jumbotron';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
  	setLoading(true);
  	getProductsByCount(10)
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
  	  <div 
  	    className='jumbotron text-danger h1 font-weight-bold text-center'
  	  >
        <Jumbotron 
          text={[
          	'Marni on Marni on me', 
            'Too Many Monograms It\'s Alphabet Soup',
          ]}
        />
      </div>
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

export default Home;
