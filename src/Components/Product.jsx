import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./Product.css";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../redux/StateProvider";
import { Link } from "react-router-dom";

function Product() {
  const [{ basket }, dispatch] = useStateValue();
  // const [select, setSelect] = useState();
  
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const handlesubmit=()=>{
    
  }
  useEffect(() => {

    const fetchData = async () => {
      const response = await Axios.get("/products", {
        headers: {
          //to get and authorize with token we will use inheader a authoriztion (mandatory)

          //also to post json file i have to use content type (mandatory)
          "Content-Type": "multipart/form-data",
        },
      });
      const allProductsArray = response.data.allProducts;
      // console.log(response.data)
      if (allProductsArray) {
        setProducts(allProductsArray);
      }
      // console.log(a)
      else if (
        response.data.hasOwnProperty("Note") &&
        response.data.Note === "No Products to show"
      ) {
        setProducts([]);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="product_catalog">
      {products.length === 0 ? (
        <p>NO PRODUCTS TO SHOW</p>
      ) : (
        <>
          <h1 className="product__title">Product Catalog</h1>
          <div className="cards_body" >
            <span className="card">
            {products.slice(0, 6).map((product, key) => {
              // console.log(product);
              const { _id, photo, title, price, description } = product;

              // console.log(_id)
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
            </span>
            <span >
            <Link to={"/allproducts"}><button className="btn-products">All Products</button></Link></span>
          </div>
          
        </>
      )}
    </div>
  );
}

export default Product;
