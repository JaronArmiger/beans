import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getCategories } from '../../../functions/category';
import { 
  updateSub,
  getSub,
} from '../../../functions/sub';
import CategoryForm from '../../../components/forms/CategoryForm';

const SubUpdate = ({ match, history }) => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [parent, setParent] = useState('');

  const { user } = useSelector(state => state);

  useEffect(() => {
    loadCategories();
    loadSub();
  }, []);

  const loadCategories = () => {
    getCategories()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const loadSub = () => {
    getSub(match.params.slug)
      .then((res) => {
        setName(res.data.name);
        setParent(res.data.parent);
      })
      .catch((err) => {
        console.log(err);
      })
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (parent.length == 0) {
      toast.error('Select a parent category.');
      return;
    }
    updateSub(match.params.slug, { name, parent }, user.token)
      .then((res) => {
        setLoading(false);
        setName('');
        toast.success('Sub-Category updated!');
        history.push('/admin/sub');
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error(err.message);
      })
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? (
              (<h4 className="text-danger">Loading...</h4>)
            ) : (<h4>Update Sub-Category</h4>)}

          <div className="form-group">
            <label>Parent Category</label>
            <select 
              name="category" 
              className='form-control'
              onChange={(e) => setParent(e.target.value)}
              value={parent}
            >  
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

export default SubUpdate;