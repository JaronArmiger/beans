import React, { useState, useEffect } from 'react';
import { 
  getProductsToPull,
  markAsPulled,
} from '../../../functions/product';
import defaultImage from '../../../images/snake.jpg';
// import ProductCardInCheckout from '../../../components/cards/ProductCardInCheckout';
import ModalImage from 'react-modal-image';
import {
  FastForwardOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const ProductsToPull = () => {
  const [products, setProducts] = useState([]);

  const { token } = useSelector(state => state.user);

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

  const pullProduct = (productId, title) => {
    markAsPulled(productId, token)
      .then(res => {
        if (res.data.ok) loadProducts();
        toast.success(`${title} marked as pulled.`)
      })
      .catch(err => {
        console.log(err);
      });
  };

  const showProducts = () => (
    products.map((p, i) => {
      const {
        _id,
        images,
        title,
        soldDate,
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
              <p className='text-right'><b>Sold on: </b>{new Date(soldDate).toLocaleDateString()}</p>
            </div>
          </div>
          <div
            className='mt-2 d-flex flex-column align-items-center'
          >
            <button
              className='btn btn-outline-primary'
              onClick={() => pullProduct(_id, title)}
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