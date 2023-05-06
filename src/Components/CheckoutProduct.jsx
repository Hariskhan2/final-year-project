import React from "react";
import { useStateValue } from "./../redux/StateProvider";
import "./CheckoutProduct.css";

function CheckoutProduct({ id, category, image, price, title }) {
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
        <p className="checkoutProduct__title">{title}</p>
        <p className="checkoutProduct__price">
          <strong>Rs{price}</strong>
        </p>
        
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
