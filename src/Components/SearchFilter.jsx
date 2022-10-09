import React from "react";
import { Link } from "react-router-dom";

function SearchFilter() {
  return (
    <div className="searchContainer">
      <div className="searchContainer__input">
        <input
          type="text"
          placeholder="Search Your Desired Product Here ..."
        ></input>
      </div>
      <div className="searchContainer__menu">
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>
        <Link to="orders">Orders</Link>
        <Link to="/help">Help</Link>
      </div>
    </div>
  );
}

export default SearchFilter;
