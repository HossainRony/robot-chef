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
            We'd love to hear from you! Whether you have a question about features, pricing, need a demo, or anything else, our team is ready to answer all your questions. Fill out the form below to contact us, and we'll get back to you as soon as possible. 
          </p>
          <h4>Email us:</h4>
        <p><a href="mailto:support@robotchef.com">support@robotchef.com</a></p>
        
        <h4>Call us:</h4>
        <p><a href="tel:+12345678910">+1 (234) 567-8910</a></p>
          <form className='contactForm'>
            <input name="text" className="name" placeholder='Name' />
            <input name="text" className="name" placeholder='Phone Number' />
            <input name="text" className="email" placeholder='Email' />
            <textarea className="msg" name="message" rows={5} placeholder='Message'></textarea>
            <button type="submit" className='btn btn-primary'>Submit</button>
          </form>
        </div>
      </div>
    </div>

  );
}

export default Contact;
