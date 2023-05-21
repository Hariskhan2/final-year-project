import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const LoginForm = ({ setLoggedIn }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    if (!user.email) {
      newErrors.email = "*Email is required";
      isValid = false;
    }

    if (!user.password) {
      newErrors.password = "*Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleEmailChange = (e) => {
    setUser({
      ...user,
      email: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setUser({
      ...user,
      password: e.target.value,
    });
  };

  const loginUser = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setIsBlurred(true);

    axios
      .post("/login", user)
      .then((res) => {
        console.log(res.data);
        setUser(res.data.user);
        toast.success("LOGIN SUCCESSFUL!", {
          position: toast.POSITION.TOP_CENTER,
        });
        localStorage.setItem("artsy-jwt", res.data.token);
        setLoggedIn(true);
        navigate("/");
      })
      .catch((error) => {
        toast.error("LOGIN FAILED!", {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .finally(() => {
        setIsLoading(false);
        setIsBlurred(false);
      });
  };

  return (
    <>
      <div className={`form_mainn ${isBlurred ? "blur" : ""}`}>
        <form onSubmit={loginUser}>
          <div>
            <h2 className="head">Login</h2>
          </div>

          <br />
          <label className="label" htmlFor="email">
            Email
            <input
              className="input"
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleEmailChange}
              placeholder="Email"
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </label>
          <div className="load"> {isLoading && <LoadingSpinner />}</div>
          <br />
          <label className="label" htmlFor="password">
            Password
            <br />
            <input
              className="input"
              type="password"
              name="password"
              id="password"
              value={user.password}
              onChange={handlePasswordChange}
              placeholder="Password"
            />
            {errors.password && <div className="error">{errors.password}</div>}
          </label>
          <br />
          <hr className="hrr" />

          <br />
          <button  className="btttn-login"type="submit" onClick={() => setIsBlurred(true)}>
           Login
          </button>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
