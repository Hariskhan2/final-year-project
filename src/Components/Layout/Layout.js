import React from "react";
import { BrowserRouter } from "react-router-dom";

import Sidebar from "../Sidebar.js";

import Paths from "../Routes";

const Layout = () => {
  return (
    <>
      {/* <BrowserRouter>
 <Header />
 </BrowserRouter> */}

      <Sidebar />
      <Paths />
    </>
  );
};

export default Layout;
