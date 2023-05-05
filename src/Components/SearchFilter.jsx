import React from "react";
import { Link } from "react-router-dom";
import "../../src/SearchFilter.css";

function SearchFilter() {
  return (
    <React.Fragment>
      <div className="searchContainer">
        <div className="searchContainer__menu">
          <Link to="/" className="focused">
            Home
          </Link>
          <Link to="/about">
            <span>About</span>
          </Link>

          <Link to="/contact">Contact</Link>
          <Link to="/FAQ's">FAQ's</Link>
          <Link to="/sellnow" className="searchContainer__Sell">
            Sell
          </Link>
          <Link to="/recommendation" className="searchContainer__Sell">
            Recycling
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
}

export default SearchFilter;
