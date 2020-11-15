import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { 
  getCategory,
  updateCategory,
} from '../../../functions/category';

const CategoryUpdate = ({ history, match }) => {
  const [name, setName] = useState('');
  const [oldName, setOldName] = useState('');
  const [loading, setLoading] = useState(false);

  const { user } = useSelector(state => state);

  useEffect(() => {
    loadCategory(match.params.slug);
  }, []);

  const loadCategory = (slug) => {
    getCategory(slug)
      .then((res) => {
        setName(res.data.name);
        setOldName(res.data.name);
      })
      .catch((err) => {
        console.log(err);
      })
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateCategory(match.params.slug, { name }, user.token)
      .then((res) => {
        setLoading(false);
        toast.success(`"${oldName}" changed to "${res.data.name}"!`);
        setName('');
        history.push('/admin/category');
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error('Category update failed.');
      })
  };

  
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
            ) : (<h4>Update Category</h4>)}
          {categoryForm()}
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;