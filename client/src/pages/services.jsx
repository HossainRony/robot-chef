import React from 'react';
import { Link } from 'react-router-dom';
import './services.css';
import robotChefLogo from '../image/Robot-Chef.png';

const Services = () => {
  return (
    <div className="services-container">
      <div className="services-content">
        <div className="services-logo">
          <img src={robotChefLogo} alt="Robot Chef Logo" />
        </div>
        <div className="services-text">
          <h1><b>Our Services</b></h1>
          <p>
            Robot Chef offers a variety of services to make your cooking experience seamless and enjoyable. Here’s what we provide:
          </p>
          <div className="services-buttons">
            <Link to="/register" className="btn">Register</Link>
            <Link to="/login" className="btn">Log In</Link>
          </div>
        </div>
      </div>
      <div className="services-list">
        <div className="service-item">
          <h2><b>Personalized Recipes</b></h2>
          <p>
            Get personalized recipe recommendations based on your preferences and available ingredients. Robot Chef uses AI to suggest recipes that fit your taste and dietary needs.
          </p>
        </div>
        <div className="service-item">
          <h2><b>Meal Planning</b></h2>
          <p>
            Plan your meals for the week with ease. Robot Chef helps you organize your meals and generate shopping lists, so you always have the ingredients you need.
          </p>
        </div>
        <div className="service-item">
          <h2><b>Ingredient Management</b></h2>
          <p>
            Keep track of your pantry with our ingredient management system. Know exactly what you have at home and avoid food waste by using up ingredients before they expire.
          </p>
        </div>
        <div className="service-item">
          <h2><b>Interactive Cooking Guides</b></h2>
          <p>
            Follow along with step-by-step cooking guides. Robot Chef provides detailed instructions and tips to help you cook like a pro.
          </p>
        </div>
        <div className="service-item">
          <h2><b>Smart Kitchen Integration</b></h2>
          <p>
            Integrate with smart kitchen devices for a seamless cooking experience. Robot Chef can sync with your smart appliances to make cooking more efficient and fun.
          </p>
        </div>
        <div className="service-item">
          <h2><b>Grocery Delivery</b></h2>
          <p>
            Order groceries directly through Robot Chef. Our app connects with grocery delivery services to make sure you have all the ingredients you need, delivered right to your door.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Services;
