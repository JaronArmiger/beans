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
import { LoadingOutlined } from '@ant-design/icons';

const initialValues = {
  title: '',
  description: '',
  price: '',
  category: '',
  subs: [],
  shipping: '',
  quantity: '1',
  images: [],
  colors: [
      'Black', 
      'Brown', 
      'Silver', 
      'White',
      'Red',
      'Orange',
      'Yellow',
      'Green',
      'Blue',
      'Purple',
      'Other',
    ],
  brands: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'Asos'],
  color: '',
  brand: '',
  designer: 'No',
  size: '',
}

const ProductCreate = () => {
  const [values, setValues] = useState(initialValues);
  const [subOptions, setSubOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const {token} = useSelector(state => state.user);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    getCategories()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
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
    getCategorySubs(e.target.value)
      .then((res) => {
        setSubOptions(res.data);
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

export default ProductCreate;