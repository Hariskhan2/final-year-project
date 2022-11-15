import React from "react";
import Banner from "../Images/BannerImage.jpeg";
import "./Banner.css";

function BannerImage() {
  return (
    <div className="image">
      <img src={Banner} alt="Banner Image!" />
    </div>
  );
}

export default BannerImage;
