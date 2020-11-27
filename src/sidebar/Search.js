import React from "react";
import "./search.css";
import SearchIcon from "@material-ui/icons/Search";


const Search = (props) => {
  return (
    <div className="search__input">
      <SearchIcon className="search__searchIcon" />
      <input placeholder="Search: Customers" type="text" className="input" onChange={(event)=>props.onChange(event.target.value)}/>
    </div>
  );
};

export default Search;
