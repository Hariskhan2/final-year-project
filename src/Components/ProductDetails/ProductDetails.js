import React , { useState, useEffect,useCallback } from "react";
import "./ProductDetails.css";
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  // console.log(id)
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
          <p className="product-price">${product.price}</p>
          <button className="close-button" >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
