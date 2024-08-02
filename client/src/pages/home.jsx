import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './home.css';
import robotChefLogo from '../image/Robot-Chef.png';
import steakImage from '../image/steak.png';
import breakfastImage from '../image/breakfast.png';
import saladImage from '../image/salad.png';
import cookiesImage from '../image/cookies.png';
import pastaImage from '../image/pasta.png';
 
const images = [steakImage, breakfastImage, saladImage, cookiesImage, pastaImage];
 
const Home = () => {
  const navigate = useNavigate();
  const recipes = useSelector((state) => state.recipes.recipes);
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
 
  useEffect(() => {
    if (recipes && recipes.length > 0) {
      const recipesWithImages = recipes.map((recipe, index) => ({
        ...recipe,
        image: images[index % images.length]
      }));
      setFeaturedRecipes(recipesWithImages);
    } else {
      setFeaturedRecipes([]);
    }
  }, [recipes]);
 
  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };
 
  const handleCloseModal = () => {
    setSelectedRecipe(null);
  };
 
  const displayIngredient = (ing) => {
    // Check if the ingredient object contains valid ingredient data
    if (ing.ingredient && typeof ing.ingredient === 'string' && !ing.ingredient.includes(' ')) {
      // If the ingredient is just an ID or token, don't display it
      return null;
    }
    return `${ing.ingredient.name || ing.ingredient}: ${ing.quantity || ''} ${ing.unit || ''}`;
  };
 
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
            <button onClick={() => navigate('/register')} className="btn">Register</button>
            <button onClick={() => navigate('/login')} className="btn">Log In</button>
          </div>
        </div>
      </div>
      <div className="featured-recipes">
        <h1><b>FEATURED RECIPES</b></h1>
        <div className="recipe-grid">
          {featuredRecipes.length > 0 ? (
            featuredRecipes.map((recipe, index) => (
              <div
                key={recipe._id}
                className="recipe-card"
                onClick={() => handleRecipeClick(recipe)}
              >
                <img
                  src={recipe.image}
                  alt={recipe.title}
                />
                <div className="recipe-title">
                  <p>{recipe.title}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No featured recipes available.</p>
          )}
        </div>
      </div>
 
      {selectedRecipe && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-button" onClick={handleCloseModal}>&times;</span>
            <div className="modal-details">
              <img src={selectedRecipe.image} alt={selectedRecipe.title} className="modal-image"/>
              <h2>{selectedRecipe.title}</h2>
              <p>{selectedRecipe.description}</p>
              <h4>Ingredients:</h4>
              <ul>
                {selectedRecipe.ingredients.map((ing, index) => (
                  <li key={index}>
                    {displayIngredient(ing) || ''}
                  </li>
                ))}
              </ul>
              <h4>Instructions:</h4>
              <p>{selectedRecipe.instructions}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
 
export default Home;