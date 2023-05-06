import React , { useState, useEffect,useCallback } from "react";
import "./ProductDetails.css";
import { useStateValue } from "../../redux/StateProvider";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const [{ basket }, dispatch] = useStateValue();
  const { id } = useParams();
  // console.log(id)
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  const fetchProductDetails = useCallback(async () => {
    try {
      const response = await axios.get(`/products/${id}`);
      setProduct(response.data.product);
      console.log(response)
    } catch (error) {
      console.error(error);
    }
  }, [id]);
  
  useEffect(() => {
    console.log('fetching product details');
    fetchProductDetails();
  }, [fetchProductDetails]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-details-container">
      <div className="product-details">
        <div className="product-image">
          <img src={product.photo.url[0]} alt={product.title} />
        </div>
        <div className="product-info">
          <h2 className="product-title">{product.title}</h2>
          <p className="product-description">{product.description}</p>
          <p className="product-price">Rs{product.price}</p>
          <button className="close-button" onClick={() => {
                        dispatch({
                          type: "ADD_TO_BASKET",
                          item: {
                            title:product.title,
                            id: product._id,
                    
                            image: product.photo.url[0],
                            price: product.price,
                          },
                          
                        });
                        navigate("/checkout")
                      }}>
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
