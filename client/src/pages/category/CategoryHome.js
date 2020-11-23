import React, { useState, useEffect } from 'react';
import { getCategory } from '../../functions/category';
import { Link } from 'react-router-dom';
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
  }, []);

  return (
  	<div> 
  	{JSON.stringify(category)}
  	{JSON.stringify(products)}
  	CategoryHome {slug}
  	</div>
  );
};

export default CategoryHome;