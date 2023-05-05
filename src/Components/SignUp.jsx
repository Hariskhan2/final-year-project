import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link ,useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import "./Login.css";

function Register() {
  const Navigate=useNavigate()
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required Field!"),
    email: Yup.string().email().required("Required Field"),
    password: Yup.string().required("Required Field!"),
  });
  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const postData = async() => {
    // store the states in the form data
    // 
    window.alert("hello register")
  }

  // // const onSubmit = async(e) => {
  //   e.preventDefault()
  //   const {name,email, password}=user
  //   const res=await axios({
  //     method: "POST",
  //     url: "http://localhost:5001/api/register",
  //     data:JSON.stringify({name,email,password})
  //   })
  //     .then(res => {
  //       console.log(res)
  //     })
  //     .catch(error => {
  //       console.log(error)
  //     });
  // };

  const onSubmit = async (e) => {
    e.preventDefault();
    const userData={ name:user.name, email:user.email, password:user.password } ;
    const response = await axios
      .post("/api/register", {userData})
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log("server responded");
        } else if (error.request) {
          console.log("network error");
        } else {
          console.log(error);
        }
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <div className="form">
          <div className="form-container register__container">
            <Link to="/" className="form__logo">
              <h1>Artsy ScrapYard</h1>
            </Link>
            <div className="form-control">
              <label htmlFor="name">Name:</label>
              <br />
              <Field
                type="text"
                placeholder="Enter Your Name...."
                className="name"
                id="name"
                name="name"
                value={user.name}
                onChange={handleChange}
              />
              <ErrorMessage name="name" />
              <br />
              <label htmlFor="email">Email:</label>
              <br />
              <Field
                type="email"
                placeholder="Enter Your Email...."
                id="email"
                className="email"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
              <ErrorMessage name="email" />
              <br />
              <label htmlFor="password">Password:</label>
              <br />
              <Field
                type="password"
                placeholder="Enter Your Password...."
                id="password"
                className="password"
                name="password"
                value={user.password}
                onChange={handleChange}
              />
              <ErrorMessage name="password" />
              <br />
            </div>
            <button className="submit_button" type="submit">
              Register
            </button>
            <Link to="/login" className="register_router">
              Already have account ? Login Now!
            </Link>
          </div>
        </div>
      </Form>
    </Formik>
  );
}

export default Register;
