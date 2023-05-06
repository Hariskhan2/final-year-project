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
          <Link to="/about" className="btn">
            <span>About</span>
          </Link>

          <Link to="/contact" className="btn">Contact</Link>
          
          <Link to="/sellnow" className="searchContainer__Sell btn">
            Sell
          </Link>
          <Link to="/recommendation" className="searchContainer__Sell btn">
            Recycling
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
}

export default SearchFilter;
