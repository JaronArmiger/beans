import React, { useState, useEffect } from 'react';
import { getProductsToPull } from '../../../functions/product';
import defaultImage from '../../../images/snake.jpg';
// import ProductCardInCheckout from '../../../components/cards/ProductCardInCheckout';
import ModalImage from 'react-modal-image';
import {
  FastForwardOutlined,
} from '@ant-design/icons';

const ProductsToPull = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    getProductsToPull()
      .then(res => {
        setProducts(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const pullProduct = (e) => {
    console.log(e);
  };

  const showProducts = () => (
    products.map((p, i) => {
      const {
        images,
        title,

      } = p;
      return (
        <div
          key={i}
          className='mb-3 p-2'
          style={{ backgroundColor: '#e1faee' }}
        >
          <div
            className='d-flex justify-content-between'
          >
            <div
              style={{ maxWidth: '150px', height: 'auto' }}
              className='d-flex justify-content-start'
            >
              <ModalImage
                className='float-right'
                small={images[0] ? images[0].url : defaultImage}
                large={images[0] ? images[0].url : defaultImage}
              />
            </div>
            <div>
              <p className='text-right'>{title}</p>
            </div>
          </div>
          <div
            className='mt-2 d-flex flex-column align-items-center'
          >
            <button
              className='btn btn-outline-primary'
              onClick={pullProduct}
            >
              Mark as pulled
              <FastForwardOutlined
                className='pl-1'
                style={{ fontSize: '20px' }}
              />
            </button>
          </div>
        </div>
      );
    })
  );

  return (
    <React.Fragment>
      {showProducts()}
    </React.Fragment>
  );
};

export default ProductsToPull;