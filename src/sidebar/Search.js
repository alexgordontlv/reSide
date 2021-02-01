import React, { useEffect } from 'react';
import './search.css';
import SearchIcon from '@material-ui/icons/Search';
import { withRouter } from 'react-router-dom';

const Search = ({ onChange, history }) => {
  let target = '';
  useEffect(() => {
    if (history.location.pathname === '/customers') {
      target = 'Customers';
    }
    if (history.location.pathname === '/properties') {
      target = 'Properties';
    }
  }, [history.location.pathname]);
  return (
    <div className="search__input">
      <SearchIcon className="search__searchIcon" />
      <input
        placeholder={`Search: ${target} by ${
          target === 'Customers' ? 'name' : 'address'
        }`}
        type="text"
        className="input"
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
};

export default withRouter(Search);
