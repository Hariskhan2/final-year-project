import React from "react";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./../redux/StateProvider";
import { getBasketTotal } from "../redux/Reducer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./SubTotal.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
function SubTotal() {
  const [{ basket }, dispatch] = useStateValue();
  const [open, setOpen] = React.useState(false);

  let productId;
  if (basket.length > 0) {
    console.log(basket[0].id);
    productId = basket[0].id;
    console.log(basket.length);
  }
  const Navigate = useNavigate();

  const handleCheckout = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("artsy-jwt");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.post(
        "/orders/new",
        {
          product_id: productId,
        },
        config
      );
      console.log(response.data);
      setOpen(true);
      // do something with the response
    } catch (error) {
      console.error(error);
    }
  };
  const handleClose = () => {
    setOpen(false);
    {
      dispatch({
        type: "REMOVE_FROM_BASKET",
        id: productId,
      });
    }
    Navigate("/");
  };
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket.length} item) : <strong>{value}</strong>
            </p>
            {/* <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small> */}
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"Rs"}
      />
      <br />
      <button type="submit" onClick={handleCheckout}>
        Proceed to Checkout
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Message!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Your Order has been Placed Successfully
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default SubTotal;
