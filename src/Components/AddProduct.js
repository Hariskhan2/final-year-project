import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddProduct.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "./LoadingSpinner/LoadingSpinner";


const AddProductForm = () => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    quantity: "",
    tags: "",
    isScrap: false,
    weight: "",
    photo: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  const Navigate = useNavigate();
  const handleisScrapChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setProduct({
      ...product,
      [name]: value,
    });
  };
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    price: "",
    quantity: "",
    tags: "",
    weight: "",
    photo: "",
  });
  
  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      title: "",
      description: "",
      price: "",
      quantity: "",
      tags: "",
      weight: "",
      photo: "",
    };
  
    // Perform validation for each field
    if (!product.title) {
      newErrors.title = "Title is required";
      isValid = false;
    }
  
    if (!product.description) {
      newErrors.description = "Description is required";
      isValid = false;
    }
  
    if (!product.price) {
      newErrors.price = "Price is required";
      isValid = false;
    }
  
    if (!product.quantity) {
      newErrors.quantity = "Quantity is required";
      isValid = false;
    }
  
    if (!product.tags) {
      newErrors.tags = "Tags are required";
      isValid = false;
    }
  
    if (!product.weight) {
      newErrors.weight = "Weight is required";
      isValid = false;
    }
  
    if (product.photo.length === 0) {
      newErrors.photo = "At least one photo is required";
      isValid = false;
    }
  
    setErrors(newErrors);
    return isValid;
  };
  
  const handleChange = (e) => {
    if (e.target.name === "photo") {
      setProduct({
        ...product,
        photo: [...product.photo, e.target.files[0]],
      });
    } else {
      setProduct({
        ...product,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    const token = localStorage.getItem("artsy-jwt");
    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("quantity", product.quantity);
    formData.append("weight", product.weight);
    formData.append("tags", product.tags);
    formData.append("isScrap", product.isScrap);
    for (let i = 0; i < product.photo.length; i++) {
      formData.append("photo", product.photo[i]);
    }
    axios
      .post("/products/new", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        Navigate("/");
        toast.success("PRODUCT ADDED!", {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
        // setIsBlurred(false);
      });
  };
  // send formData to backend

  const handleRemoveImage = (index) => {
    const updatedImages = [...product.photo];
    updatedImages.splice(index, 1);
    setProduct({
      ...product,
      photo: updatedImages,
    });
  };

  return (
    <>
      <div className="form_main">
        <form>
          <div>
            <h2 className="head">Sell Your Product</h2>
          </div>
          <span className="tips">
            <h4>Tips for getting a fast selling:</h4>
            <ul>
              <li>
                <p>Take a Good Pictures of your scrap</p>
              </li>
              <li>
                <p>Provide quantity or weight estimate</p>
              </li>
              <li>
                <p>
                  Describe condition of Scrap (mixed bottles,all one type of
                  bottles etc)
                </p>
              </li>
              <li>
                <p>Include address where scrap is located</p>
              </li>
            </ul>
          </span>
          <label className="label">
            Name
            <br />
            <input
              className="input"
              type="text"
              name="title"
              value={product.title}
              onChange={handleChange}
            />
            {errors.title && <div className="error">{errors.title}</div>}
          </label>
          <br />
          <br />
          <div className="load"> {isLoading && <LoadingSpinner />}</div>

          <label className="label">
            Description
            <br />
            <textarea
              className="des_area"
              name="description"
              value={product.description}
              onChange={handleChange}
            />
            {errors.description && <div className="error">{errors.description}</div>}
          </label>

          <br />
          <br />
          <label className="label">
            Tags
            <br />
            <textarea
              className="input"
              name="tags"
              value={product.tags}
              onChange={handleChange}
            />
            {errors.tags && <div className="error">{errors.tags}</div>}
          </label>
          <br />
          <label className="label">
            Quantity:
            <input
              className="input"
              type="number"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
            />
            {errors.quantity && <div className="error">{errors.quantity}</div>}
          </label>
          <br />
          <label className="label_check">
            <input
              className="input"
              type="checkbox"
              name="isScrap"
              value={product.isScrap}
              onChange={handleisScrapChange}
            />
            It is a Scrap
            
          </label>

          <br />
          <label className="label">
            Estimated Weight:
            <input
              className="input"
              type="text"
              name="weight"
              value={product.weight}
              onChange={handleChange}
            />
            {errors.weight && <div className="error">{errors.weight}</div>}
          </label>
          <br />
          <label className="label">
            Price:
            <input
              className="input"
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
            />
            {errors.price && <div className="error">{errors.price}</div>}
          </label>
          <br />
          <hr className="hrr" />

          <label className="label">
            Images:
            <br /> <br />
            {product.photo.map((image, index) => {
              if (image instanceof Blob || image instanceof File) {
                return (
                  <div key={index} className="image-box">
                    <img src={URL.createObjectURL(image)} alt="" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                    >
                      X
                    </button>
                  </div>
                );
              } else {
                return null;
              }
            })}
            {product.photo.length < 5 && (
              <div className="image-box">
                <label htmlFor="image-upload">
                  <span>+</span>
                  <input
                    className="input"
                    id="image-upload"
                    type="file"
                    name="photo"
                    onChange={handleChange}
                    style={{ display: "none" }}
                  />
                </label>
              </div>
            )}
            {errors.photo && <div className="error">{errors.photo}</div>}
          </label>

          <br />
          <button type="submit" className="btttn-login" onClick={handleSubmit}>
            Add Product
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default AddProductForm;
