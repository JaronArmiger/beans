import React, { useState, useEffect } from 'react';
import { 
  getProduct,
  productStar,
} from '../functions/product';
import SingleProduct from '../components/cards/SingleProduct';
import { useSelector } from 'react-redux';

const ProductView = ({ match }) => {
  const [product, setProduct] = useState({});
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
      .then((res) => setProduct(res.data))
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
  	</div>
  );
};

export default ProductView;