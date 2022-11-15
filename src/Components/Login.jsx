import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import Logo from "../Images/Logo_1.png";
import * as Yup from "yup";
import "./Login.css";

function Login() {
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

  const onSubmit = (values) => {
    console.log("values:", values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <div className="form">
          <div className="form-container">
            <Link to="/" className="form__logo">
              <h1>Artsy ScrapYard</h1>
            </Link>
            <div className="form-control">
              <label htmlFor="email">Email:</label>
              <br />
              <Field
                type="email"
                placeholder="Enter Your Email...."
                className="email"
                name="email"
              />
              <ErrorMessage name="email" />
              <br />
              <label htmlFor="password">Password:</label>
              <br />
              <Field
                type="password"
                placeholder="Enter Your Password...."
                className="password"
                name="password"
              />
              <ErrorMessage name="password" />
              <br />
            </div>
            <button className="submit_button" type="submit">
              Login
            </button>
            <Link to="/register" className="register_router">
              Doesn't have account ? Create One!{" "}
            </Link>
          </div>
        </div>
      </Form>
    </Formik>
  );
}

export default Login;
