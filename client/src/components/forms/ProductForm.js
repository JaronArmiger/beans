import React from 'react';
import { Select } from 'antd';
import FileUpload from './FileUpload';
const { Option } = Select;

const ProductForm = ({ 
  handleChange, 
  handleSubmit,
  handleCategoryChange,
  values,
  setValues,
  subOptions,
  setLoading,
  categories,
}) => {
  const { 
  	title, 
  	description,
  	price,
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

  return (
	  <form 
	    onSubmit={handleSubmit}
	  >
	    <div className="p-3">
	      <FileUpload 
	        values={values}
	        setValues={setValues}
	      />
	    </div>
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
	        min='1'
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
	        value={shipping}
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
	        min='1'
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
	        value={color}
	      >
	        <option>** select a color **</option>
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
	        value={brand}
	      >
	        <option>** select a brand **</option>
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
	    <div className="form-group">
        <label>Category</label>
          <select 
            name="category" 
            className='form-control'
            onChange={handleCategoryChange}
            value={category}
          >  
            <option>** select a category **</option>
            {categories.length > 0 && categories.map((c) => {
            	return (
            	  <option 
            	    key={c._id}
            	    value={c._id}
            	  >
            	    {c.name}
            	  </option>
            	);
            })}
        </select>
      </div>
      <br />
      {(subOptions.length > 0) && 
      	(<div>
	      	<label>Sub-Categories</label>
	      	<Select
	      	  mode='multiple'
	      	  style={{width: '100%'}}
	      	  placeholder='select sub-categories'
	      	  value={subs}
	      	  onChange={subsArr => setValues({...values, subs: subsArr})}
	      	>
	      	  {subOptions.map((s) => {
	      	   	return (
	      	   	  <Option
	      	   	    key={s._id}
	      	   	    value={s._id}
	      	   	  >
	      	   	  	{s.name}
	      	   	  </Option>
	      	   	);
	      	   })
	      	  }
	      	</Select>
	      </div>)}
      	<br />
	    <button
	      className='btn btn-outline-info'
	    >
	      Save
	    </button>
	  </form>  
	);
};

export default ProductForm;