import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { createProduct } from '../../../functions/product';
import ProductForm from '../../../components/forms/ProductForm';
import { 
  getCategories, 
  getCategorySubs,
} from '../../../functions/category';
import {
  getProduct,
  updateProduct,
} from '../../../functions/product';
import { LoadingOutlined } from '@ant-design/icons';

const initialValues = {
  title: '',
  description: '',
  price: '',
  category: '',
  subs: [],
  shipping: '',
  quantity: '',
  images: [],
  colors: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
  brands: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'Asos'],
  color: '',
  brand: '',
}

const ProductUpdate = ({ match, history }) => {
  const [values, setValues] = useState(initialValues);
  const [categories, setCategories] = useState([]);
  const [subOptions, setSubOptions] = useState([]);
  const [selectedSubs, setSelectedSubs] = useState([]);
  const [loading, setLoading] = useState(false);

  const {token} = useSelector(state => state.user);

  useEffect(async () => {
    await loadProduct(match.params.slug);
    await loadCategories();
  }, []);


  const loadProduct = (slug) => {
    setLoading(true);
    getProduct(slug)
      .then((res) => {
        setLoading(false);
        const subsArr = res.data.subs.map((s) => s._id);
        const productObj = {
          ...res.data,
          category: res.data.category._id,
          subs: subsArr,
        };
        setValues({...values, ...productObj});
        getCategorySubs(res.data.category._id)
          .then((res) => {
            setSubOptions(res.data);
          })
          .catch((err) => {
            console.log(err.response.data.err);
            toast.error(err.response.data.err);
          });
          const subsArr2 = res.data.subs.map((s) => s._id);
          // setValues({...values, subs: subsArr });
          setSelectedSubs(subsArr2);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        // toast.error(err.response.data.err);
      })
  }

  const loadCategories = () => {
    getCategories()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    setLoading(true);
    updateProduct(match.params.slug, values, token)
      .then((res) => {
      	setLoading(false);
      	console.log(res.data);
      	toast.success(`Product updated successfully!`);
      	history.push('/admin/products');
      })
      .catch((err) => {
      	setLoading(false);
        console.log(err.response.data.err);
        toast.error(err.response.data.err);
      });
  }

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
  }

  const handleCategoryChange = (e) => {
    setValues({
      ...values, 
      subs: [], 
      category: e.target.value 
    });
    getCategorySubs(e.target.value)
      .then((res) => {
        setSubOptions(res.data);
        setSelectedSubs([]);
      })
      .catch((err) => {
        console.log(err.response.data.err);
        toast.error(err.response.data.err);
      });
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h4>Product Create</h4>
          {loading && <LoadingOutlined className='text-danger h1'/>}
          <hr />
          <ProductForm 
            handleChange={handleChange}
            handleCategoryChange={handleCategoryChange}
            handleSubmit={handleSubmit}
            values={values}
            setValues={setValues}
            subOptions={subOptions}
            setLoading={setLoading}
            categories={categories}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;