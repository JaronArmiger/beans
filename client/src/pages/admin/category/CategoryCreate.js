import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { 
  createCategory, 
  getCategories,
  removeCategory,
} from '../../../functions/category';
import { Link } from 'react-router-dom';
import {
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import CategoryForm from '../../../components/forms/CategoryForm';

const CategoryCreate = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
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
    createCategory({ name }, user.token)
      .then((res) => {
        setLoading(false);
        setName('');
        toast.success(`Category "${res.data.name}" created!`);
        loadCategories();
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error('Category create failed.');
      })
  };

  const handleRemove = async (slug) => {
    if (window.confirm(`Delete ${slug}?`)) {
      setLoading(true);
      removeCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.success(`${res.data.name} deleted.`);
          loadCategories();
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          toast.error(`Error occurred. ${slug} not deleted.`)
        });
    }
  }

  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
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
            ) : (<h4>Create Category</h4>)}
          <CategoryForm 
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
          <hr />
          <input 
            type="search" 
            placeholder='filter categories'
            value={keyword}
            onChange={handleSearchChange}
            className='form-control mb-4'
          />
          {categories.filter(searched(keyword)).map((c) => (
            <div
              className='alert alert-secondary'
              key={c._id}
            >
              {c.name}{' '}
              <span
                onClick={() => handleRemove(c.slug)}
                className='btn btn-sm float-right'
              >
                <DeleteOutlined className='text-danger'/>
              </span>{' '}
              <Link to={`/admin/category/${c.slug}`}>
                <span 
                className='btn btn-sm float-right'
                >
                  <EditOutlined className='text-warning'/>
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
  	</div>
  );
};

export default CategoryCreate;