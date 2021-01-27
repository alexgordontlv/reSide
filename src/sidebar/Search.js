import React from 'react';
import './search.css';
import SearchIcon from '@material-ui/icons/Search';
import { withRouter } from 'react-router-dom';

const Search = ({ onChange, history }) => {
  console.log(history.location.pathname);
  let target = '';
  if (history.location.pathname === '/customers') {
    target = 'Customers';
  }
  if (history.location.pathname === '/properties') {
    target = 'Properties';
  }
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
