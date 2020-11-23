import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSubs } from '../../functions/sub';
import { LoadingOutlined } from '@ant-design/icons';

const SubList = () => {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  	setLoading(true);
  	getSubs()
  	  .then((res) => {
  	  	setSubs(res.data);
  	  	setLoading(false);
  	  })
  	  .catch((err) => {
  	  	console.log(err);
  	  	setLoading(false);
  	  })
  }, []);

  const showSubs = () => {
    const subDivs = subs.map((s) => {
      return (
        <div 
          key={s._id} 
          className="col btn btn-outlined-primary btn-lg btn-block btn-raised m-3"
        >
 		  <Link
 		    to={`/sub/${s.slug}`}
 		  >
 		  	{s.name}
 		  </Link>
        </div>
      );
    });
    return subDivs;
  }

  return (
  	<div className='container'>
  	  <div className="row">
  	    {loading ? 
  	      (<LoadingOutlined className='text-danger h1'/>)
  	    : showSubs()}
  	  </div>
  	</div>
  );
};

export default SubList;