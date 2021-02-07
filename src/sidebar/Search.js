import React, { useEffect } from 'react';
import './search.css';
import SearchIcon from '@material-ui/icons/Search';
import { withRouter } from 'react-router-dom';

const Search = ({ onChange, history }) => {
  let target = '';
  if (history.location.pathname === '/customers') {
    target = 'Customers';
  }
  if (history.location.pathname === '/properties') {
    target = 'Properties';
  }
  return (
    <div className="search__input">
      <input
        placeholder={`Search: ${target} by ${
          target === 'Customers' ? 'name' : 'address'
        }`}
        type="text"
        className="input"
        onChange={(event) => onChange(event.target.value)}
      />
      <SearchIcon fontSize="small" style={{ color: 'grey' }} />
    </div>
  );
};

export default withRouter(Search);
