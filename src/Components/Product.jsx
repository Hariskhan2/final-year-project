import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./Product.css";
import { useStateValue } from "../redux/StateProvider";

function Product() {
  const [{ basket }, dispatch] = useStateValue();

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await Axios.get("https://fakestoreapi.com/products");
      setData(response.data);
      // console.log("data", data);
    };
    fetchData();
  }, []);

  return (
    <div className="card">
      {data.slice(0, 9).map((product) => {
        {
          /* console.log("rating", product?.rating); */
        }
        const { id, image, title, price, category, description } = product;

        const rating = Math.floor(product?.rating?.rate);
        console.log("rating", rating);

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
              <button
                type="button"
                onClick={() => {
                  dispatch({
                    type: "ADD_TO_BASKET",
                    item: {
                      id: id,
                      category: category,
                      image: image,
                      price: price,
                      rating: rating,
                    },
                  });
                }}
              >
                Add to cart
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Product;
