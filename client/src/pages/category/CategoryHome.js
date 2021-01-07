import React, { useState, useEffect } from 'react';
import { getCategory } from '../../functions/category';
import ProductCard from '../../components/cards/ProductCard';

const CategoryHome = ({ match }) => {
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = match.params;

  useEffect(() => {
  	setLoading(true);
    getCategory(slug)
      .then((res) => {
        setCategory(res.data.category);
        setProducts(res.data.products);
        setLoading(false);
      })
      .catch((err) => {
      	setLoading(false);
      	console.log(err);
      })
  }, [slug]);

  return (
  	<div className="container-fluid">
  	  <div className="row">
  	    <div className="col">
	  	  <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
	  	    {category.name}
	  	  </h4>
  	    </div>
  	  </div>
  	  <div className="row">
  	    {products.length < 1 ? (
	  	    <h6 className='pl-4'>No products found :(</h6>
	  	  ) : (
	  	    products.map((p) => {
	  	      return (
	  	      	<div className="col-md-4" key={p._id}>
	  	      	  <ProductCard product={p} />
	  	      	</div>
	  	      );
	  	    })
	  	  )}
  	  </div>
  	</div>
  );
};

export default CategoryHome;