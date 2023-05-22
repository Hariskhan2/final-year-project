import React, { useState, useEffect, useCallback } from "react";
import "./ProductDetails.css";
import { useStateValue } from "../../redux/StateProvider";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { UilWhatsapp } from '@iconscout/react-unicons'
import axios from "axios";
import { useParams } from "react-router-dom";
let Buffer = require("buffer/").Buffer;
const ProductDetails = () => {
  const [{ basket }, dispatch] = useStateValue();
  const { id } = useParams();
  const [uimage, setUimage] = useState({
    uimage: null,
  });
  // console.log(id)
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [owner_id, setOwner_id] = useState("");
  const [number, setNumber] = useState("Show Number");
  const [owner, setOwner] = useState(null);
  const fetchProductDetails = useCallback(async () => {
    try {
      const response = await axios.get(`/products/${id}`);
      setProduct(response.data.product);
      // setOwner_id(response.data.product.owner_id)
      // console.log(response.data.product.owner_id)
      console.log(response.data.product);
      setOwner(response.data.user);
      if (response.data.user.profilePic.Body.data) {
        const buff = response.data.user.profilePic.Body.data;
        const buffer = Buffer.from(buff);
        // const base64String = btoa(String.fromCharCode(...new Uint8Array(buffer)));
        const base64String = buffer.toString("base64");
        // console.log(base64String)
        setUimage(base64String);
      }
    } catch (error) {
      console.error(error);
    }
  }, [id]);
  // const fetchOwnerDetails = useCallback(async () => {
  //   try {
  //     const response = await axios.get(`/user/owner-info/${owner_id}`);
  //     setOwner(response.data);
  //     console.log(response.data)
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, []);
  useEffect(() => {
    console.log("fetching product details");
    // fetchOwnerDetails();
    fetchProductDetails();
  }, [fetchProductDetails]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleClick = () => {
    setNumber(`${owner.contactPhone}`);
  };
  return (
    <>
      <div className="product-details-container">
        <div className="productt-details">
          <h2>PRODUCT DETAILS</h2>
          <br />
          <hr />
          <div className="product-details">
            <div className="productt-card">
            <div className="productt-image">
              <div className="product-image">
                <img src={product.photo.url[0]} alt={product.title} />
              </div>
</div>
              <div className="product-info">
                <h2 className="product-title">{product.title}</h2>
                <p className="product-description">{product.description}</p>
                <p className="product-price">Rs{product.price}</p>
                <button
                  className="close-button"
                  onClick={() => {
                    dispatch({
                      type: "ADD_TO_BASKET",
                      item: {
                        title: product.title,
                        id: product._id,
                        // owner_id:product.owner_id,
                        image: product.photo.url[0],
                        price: product.price,
                      },
                    });
                    navigate("/checkout");
                  }}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
            <div className="owner-card">
              <h3 className="owner-det">Owner Detail </h3>
              <span className="owner_info">
                <img
                  className="profile-image"
                  src={`data:image/png;base64,${uimage}`}
                  alt=""
                />
                <h5>{owner.username}</h5>
              </span>
              <button blank className="number-show" onClick={handleClick}>
                <FontAwesomeIcon className="no-icon" icon={faPhone} size="l" />
                <h5>{number} </h5>{" "}
              </button>
              <button className="what-show">
              
                {" "}
                <a
                  href={`https://wa.me/${owner.contactPhone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                <UilWhatsapp />
                  WHATSAPP
                </a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
