import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "../pages/HomePage";

import Products from "../pages/products/Products";
import Orders from "../pages/Orders/Orders";
import EditProfile from "../pages/EditForm/EditForm";

const Paths = () => {
  return (
    <Routes>
      {/* <Route path="/dashboard" element={<Homepage />} /> */}

      <Route path="/dashboard/products" element={<Products />} />
      <Route path="/dashboard/orders" element={<Orders />} />
      <Route path="/dashboard/edit_profile" element={<EditProfile />} />
    </Routes>
  );
};

export default Paths;
