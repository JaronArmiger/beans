import React from 'react';
import { Link } from 'react-router-dom';

const ProductListItems = ({ product }) => {
  const {
  	price,
  	category,
  	subs,
  	shipping,
  	color,
  	brand,
  	quantity,
  	sold,
  } = product;

  return (
    <ul
      className='list-group'
    >
      <li className="list-group-item">
        Price 
        <span className="label label-default label-pill pull-xs-right">
          {price && price.toLocaleString('en-US',{
              style: 'currency',
              currency: 'USD',
            })}
        </span>
      </li>
      {category && 
      	<li className="list-group-item">
          Category 
          <Link 
            className="label label-default label-pill pull-xs-right"
            to={`/category/${category.slug}`}
          >
            {category.name}
          </Link>
        </li>}
      {subs && subs.length > 0 &&
      	<li className="list-group-item">
      	  Sub Categories
      	  {subs.map((s) => {
      	  	return (
      	  	  <Link 
                className="label label-default label-pill pull-xs-right"
                to={`/sub/${s.slug}`}
                key={s._id}
              >
                {s.name}
              </Link>
      	  	);
      	  })}
      	</li>
      }
      <li className="list-group-item">
        Shipping Available? 
        <span className="label label-default label-pill pull-xs-right">
          {shipping}
        </span>
      </li>
      <li className="list-group-item">
        Color 
        <span className="label label-default label-pill pull-xs-right">
          {color}
        </span>
      </li>
      <li className="list-group-item">
        Brand 
        <span className="label label-default label-pill pull-xs-right">
          {brand}
        </span>
      </li>
      <li className="list-group-item">
        {quantity > 0 ? 'In-Stock' : 'Out of Stock'}
        <span className="label label-default label-pill pull-xs-right">
          {quantity > 0 ? quantity : ''}
        </span>
      </li>
      <li className="list-group-item">
        Number Sold 
        <span className="label label-default label-pill pull-xs-right">
          {sold}
        </span>
      </li>
    </ul>
  );
};

export default ProductListItems;