import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../../functions/category';
import { LoadingOutlined } from '@ant-design/icons';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  	setLoading(true);
  	getCategories()
  	  .then((res) => {
  	  	setCategories(res.data);
  	  	setLoading(false);
  	  })
  	  .catch((err) => {
  	  	console.log(err);
  	  	setLoading(false);
  	  })
  }, []);

  const showCategories = () => {
    const categoryDivs = categories.map((c) => {
      return (
        <div 
          key={c._id} 
          className="col btn btn-outlined-primary btn-lg btn-block btn-raised m-3"
        >
 		  {c.name}
        </div>
      );
    });
    return categoryDivs;
  }

  return (
  	<div className='container'>
  	  <div className="row">
  	    {loading ? 
  	      (<LoadingOutlined className='text-danger h1'/>)
  	    : showCategories()}
  	  </div>
  	</div>
  );
};

export default CategoryList;