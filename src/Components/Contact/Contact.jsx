import React from "react";
import whatsapp from "../../Images/whatsapp.png";
import email from "../../Images/gmail.png";
import "./Contact.css";

function Contact() {
  return (
    <div className="contactSection">
      <h2>Contact Us</h2>
      <div className="contactDetails">
        <div className="contact phoneContact">
          <img src={whatsapp} alt="Icon"></img>
          <h3>By phone</h3>
          <p>
            Just call us and tell about your questions or concerns and we will
            give you the help you need.
          </p>
          <br />
          <p className="contactSource">0311-1111111</p>
        </div>

        <div className="contact phoneContact">
          <img src={email} alt="Icon"></img>
          <h3>By Email</h3>
          <p>
            Just send us your questions or concerns and we will give you the
            help you need.
          </p>
          <br />
          <p className="contactSource">artsy-scrapyard@gmail.com</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
