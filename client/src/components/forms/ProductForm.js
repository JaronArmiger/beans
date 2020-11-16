import React from 'react';

const ProductForm = ({ 
  handleChange, 
  handleSubmit,
  handleCategoryChange,
  values,
}) => {
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

  return (
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
	    <button
	      className='btn btn-outline-info'
	    >
	      Save
	    </button>
	  </form>  
	);
};

export default ProductForm;