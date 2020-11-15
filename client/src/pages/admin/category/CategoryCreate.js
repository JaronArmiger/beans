import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { 
  createCategory, 
  getCategories,
  removeCategory,
} from '../../../functions/category';

const CategoryCreate = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const { user } = useSelector(state => state);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createCategory({ name }, user.token)
      .then((res) => {
        setLoading(false);
        setName('');
        toast.success(`Category "${res.data.name}" created!`);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error('Category create failed.');
      })
  }
  
  const categoryForm = () => {
    return (
      <form
        onSubmit={handleSubmit}
      >
       <div className="form-group">
         <label>Name</label>
         <input 
           type="text"
           className='form-control'
           value={name}
           onChange={e => setName(e.target.value)}
           autoFocus
           required
         />
         <br />
         <button
           className='btn btn-outline-primary'
           disabled={!name || name.length < 3}
         >
           Save
         </button>
       </div> 
      </form>
    );
  }

  return (
  	<div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? (
              (<h4 className="text-danger">Loading...</h4>)
            ) : (<h4>Create Category</h4>)}
          {categoryForm()}
        </div>
      </div>
  	</div>
  );
};

export default CategoryCreate;