import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

const LoginForm = ({ setLoggedIn }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user, //spread operator
      [name]: value,
    });
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

    axios
      .post("/login", user)
      .then((res) => {
        console.log(res.data);
        setUser(res.data.user);
        toast.success("LOGIN SUCCESSFULL !", {
          position: toast.POSITION.TOP_CENTER,
        });
        localStorage.setItem("artsy-jwt", res.data.token);
        setLoggedIn(true);
        navigate("/");
      })
      .catch((error) => {
        toast.error("LOGIN SUCCESSFULL !", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  // const logoutUser=()=>{
  //   axios
  //   .delete("/logout")
  //   .then((res) => {
  //     localStorage.removeItem("artsy-jwt");
  //     navigate("/login");
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  // }

  return (
    <>
      <div className="form_mainn">
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
          </label>
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
          </label>
          <br />
          <hr className="hrr" />

          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};
export default LoginForm;
