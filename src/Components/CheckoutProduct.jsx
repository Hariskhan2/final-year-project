import React from "react";
import { useStateValue } from "./../redux/StateProvider";
import "./CheckoutProduct.css";

function CheckoutProduct({ id, category, image, price, rating }) {
  console.log("price", price);
  const [{ basket }, dispatch] = useStateValue();
  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };
  return (
    <div className="checkoutProduct">
      <img src={image} alt={category} className="checkoutProduct__image"></img>
      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{category}</p>
        <p className="checkoutProduct__price">
          <strong>${price}</strong>
        </p>
        <div className="checkoutProduct__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>🌟</p>
            ))}
        </div>
        <button
          type="submit"
          className="checkoutProduct__button"
          onClick={removeFromBasket}
        >
          Remove from basket
        </button>
      </div>
      <br />
    </div>
  );
}

export default CheckoutProduct;
