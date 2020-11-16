import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { createProduct } from '../../../functions/product';

const initialValues = {
  title: '',
  description: '',
  price: '',
  categories: [],
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

const ProductCreate = () => {
  const [values, setValues] = useState(initialValues);
  const {token} = useSelector(state => state.user);

  const { 
  	title, 
  	description,
  	price,
  	categories,
  	category,
  	subs,
  	shipping,
  	quantity,
  	images,
  	colors,
  	brands,
  	color,
  	brand,
  } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values, token)
      .then((res) => {
      	console.log(res);
      })
      .catch((err) => {
        console.log(err);
        toast.error('Product create failed.');
      });
  }

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h4>Product Create</h4>
          <hr />
          <form 
            onSubmit={handleSubmit}
          >
            <div className="from-group">
              <label>Title</label>
              <input 
                type="text" 
                name="title"
                className='form-control'
                value={title}
                onChange={handleChange}
              />
            </div>
            <br />
            <div className="from-group">
              <label>Description</label>
              <input 
                type="text" 
                name="description"
                className='form-control'
                value={description}
                onChange={handleChange}
              />
            </div>
            <br />
            <div className="from-group">
              <label>Price</label>
              <input 
                type="number" 
                name="price"
                className='form-control'
                value={price}
                onChange={handleChange}
              />
            </div>
            <br />
            <div className="from-group">
              <label>Shipping</label>
              <select 
                name="shipping"
                className='form-control'
                onChange={handleChange}
              >
                <option>** select an option **</option>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
            <br />
            <div className="from-group">
              <label>Quantity</label>
              <input 
                type="number" 
                name="quantity"
                className='form-control'
                value={quantity}
                onChange={handleChange}
              />
            </div>
            <br />
            <div className="from-group">
              <label>Color</label>
              <select 
                name="color"
                className='form-control'
                onChange={handleChange}
              >
                <option>** select an option **</option>
                {colors.map((c) => {
                  return (
                  	<option 
                  	  key={c}
                  	  value={c}>
                  	  {c}
                  	</option>
                  );
                })}
              </select>
            </div>
            <br />
            <div className="from-group">
              <label>Brand</label>
              <select 
                name="brand"
                className='form-control'
                onChange={handleChange}
              >
                <option>** select an option **</option>
                {brands.map((b) => {
                  return (
                  	<option 
                  	  key={b}
                  	  value={b}>
                  	  {b}
                  	</option>
                  );
                })}
              </select>
            </div>
            <br />
            <button
              className='btn btn-outline-info'
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;