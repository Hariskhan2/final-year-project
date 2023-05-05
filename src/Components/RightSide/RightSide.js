import React from "react";
import "./RightSide.css";
import CustomerReview from "../CustomerReview/CustomerReview"
import Updates from "../Updates/Updates";
const RightSide = () => {
  return (
    <div className="RightSide">
      <div>
       
        <h3>Updates</h3>
        <Updates />
      </div>
      {/* <div>
        <h3>Customers Review</h3>
        <CustomerReview />
      </div> */}
    </div>
  );
};

export default RightSide;
