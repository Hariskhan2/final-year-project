import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./AllProducts.css";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../../redux/StateProvider";
import { Link } from "react-router-dom";

function AllProducts() {
  const [{ basket }, dispatch] = useStateValue();
  const [select, setSelect] = useState(true);
  
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [isScrap, setIsScrap] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await Axios.get("/products", {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const allProductsArray = response.data.allProducts;
      if (allProductsArray) {
        setProducts(allProductsArray);
      } else if (
        response.data.hasOwnProperty("Note") &&
        response.data.Note === "No Products to show"
      ) {
        setProducts([]);
      }
    };
    fetchData();
  }, []);

  const handleScrapClick = () => {
    setIsScrap(true);
  };

  const handleNonScrapClick = () => {
    setIsScrap(false);
  };

  const filteredProducts = products.filter(product => {
    return product.isScrap === isScrap;
  });

  return (
    <div className="product_catalogg">
        <h1 className="product__title">PRODUCT CATALOG</h1>
      <div className="differ-button" >
        <button onClick={handleScrapClick}> Scrap Products</button>
        <button onClick={handleNonScrapClick}>Art Products</button>
      </div>
      {filteredProducts.length === 0 ? (
        <p>NO PRODUCTS TO SHOW</p>
      ) : (
        <>
          
          <div className="card">
            {filteredProducts.map((product, key) => {
              const { _id, photo, title, price, description } = product;
              return (
                <div className="card__Container" key={_id}>
                  <Link to={`/products/${_id}`} key={_id}   >
                    <div className="card__header">
                      <img
                        src={photo.url[0]}
                        alt={title}
                        className="product_image"
                      ></img>
                    </div>
                  </Link>
                  <div className="card__body">
                    <h3>{title}</h3>
                    <p className="card__description">
                      {" "}
                      {description.length > 130
                        ? `${description.substring(0, 130)}...`
                        : description}
                    </p>
                  </div>
                  <div className="card__footer">
                    <p className="card__price">
                      <strong>Rs{price}</strong>
                    </p>
                  </div>
                  <div className="card__button">
                    <button
                      type="button"
                      onClick={() => {
                        dispatch({
                          type: "ADD_TO_BASKET",
                          item: {
                            id: _id,
                            title:title,
                            image: photo.url[0],
                            price: price,
                          },
                        });
                        navigate("/checkout")
                      }}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default AllProducts;
