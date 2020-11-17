import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import AdminProductCard from '../../../components/cards/AdminProductCard';
import { getProductsByCount } from '../../../functions/product';
import { toast } from 'react-toastify';
import { LoadingOutlined } from '@ant-design/icons';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

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
        toast.error(err.response.data.err);
      })
  }

  return (
  	<div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          <h4>All Products</h4>
          {loading && <LoadingOutlined className='text-warning h1'/>}
          <div className="row">
            {products.map((p) => {
              return (
                <div className="col-md-4 pb-3" key={p._id}>
                  <AdminProductCard 
                    product={p}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
  	</div>
  );
};

export default AllProducts;