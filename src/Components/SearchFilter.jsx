import React from "react";
import { Link } from "react-router-dom";
import "../../src/SearchFilter.css";

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
        <Link to="/home" className="focused">
          Home
        </Link>
        <Link to="/about">About</Link>
        <Link to="orders">Orders</Link>
        <Link to="/help">Help</Link>
        <Link to="/FAQ's">FAQ's</Link>
      </div>
    </div>
  );
}

export default SearchFilter;
