import React, { useState } from "react";
import "./Search.css";

const Search = ({ value, onChange }) => {
  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search"
        className="search"
      />
    </div>
  );
};

export default Search;
