import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditForm.css";
let Buffer = require("buffer/").Buffer;

const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    dobDay: "",
    dobMonth: "",
    dobYear: "",
    gender: "",
    aboutMe:"",
    email:"",
    contactPhone:"",
    photo: null,
  });
  const [uimage, setUimage] = useState({
    uimage: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("artsy-jwt");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    // Retrieve the user data from the server
    axios.get("/user/info", config).then((res) => {
      const user = res.data.user;
      console.log(res);
      // setPersonEmail(user.email);
      console.log(user.dob);
if(res.data.profilePic.Body){
  const buff = res.data.profilePic.Body.data;
  const buffer = Buffer.from(buff);
  // const base64String = btoa(String.fromCharCode(...new Uint8Array(buffer)));
  const base64String = buffer.toString("base64");
  // console.log(base64String)
  setUimage(base64String);
}
      
      const dobDay=Number(new Date(user.dob).getDate())
      const dobMonth=new Date(user.dob).getMonth() + 1
      const dobYear=new Date(user.dob).getFullYear()
      // console.log(user.contactPhone)
      console.log(typeof(dobDay))
      console.log(typeof (dobMonth))
      console.log(dobYear)
      setFormData({
        name: user.name,
        dobDay: Number(new Date(user.dob).getDate()),
        dobMonth: Number(new Date(user.dob).getMonth() + 1),
        dobYear:Number( new Date(user.dob).getFullYear()),
        gender: user.gender,
        aboutMe:user.aboutMe,
        email:user.email,
        contactPhone:user.contactPhone,
        photo: null,
      });
      
    });
  }, []);

  const handleNameChange = (e) => {
    setFormData({
      ...formData,
      name: e.target.value,
    });
  };
const handleGenderChange=(e)=>{
  setFormData({
    ...formData,
    gender: e.target.value,
  });
}
// const handleEmailChange=(e)=>{
//   setFormData({
//     ...formData,
//     email: e.target.value,
//   });
// }
const handleContactPhoneChange=(e)=>{
  setFormData({
    ...formData,
    contactPhone: e.target.value,
  });
}
  const handleDayChange = (e) => {
    setFormData({
      ...formData,
      dobDay: e.target.value,
    });
  };

  const handleMonthChange = (e) => {
    setFormData({
      ...formData,
      dobMonth: e.target.value,
    });
  };

  const handleYearChange = (e) => {
    setFormData({
      ...formData,
      dobYear: e.target.value,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      photo: e.target.files[0],
    });
  };
  const handleAboutMeChange= (e) => {
    setFormData({
      ...formData,
      aboutMe: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("artsy-jwt");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };
    const data = new FormData();
    data.append("name", formData.name);
    data.append(
      "dob",
      `${formData.dobDay}-${formData.dobMonth}-${formData.dobYear}`
    );
    data.append("aboutMe", formData.aboutMe);
    data.append("gender", formData.gender);
    data.append("photo", formData.photo);
    data.append("contactPhone",formData.contactPhone)
    axios.put("/user/edit", data, config).then((res) => {
      console.log(res.data);
      setFormData({
        ...formData,
        photo: null,
      });
    });
  };

  return (
    <div className="All-form">
      <h2 className="form-head">EDIT PROFILE</h2>
      <hr />
      <div className="form-main">
        <div className="form-m">
          <div className="">
            <label className="labell" htmlFor="photo">
              Profile Image
            </label>
            <img
              className="profile_image"
              src={`data:image/png;base64,${uimage}`}
              alt=""
            />
            <input
              className=""
              type="file"
              name="photo"
              id="photo"
              onChange={handleImageChange}
            />
          </div>
          <br />
          <hr className='hr'/>
          <br />
          <div className="">
            <label className=" labell" htmlFor="name">
              Name
            </label>

            <input
              type="text"
              id="name"
              name="name"
              className=""
              value={formData.name}
              onChange={handleNameChange}
              placeholder="Name"
            />
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
                value={formData.dobDay}
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
                value={formData.dobMonth}
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
                value={formData.dobYear}
                onChange={handleYearChange}
              />
            </span>
          </div>
          <br />
          <div className="">
            <label className="labell" htmlFor="gender">
              Gender{" "}
            </label>
            <select
              className="gender_select"
              name="gender"
              id="gender"
              value={formData.gender}
              onChange={handleGenderChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <br />
          <div className="">
            

            <input
              type="text"
              id="aboutMe"
              name="aboutMe"
              className="about_me"
              value={formData.aboutMe}
              onChange={handleAboutMeChange}
              placeholder="About me (optional)"
            />
          </div>
          <br/>
          <hr className='hr'/>
<br/>
<div className="">
            <label className=" labell" htmlFor="name">
              Contact Information
            </label>

            <input
              type="text"
              id="contactPhone"
              name="contactPhone"
              className="number"
              value={formData.contactPhone}
              onChange={handleContactPhoneChange}
              placeholder=""
            />
            <br />
            <div className="contactt">
            <input
              type="text"
              id="email"
              name="email"
              className=""
              value={formData.email}
              // onChange={handleEmailChange}
              placeholder="Email"
            />
            <p>We won't reveal your email to anyone else </p></div>
          </div>
          <br />

          <div className="edit_footer">
            <button onClick={handleSubmit} type="submit" className="btttn-login">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
