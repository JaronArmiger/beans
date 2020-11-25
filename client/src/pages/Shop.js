import React, { useState, useEffect } from 'react';
import { 
  getProductsByCount,
  fetchProductsByFilter,
} from '../functions/product';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../components/cards/ProductCard';
import { LoadingOutlined } from '@ant-design/icons';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { text } = useSelector(state => state.search);

  useEffect(() => {
    loadAllProducts(12);
  }, []);

  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
    }, 300);
    return () => clearTimeout(delayed);
  }, [text])

  const loadAllProducts = (count) => {
  	setLoading(true);
  	getProductsByCount(count)
  	  .then((res) => {
        console.log(res);
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
  }


  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          search/filter menu
        </div>
        <div className="col-md-9">
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