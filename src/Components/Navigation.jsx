import React from "react";
import { Link } from "react-router-dom";
import "../../src/Navigation.css";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { useStateValue } from "../redux/StateProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
// import { UilUserCircle } from "@iconscout/react-unicons";
import Button from "@mui/material/Button";
import Searchbar from "./SearchBar/Searchbar";
// import SearchIcon from "@material-ui/icons/Search";

function Navigation({ loggedIn, setLoggedIn }) {
  const [{ basket }, dispatch] = useStateValue();
  const handleLogout = () => {
    // Perform logout logic here
    // For example, reset loggedIn state and perform any necessary cleanup
    setLoggedIn(false);
    // Additional logic, if needed
  };
  return (
    <div className="navBar">
      <div className="navBar__leftSide">
        <h3>ARTSY SCRAPYARD</h3>
      </div>
      <Searchbar />
      <div className="navBar__rightSide">
        {loggedIn ? (
          <>
            <Link to="/logout" className="signup">
              Logout
            </Link>
            <Button style={{ height: "70px" }}>
              <Link to="/dashboard">
                <FontAwesomeIcon
                  className="profile"
                  icon={faUser}
                  size="2xl"
                  style={{ color: "#fff" }}
                />
              </Link>
            </Button>
          </>
        ) : (
          <div>
            <Link to="/login" className="login">
              Login
            </Link>
            <Link to="/register" className="signup">
              Sign Up
            </Link>
          </div>
        )}

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
