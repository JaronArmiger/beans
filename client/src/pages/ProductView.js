import React, { useState, useEffect } from 'react';
import { getProduct } from '../functions/product';

const ProductView = ({ match }) => {
  const [product, setProduct] = useState({});
  const { slug } = match.params;

  useEffect(() => {
    loadProduct();
  }, [slug]);

  const loadProduct = () => {
    getProduct(slug)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }

  return (
  	<React.Fragment>
  		{JSON.stringify(product)}
  	</React.Fragment>
  );
};

export default ProductView;