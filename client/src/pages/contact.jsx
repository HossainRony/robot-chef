import React from 'react';
import './contact.css';
import robotChefLogo from '../image/Robot-Chef.png';

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-content">
        <div className="contact-logo">
          <img src={robotChefLogo} alt="Robot Chef Logo" />
        </div>
        <div className="contact-text">
          <h1><b>CONTACT US</b></h1>
          <p>
            We'd love to hear from you! Whether you have a question about features, pricing, need a demo, or anything else, our team is ready to answer all your questions.
          </p>
          <h4>Email Us</h4>
        <p><a href="mailto:support@robotchef.com">support@robotchef.com</a></p>
        
        <h4>Call Us</h4>
        <p><a href="tel:+12345678910">+1 234 567 8910</a></p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
