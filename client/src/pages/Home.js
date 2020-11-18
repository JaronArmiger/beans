import React, { useState, useEffect } from 'react';
import { getProductsByCount } from '../functions/product';

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
    <div>
      <p>react home</p>
    </div>
  );
}

export default Home;
