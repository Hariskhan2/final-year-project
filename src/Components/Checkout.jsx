import React from "react";
import { useStateValue } from "./../redux/StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import "./Checkout.css";
import SubTotal from "./SubTotal";
import "./SubTotal.css";

function Checkout() {
  const [{ basket }, dispatch] = useStateValue();
  return (
    <div className="checkout">
      <div className="checkout__left">
        <div>
          <h1 className="checkout__title">Your Shopping Basket</h1>
          {basket.map((item) => (
            <CheckoutProduct
              id={item.id}
              category={item.category}
              price={item.price}
              rating={item.rating}
              image={item.image}
            />
          ))}
        </div>
      </div>

      <div className="checkout__right">
        <SubTotal />
      </div>
    </div>
  );
}

export default Checkout;
