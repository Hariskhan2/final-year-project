import React from "react";
import "./MainDash.css"
import Cards from "../Cards/Cards"
import Table from "../Table/Table.js"
import RightSide from "../RightSide/RightSide"
const MainDash = () => {
  return (
    <div className="MainDash">
      {/* <h1>Dashboard</h1> */}
      
      <h2>Recent Orders</h2>
      <p>(These are your Products that somebody Ordered)</p>
      <Table />
    </div>
  );
};

export default MainDash;
