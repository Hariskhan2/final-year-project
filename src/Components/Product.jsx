import React, { useEffect, useState } from "react";
import Axios from "axios";

function Product() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await Axios.get("https://fakestoreapi.com/products");
      console.log(response);
    };
    fetchData();
  });
  return <h1>Hello World</h1>;
}

export default Product;
