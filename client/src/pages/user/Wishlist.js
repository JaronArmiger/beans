import React, { useState, useEffect } from 'react';
import UserNav from '../../components/nav/UserNav';
import {
  getWishlist,
  removeFromWishlist,
} from '../../functions/wishlist';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  DeleteOutlined,
} from '@ant-design/icons';
import ModalImage from 'react-modal-image';
import defaultImage from '../../images/snake.jpg';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const { token } = useSelector(state => state.user);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = () => {
    getWishlist(token)
      .then(res => {
        setWishlist(res.data.wishlist);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleRemove = (productId, productTitle) => {
    removeFromWishlist(productId, token)
      .then(res => {
        if (res.data.ok) {
          loadWishlist();
          toast.success(`"${productTitle}" removed from wishlist.`);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
  	<div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col">
          <h4>Wishlist</h4>
          {wishlist.map((p, idx) => (
            <div key={idx} className='alert alert-secondary'>
              <div 
                className='d-inline-block mr-3'
                style={{maxWidth: '150px', height: 'auto'}}
              >
                <ModalImage
                  small={p.images[0] ? p.images[0].url : defaultImage}
                  large={p.images[0] ? p.images[0].url : defaultImage}
                />
              </div>
              <Link 
                to={`/product/${p.slug}`}
                className='h6'
                style={{ color: 'black' }}
              >
                {p.title}
              </Link>
              <span 
                className="btn btn-sm float-right"
                style={{ cursor: 'pointer' }}
                onClick={() => handleRemove(p._id, p.title)}
              >
                <DeleteOutlined className='text-danger'/>
              </span>
            </div>
          ))}
        </div>
      </div>
  	</div>
  );
};

export default Wishlist;