import React from 'react'
import './search.css';
import SearchIcon from "@material-ui/icons/Search";



const Search = () => {
    return (
        <div className="search__input">
            <SearchIcon className="search__searchIcon" />
            <input placeholder="Search: Customers" type="text" />
      </div>
    )
}

export default Search;
