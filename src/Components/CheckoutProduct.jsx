import React from "react";
import "../../src/CheckoutProduct.css";
import { useStateValue } from "./../redux/StateProvider";
function CheckoutProduct({ id, category, image, price, rating }) {
  const [{ basket }, dispatch] = useStateValue();
  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };
  return (
    <div className="checkoutProduct">
      <img src={image} alt={title} className="checkoutProduct__image"></img>
      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>
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
