import React from "react";
import { Link } from "react-router-dom";
import "../../src/Navigation.css";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
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
        <Link to="/register" className="signup">
          Sign Up
        </Link>

        <Link to="/checkout">
          <div className="navBar__optionBasket">
            <ShoppingBasketIcon className="navBar__basket" />
            <span className="navBar__basketCount">{basket?.length}</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Navigation;
