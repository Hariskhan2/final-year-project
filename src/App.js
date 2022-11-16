import logo from "./logo.svg";
import "./App.css";
import Navigation from "./Components/Navigation";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchFilter from "./Components/SearchFilter";
import Product from "./Components/Product";
import Checkout from "./Components/Checkout";
import EditProfile from "./Components/EditForm";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import BannerImage from "./Components/BannerImage";
import ProductForm from "./Components/AddProduct";
import Footer from "./Components/Footer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={
              <>
                <Navigation />
                <SearchFilter />
                <BannerImage />
                <Product />
                <Footer />
              </>
            }
          ></Route>
          <Route
            path="/checkout"
            element={
              <>
                <Navigation />
                <Checkout />
              </>
            }
          ></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<SignUp />}></Route>
          <Route path="/sellnow" element={<ProductForm />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
