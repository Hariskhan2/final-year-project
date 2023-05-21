import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

import "./Regis.css";

function RegistrationForm({ setLoggedIn }) {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    email: "",
    gender: "",
    aboutMe: "",
    dobDay: "",
    dobMonth: "",
    dobYear: "",
    contactPhone: "",
    addressArea: "",
    addressCity: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!user.username) {
      newErrors.username = "Username is required";
      isValid = false;
    }

    if (!user.email) {
      newErrors.email = "Email is required";
      isValid = false;
    }

    if (!user.gender) {
      newErrors.gender = "Gender is required";
      isValid = false;
    }

    if (!user.dobDay || !user.dobMonth || !user.dobYear) {
      newErrors.dob = "Date of Birth is required";
      isValid = false;
    }

    if (!user.contactPhone) {
      newErrors.contactPhone = "Contact Phone is required";
      isValid = false;
    }

    if (!user.addressArea) {
      newErrors.addressArea = "Address Area is required";
      isValid = false;
    }

    if (!user.addressCity) {
      newErrors.addressCity = "Address City is required";
      isValid = false;
    }

    if (!user.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    const data = new FormData();
    data.append("username", user.username);
    data.append("dob", `${user.dobDay}-${user.dobMonth}-${user.dobYear}`);
    data.append("aboutMe", user.aboutMe);
    data.append("gender", user.gender);
    data.append("photo", user.photo);
    data.append("contactPhone", user.contactPhone);
    data.append("email", user.email);
    data.append("password", user.password);

    axios
      .post("/register", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        setLoggedIn(true);
        localStorage.setItem("artsy-jwt", res.data.token);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
        
      });
  };

  return (
    <>
      <div className="form_mainnn">
        <form onSubmit={handleSubmit}>
          <div>
            <h2 className="head">Register</h2>
          </div>

          <br />
          <label className="label" htmlFor="username">
            Username
            <input
              className="inputt"
              type="username"
              id="username"
              name="username"
              value={user.username}
              onChange={handleChange}
              placeholder="Username"
            />
            {errors.username && <div className="error">{errors.username}</div>}
          </label>

          <div className="">
            <label className="labell" htmlFor="gender">
              Gender{" "}
            </label>
            <select
              className="gender_select"
              name="gender"
              id="gender"
              value={user.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <div className="error">{errors.gender}</div>}
          </div>
          <div className="load"> {isLoading && <LoadingSpinner />}</div>

          <br />

          <div className="dob">
            <label className=" labell " htmlFor="dob">
              Date of Birth
            </label>
            <span>
              <input
                type="number"
                id="dob-day"
                name="dobDay"
                placeholder="Day"
                min="1"
                max="31"
                required
                value={user.dobDay}
                onChange={handleChange}
              />
              <input
                type="number"
                id="dob-month"
                name="dobMonth"
                placeholder="Month"
                min="1"
                max="12"
                required
                value={user.dobMonth}
                onChange={handleChange}
              />
              <input
                type="number"
                id="dob-year"
                name="dobYear"
                placeholder="Year"
                min="1900"
                max="2023"
                required
                value={user.dobYear}
                onChange={handleChange}
              />
            </span>
            {errors.dob && <div className="error">{errors.dob}</div>}
          </div>

          <br />

          <div className="">
            <label className="label" htmlFor="AboutMe">
              About me
              <input
                type="text"
                id="aboutMe"
                name="aboutMe"
                className="about_mee"
                value={user.aboutMe}
                onChange={handleChange}
                placeholder="About me (optional)"
              />
            </label>
          </div>

          <br />
          <hr className="hr" />
          <br />

          <div className="">
            <label className=" labell" htmlFor="name">
              Contact Information
            </label>

            <br />
            <label className=" labelll" htmlFor="contactPhone">
              Phone No.
              <input
                type="number"
                id="contactPhone"
                name="contactPhone"
                className="inputt"
                value={user.contactPhone}
                onChange={handleChange}
                placeholder="+9230--------"
              />
            </label>
            {errors.contactPhone && (
              <div className="error">{errors.contactPhone}</div>
            )}

            <br />
            <div className="dob">
              <label className=" labell " htmlFor="dob">
                Address
              </label>
              <br />
              <span>
                <label className=" labell " htmlFor="area">
                  Area
                </label>
                <input
                  type="text"
                  id="addressArea"
                  name="addressArea"
                  placeholder="Location Area"
                  required
                  value={user.addressArea}
                  onChange={handleChange}
                />
              </span>
              {errors.addressArea && (
                <div className="error">{errors.addressArea}</div>
              )}

              <br />
              <span>
                <label className=" labell " htmlFor="city">
                  City
                </label>
                <input
                  type="text"
                  id="addressCity"
                  name="addressCity"
                  placeholder="City"
                  required
                  value={user.addressCity}
                  onChange={handleChange}
                />
              </span>
              {errors.addressCity && (
                <div className="error">{errors.addressCity}</div>
              )}
            </div>

            <br />
            <div className="contactt">
              <label className="label" htmlFor="email">
                Email
                <input
                  className="inputt"
                  type="email"
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
                {errors.email && <div className="error">{errors.email}</div>}
              </label>
              
              <br />
              <p>We won't reveal your email to anyone else </p>
            </div>
          </div>

          <br />

          <label className="label" htmlFor="password">
            Password
            <br />
            <input
              className="inputt"
              type="password"
              name="password"
              id="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Password"
            />
          </label>
          {errors.password && <div className="error">{errors.password}</div>}
          <br />
          <hr className="hrr" />

          <br />
          <button className="btttn-login" type="submit">
             Register
          </button>
          <br /> <br />
          <div className="login_link">
            Already have an account?
            <Link to={"/login"} className="span_login">
              Log in
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default RegistrationForm;
