import React from "react";
import { Link } from "react-router-dom";
import "../../src/Navigation.css";

function Navigation() {
  return (
    <div className="navBar">
      <div className="navBar__leftSide">
        <h1>Logo</h1>
      </div>
      <div className="navBar__rightSide">
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
}

export default Navigation;
