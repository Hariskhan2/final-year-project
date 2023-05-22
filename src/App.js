import "./App.css";
import Navigation from "./Components/Navigation";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchFilter from "./Components/SearchFilter";
import Product from "./Components/Product";
import Checkout from "./Components/Checkout";
import BannerImage from "./Components/BannerImage";
import AddProduct from "./Components/AddProduct.js";
import Footer from "./Components/Footer";
import Dashboard from "./Components/Dashboard/Dashboard";
import RegistratioForm from "./Components/Register/Regis";
import LoginForm from "./Components/Login/Login";
import About from "./Components/AboutUS/About";
import Contact from "./Components/Contact/Contact";
import RecyclingModel from "./Components/Recommendation/RecyclingModel";
import ProductDetails from "./Components/ProductDetails/ProductDetails.js";
import AllProducts from "./Components/AllProducts/AllProducts.js";
import Privacypolicy from "./Components/PrivacyPolicy/Privacypolicy.js"
import { useState } from "react";
import Logout from "./Components/Logout/Logout";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("artsy-jwt") ? true : false
  );
  return (
    <div className="app-wrapper">
      <BrowserRouter>
        <Navigation loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <SearchFilter />
        <Routes>
          <Route
            index
            element={
              <>
                <BannerImage />
                <Product />
              </>
            }
          ></Route>
          <Route
            path="/checkout"
            element={
              <>
                {/* <Navigation loggedIn={loggedIn} setLoggedIn={setLoggedIn} /> */}
                <Checkout />
              </>
            }
          ></Route>

          <Route
            path="/logout"
            element={<Logout setLoggedIn={setLoggedIn} />}
          ></Route>

          {loggedIn ? (
            <>
              <Route path="/sellnow" element={<AddProduct />} />
              <Route path="/*" element={<Dashboard />} />
            </>
          ) : (
            <>
              <Route
                path="/login"
                element={<LoginForm setLoggedIn={setLoggedIn} />}
              ></Route>
              <Route
                path="/register"
                element={<RegistratioForm setLoggedIn={setLoggedIn} />}
              ></Route>
            </>
          )}

          <Route path="/about" element={<About />} />
          <Route path="/privacy-policy" element={<Privacypolicy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products/:id" exect element={<ProductDetails />} />
          <Route path="/allproducts" exect element={<AllProducts />} />
          <Route
            path="/recommendation"
            element={
              <>
                <RecyclingModel />
              </>
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
