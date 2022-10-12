import React from "react";
import { Link } from "react-router-dom";
import "../../src/SearchFilter.css";

function SearchFilter() {
  return (
    <React.Fragment>
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
          <Link to="/sellnow" className="searchContainer__Sell">
            Sell Now
          </Link>
        </div>
      </div>
      <div className="searchContainer__filter">
        <button type="button">All Categories</button>
        <button type="button">Used Cars</button>
        <button type="button">Electronics</button>
        <button type="button">Accidental Cars</button>
        <button type="button">Scrap Material</button>
        <button type="button">Art products</button>
        <button type="button">Recommendation</button>
      </div>
    </React.Fragment>
  );
}

export default SearchFilter;
