import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import robotChefLogo from '../image/Robot-Chef.png';
import breakfastImg from '../image/breakfast.png';
import cookiesImg from '../image/cookies.png';
import pastaImg from '../image/pasta.png';
import saladImg from '../image/salad.png';
import steakImg from '../image/steak.png';

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
          <div className="home-buttons">
            <Link to="/register" className="btn btn-primary">Register</Link>
            <Link to="/login" className="btn btn-primary">Log In</Link>
          </div>
        </div>
      </div>
      <div className="featured-recipes">
        <h1><b>FEATURED RECIPES</b></h1>
        <div className="recipe-grid">
          <div className="recipe-card">
            <Link to="/recipe-details/breakfast">
              <img src={breakfastImg} alt="Breakfast" />
              <p>Breakfast</p>
            </Link>
          </div>
          <div className="recipe-card">
            <Link to="/recipe-details/cookies">
              <img src={cookiesImg} alt="Cookies" />
              <p>Cookies</p>
            </Link>
          </div>
          <div className="recipe-card">
            <Link to="/recipe-details/pasta">
              <img src={pastaImg} alt="Pasta" />
              <p>Pasta</p>
            </Link>
          </div>
          <div className="recipe-card">
            <Link to="/recipe-details/salad">
              <img src={saladImg} alt="Salad" />
              <p>Salad</p>
            </Link>
          </div>
          <div className="recipe-card">
            <Link to="/recipe-details/steak">
              <img src={steakImg} alt="Steak" />
              <p>Steak</p>
            </Link>
          </div>
        </div>



        
         
      </div>
    </div>
  );
}

export default Home;
