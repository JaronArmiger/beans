import React, { useState, useEffect } from 'react';
import { getSub } from '../../functions/sub';
import ProductCard from '../../components/cards/ProductCard';
import { LoadingOutlined } from '@ant-design/icons';

const SubHome = ({ match }) => {
  const [sub, setSub] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');

  const { slug } = match.params;

  useEffect(() => {
  	setLoading(true);
    getSub(slug)
      .then((res) => {
        setSub(res.data.sub);
        setProducts(res.data.products);
        setLoading(false);
      })
      .catch((err) => {
      	setLoading(false);
      	console.log(err);
      })
  }, [slug]);

  useEffect(() => {
    if (sub && sub.name) {
      if (sub.name.includes('-m')) {
        const newName = 'Men\'s ' + sub.name.substring(0, sub.name.length - 2);
        setName(newName);
      } else if (sub.name.includes('-w')) {
        const newName = 'Women\'s ' + sub.name.substring(0, sub.name.length - 2);
        setName(newName);
      } else {
         console.log(sub.name);
        setName(sub.name);
      }
    }
  }, [sub]);

  // const showName = () => {
  //   if (sub && sub.name) {
  //     if (sub.name.includes('-m')) {
  //       console.log('men')
  //     }
  //   }
      
  //   return (
  //     <h4>Ay</h4>
  //   );
  // };

  return (
  	<div className="container">
  	    {/*
          <div className="row">
            <div className="col">
              <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
                {products.length} products in "{sub.name}" sub-category
              </h4>
            </div>
          </div>
      */}
      <div className="row">
        <div className="col">
        <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
          {name}
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

export default SubHome;