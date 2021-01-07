import React, { useState, useEffect } from 'react';
import AdminProductCard from '../../../components/cards/AdminProductCard';
import { 
  getProductsByCount,
  removeProduct,
} from '../../../functions/product';
import { toast } from 'react-toastify';
import { LoadingOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { token } = useSelector(state => state.user);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(100)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        // toast.error(err.response.data.err);
      })
  }

  const handleRemove = (slug) => {
    setLoading(true);
    const answer = window.confirm(`Are you sure you want to delete "${slug}"?`);
    if (answer) {
      removeProduct(slug, token)
        .then((res) => {
          setLoading(false);
          toast.success(`${slug} deleted :/`);
          loadAllProducts();
        })
        .catch((err) => {
          setLoading(false);
          console.log(err.response.data.err);
          toast.error((err.response.data.err));
        })
    }
  }

  return (
  	<React.Fragment>
      {loading && <LoadingOutlined className='text-warning h1'/>}
      <div className="row">
        {products.map((p) => {
          return (
            <div className="col-md-4 pb-3" key={p._id}>
              <AdminProductCard 
                product={p}
                handleRemove={handleRemove}
              />
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default AllProducts;