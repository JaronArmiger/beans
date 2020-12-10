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
  EyeOutlined,
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
    <React.Fragment>
      {wishlist.map((p, idx) => (
        <div 
          className='alert alert-secondary'
          key={idx} 
        >
          <div
            style={{maxWidth: '150px', height: 'auto'}}
          >
            <ModalImage
              src={p.images[0] ? p.images[0].url : defaultImage}
              large={p.images[0] ? p.images[0].url : defaultImage}
            />
            <span>{p.title}</span>
            <p>${p.price.toLocaleString('en-US', { type: 'currency', currency: 'USD' })}</p>
          </div>
          <div
          >
            <Link 
              to={`/product/${p.slug}`}
            >
              <EyeOutlined className='text-success' style={{ fontSize: '20px' }}/>
            </Link>
            <span 
              className="btn btn-sm float-right"
              style={{ cursor: 'pointer' }}
              onClick={() => handleRemove(p._id, p.title)}
            >
              <DeleteOutlined className='text-danger h-4'/>
            </span>
          </div>
        </div>
      ))}
    </React.Fragment>
  );
};

export default Wishlist;