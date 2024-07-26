import React from 'react';
import './home.css';
import robotChefLogo from '../image/Robot-Chef.png';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <div className="home-logo">
          <img src={robotChefLogo} alt="Robot Chef Logo" />
        </div>
        <div className="home-text">
          <h1><b>Welcome to ROBOT CHEF</b></h1>
          <h4><b>Your AI Kitchen Companion</b></h4>
          <p>
            Discover a world of culinary delights with Robot Chef. Our app offers personalized recipe recommendations, ingredient management, meal planning, and interactive cooking guides. Find recipes based on your preferences and available ingredients, track your pantry, and plan meals effortlessly.
          </p>
        </div>
      </div>
      <div className="featured-recipes">
        <h2>FEATURED RECIPES</h2>
        
         
      </div>
    </div>
  );
}

export default Home;
