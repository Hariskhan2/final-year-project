import React from "react";
import "../../src/Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./../redux/StateProvider";
import { getBasketTotal } from "../redux/Reducer";

function SubTotal() {
  const [{ basket }, dispatch] = useStateValue();
  console.log(basket.length);
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket.length} item) <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
      <br />
      <button type="submit">Proceed to Checkout</button>
    </div>
  );
}

export default SubTotal;
