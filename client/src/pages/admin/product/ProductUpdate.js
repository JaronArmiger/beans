import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { createProduct } from '../../../functions/product';
import ProductUpdateForm from '../../../components/forms/ProductUpdateForm';
import { 
  getCategories, 
  getCategorySubs,
} from '../../../functions/category';
import {
  getProduct,
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

const ProductUpdate = ({ match }) => {
  const [values, setValues] = useState(initialValues);
  const [categories, setCategories] = useState([]);
  const [subOptions, setSubOptions] = useState([]);
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
        setValues({...values, ...res.data});
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

  const loadSubs = (_id) => {
    getCategorySubs(_id)
      .then((res) => {
        setSubOptions(res.data);
      })
      .catch((err) => {
        console.log(err.response.data.err);
        toast.error(err.response.data.err);
      });
  }
  

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createProduct(values, token)
      .then((res) => {
      	setLoading(false);
      	console.log(res.data);
      	window.alert(`"${res.data.title}" created successfully!`);
      	window.location.reload();
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
    loadSubs(e.target.value);
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
          <ProductUpdateForm 
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