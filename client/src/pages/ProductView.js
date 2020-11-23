import React, { useState, useEffect } from 'react';
import { 
  getProduct,
  productStar,
  getRelated,
} from '../functions/product';
import SingleProduct from '../components/cards/SingleProduct';
import ProductCard from '../components/cards/ProductCard';
import { useSelector } from 'react-redux';

const ProductView = ({ match }) => {
  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);
  const [star, setStar] = useState(0);
  const { slug } = match.params;
  const { user } = useSelector(state => state);

  useEffect(() => {
    loadProduct();
  }, [slug]);

  useEffect(() => {
    if (product.ratings && user) {
      const existingRating = product.ratings
        .find((r) => r.postedBy.toString() === user._id.toString());
      existingRating && setStar(existingRating.star); // current user's star
    } 
  });

  const loadProduct = () => {
    getProduct(slug)
      .then((res) => {
        setProduct(res.data);
        getRelated(res.data._id)
          .then((res) => setRelated(res.data))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }

  const onStarClick = (newRating, name) => {
    setStar(newRating);
    productStar(name, newRating, user.token)
      .then((res) => {
        loadProduct();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
  	<div className="container-fluid">
  	  <div className="row pt-4">
  	    <SingleProduct 
  	      product={product}
          onStarClick={onStarClick}
          star={star}
  	    />
  	  </div>
  	  <div className="row">
  	    <div className='col text-center pt-5 pb-5'>
          <hr />
          <h4>Related Products</h4>
          <hr />
        </div>
  	  </div>
      <div className="row">
        {(related.length) ? (
          related.map((product) => {
            return (
              <div className="col-md-4" key={product._id}>
                <ProductCard product={product}/>
              </div>
            );
          })  
        ) : (
          <div className="col text-center">
            No related products
          </div>
        )}
      </div>
  	</div>
  );
};

export default ProductView;