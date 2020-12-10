import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { 
  getCategory,
  updateCategory,
} from '../../../functions/category';
import CategoryForm from '../../../components/forms/CategoryForm';

const CategoryUpdate = ({ history, match }) => {
  const [name, setName] = useState('');
  const [oldName, setOldName] = useState('');
  const [loading, setLoading] = useState(false);

  const { user } = useSelector(state => state);

  useEffect(() => {
    loadCategory(match.params.slug);
  }, [match.params.slug]);

  const loadCategory = (slug) => {
    getCategory(slug)
      .then((res) => {
        setName(res.data.category.name);
        setOldName(res.data.category.name);
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
        history.push('/admin/dashboard/4');
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error('Category update failed.');
      })
  };


  return (
    <div className="container-fluid">
      <div className="row justify-content-centert">
        <div className="col-md-10 pt-4">
          {loading ? (
              (<h4 className="text-danger">Loading...</h4>)
            ) : (<h4>Update Category</h4>)}
          <CategoryForm 
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;