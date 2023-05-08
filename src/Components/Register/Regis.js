import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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
    addressArea:"",
    addressCity:"",
    // photo: null,
    password: "",
  });
  const handleUsernameChange = (e) => {
    setUser({
      ...user,
      username: e.target.value,
    });
  };
  const handleDayChange = (e) => {
    setUser({
      ...user,
      dobDay: e.target.value,
    });
  };

  const handleMonthChange = (e) => {
    setUser({
      ...user,
      dobMonth: e.target.value,
    });
  };

  const handleYearChange = (e) => {
    setUser({
      ...user,
      dobYear: e.target.value,
    });
  };
  const handleGenderChange = (e) => {
    setUser({
      ...user,
      gender: e.target.value,
    });
  };
  const handleAreaChange = (e) => {
    setUser({
      ...user,
      addressArea: e.target.value,
    });
  };
  const handleCityChange = (e) => {
    setUser({
      ...user,
      addressCity: e.target.value,
    });
  };
  const handleAboutMeChange = (e) => {
    setUser({
      ...user,
      aboutMe: e.target.value,
    });
  };
  const handlePasswordChange = (e) => {
    setUser({
      ...user,
      password: e.target.value,
    });
  };
  const handleEmailChange = (e) => {
    setUser({
      ...user,
      email: e.target.value,
    });
  };
  const handleContactPhoneChange = (e) => {
    setUser({
      ...user,
      contactPhone: e.target.value,
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user, //spread operator
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
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
        console.log(res.data.token);
        setLoggedIn(true);
        localStorage.setItem("artsy-jwt", res.data.token);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   //const { username, email, password } = user;
  //   try{
  //   const res = await fetch("/register", {
  //     method: 'POST',
  //     headers:{'Content-Type':'application/json'},
  //     body: JSON.stringify({
  //       username:user.username,
  //       email:user.email,
  //       password:user.password,
  //     }),

  //   });
  // if(!res.ok){
  //   return console.log("Invalid Registeration")
  // }
  // const data=await res.json()
  //   // ideally we also want a way to confirm their email or identity
  //   setUser({
  //     username:'',
  //     email: '',
  //     password: '',
  //     })
  //    navigate('/')
  // }catch (error){
  //   return console.log("Invalid Registeration")
  // }
  // };
  // if (res.status == 200) {
  //   window.alert("Registeration Successfull");
  //   console.log("Successfull Registeration");
  //   navigate("/login");
  // } else {
  //   window.alert("Invalid Registeration");
  //   console.log("Invalid Registeration");
  // }
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
              onChange={handleUsernameChange}
              placeholder="Username"
            />
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
              onChange={handleGenderChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <br />

          <div className="dob">
            <label className=" labell " htmlFor="dob">
              Date of Birth
            </label>
            <span>
              <input
                type="number"
                id="dob-day"
                name="dob-day"
                placeholder="Day"
                min="1"
                max="31"
                required
                value={user.dobDay}
                onChange={handleDayChange}
              />
              <input
                type="number"
                id="dob-month"
                name="dob-month"
                placeholder="Month"
                min="1"
                max="12"
                required
                value={user.dobMonth}
                onChange={handleMonthChange}
              />
              <input
                type="number"
                id="dob-year"
                name="dob-year"
                placeholder="Year"
                min="1900"
                max="2023"
                required
                value={user.dobYear}
                onChange={handleYearChange}
              />
            </span>
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
                onChange={handleAboutMeChange}
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
                onChange={handleContactPhoneChange}
                placeholder="+9230--------"
              />
            </label>
            <br />
            <div className="dob">
            <label className=" labell " htmlFor="dob">
              Address
            </label>
            <br/>
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
                onChange={handleAreaChange}
              />
              </span>
              <br/>
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
                onChange={handleCityChange}
              />
              
            </span>
          </div>
          <br />
            <div className="contact">
              <label className="label" htmlFor="email">
                Email
                <input
                  className="inputt"
                  type="email"
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={handleEmailChange}
                  placeholder="Email"
                />
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
              onChange={handlePasswordChange}
              placeholder="Password"
            />
          </label>
          <br />
          <hr className="hrr" />

          <br />
          <button type="submit">Register</button>
          <br/> <br/>
         <div className="login_link"> Already have an account?<Link to={"/login"} className='span_login'>Log in</Link></div>
        </form>
        
      </div>
    </>
  );
}
export default RegistrationForm;
