import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getCategories } from '../../../functions/category';
import { 
  createSub,
  getSub,
  removeSub
} from '../../../functions/sub';
import { Link } from 'react-router-dom';
import {
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import CategoryForm from '../../../components/forms/CategoryForm';
import LocalSearch from '../../../components/forms/LocalSearch';

const SubCreate = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [keyword, setKeyword] = useState('');

  const { user } = useSelector(state => state);

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
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (category.length == 0) {
      toast.error('Select a parent category.');
      return;
    }
    createSub({ name, parent: category }, user.token)
      .then((res) => {
        setLoading(false);
        setName('');
        toast.success(`Category "${res.data.name}" created!`);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error(err.message);
      })
  };

  const handleRemove = async (slug) => {
    if (window.confirm(`Delete ${slug}?`)) {
      setLoading(true);
      removeSub(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.success(`${res.data.name} deleted.`);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          toast.error(`Error occurred. ${slug} not deleted.`)
        });
    }
  }

  const searched = (keyword) => {
    return (c) => c.name.toLowerCase().includes(keyword);
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
            ) : (<h4>Create Sub-Category</h4>)}

          <div className="form-group">
            <label>Parent Category</label>
            <select 
              name="category" 
              className='form-control'
              onChange={(e) => setCategory(e.target.value)}
            >  
              <option>select a parent category</option>
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

          <hr />

          <LocalSearch 
            keyword={keyword}
            setKeyword={setKeyword}
          />
          
           {// categories.filter(searched(keyword)).map((c) => (
          //   <div
          //     className='alert alert-secondary'
          //     key={c._id}
          //   >
          //     {c.name}{' '}
          //     <span
          //       onClick={() => handleRemove(c.slug)}
          //       className='btn btn-sm float-right'
          //     >
          //       <DeleteOutlined className='text-danger'/>
          //     </span>{' '}
          //     <Link to={`/admin/category/${c.slug}`}>
          //       <span 
          //       className='btn btn-sm float-right'
          //       >
          //         <EditOutlined className='text-warning'/>
          //       </span>
          //     </Link>
          //   </div>
          // ))
           }
        </div>
      </div>
  	</div>
  );
};

export default SubCreate;