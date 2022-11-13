import React from "react";
import { Link } from "react-router-dom";
import "../../src/Navigation.css";
import { useStateValue } from "../redux/StateProvider";

function Navigation() {
  const [{ basket }, dispatch] = useStateValue();
  return (
    <div className="navBar">
      <div className="navBar__leftSide">
        <h1>Logo</h1>
      </div>
      <div className="navBar__rightSide">
        <Link to="/login" className="login">
          Login
        </Link>
        <Link to="/signup" className="signup">
          Sign Up
        </Link>

        <Link to="/checkout">
          <div className="header__optionBasket">
            {/* <ShoppingBasketIcon /> */}
            <p>Basket</p>
            <span className="header__optionLineTwo header__basketCount">
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Navigation;
