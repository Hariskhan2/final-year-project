import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Logout = ({setLoggedIn}) => {
    const navigate=useNavigate();
    useEffect(()=>{
        axios
        .get("/logout")
        .then((res) => {
             localStorage.removeItem("artsy-jwt");
          console.log(res)
          setLoggedIn(false);
          navigate("/login");
          
        })
        .catch((error) => {
          console.log(error);
        });
    })
  return (
    <div></div>
  )
}

export default Logout