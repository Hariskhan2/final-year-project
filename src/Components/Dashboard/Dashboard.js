import React from 'react'
import './Dashboard.css';
import { Route } from 'react-router-dom';
import { BrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Header from "../Header/Header";


const Dashboard = () => {
  return (
    <div className="App">
      
        {/* <Header /> */}
        {/* <Footer /> */}
        
        {/* <Payment /> */}
      

      <div className="main">
        <div className="AppGlass">
          <Layout />
        </div>
      </div>
    </div>
  )
}

export default Dashboard