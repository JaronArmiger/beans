import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { SearchOutlined } from '@ant-design/icons';

export const Search = () => {
  const dispatch = useDispatch();
  const { text } = useSelector(state => state.search);

  const history = useHistory();

  const handleChange = (e) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: {
      	text: e.target.value,
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/shop?${text}`);
  };

  return (
    <form 
      className="form-inline my-2 mx-lg-1"
      onSubmit={handleSubmit}
    >
      <input 
        type="search"
        className='form-control mr-ms-2'
        value={text}
        onChange={handleChange}
        placeholder='Search'
      />
      <SearchOutlined 
        onClick={handleSubmit}
        style={{ cursor: 'pointer' }}
      />
    </form>
  );
};

export default Search;