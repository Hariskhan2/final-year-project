import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./Product.css";

function Product() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await Axios.get("https://fakestoreapi.com/products");
      setData(response.data);
    };
    fetchData();
  });
  return (
    <div className="card">
      {data.map((product) => {
        const { id, image, title, price, rating, category, description } =
          product;
        return (
          <div className="card__Container">
            <div className="card__header" key={id}>
              <img src={image} alt={title}></img>
            </div>

            <div className="card__body">
              <h3>{category}</h3>
              <p className="card__description">
                {" "}
                {description.length > 130
                  ? `${description.substring(0, 130)}...`
                  : description}
              </p>
            </div>

            <div className="card__footer">
              <p className="card__price">
                <strong>${price}</strong>
              </p>
              <p className="card__rating">
                {Array(rating)
                  .fill()
                  .map((_, i) => (
                    <p>🌟</p>
                  ))}
              </p>
            </div>
            <div className="card__button">
              <button type="button">Add to cart</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Product;
