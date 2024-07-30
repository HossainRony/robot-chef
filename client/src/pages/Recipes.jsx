import React from 'react';
import { useParams } from 'react-router-dom';
import './recipeDetails.css';
import robotChefLogo from '../image/Robot-Chef.png';
import breakfastImg from '../image/breakfast.png';
import cookiesImg from '../image/cookies.png';
import pastaImg from '../image/pasta.png';
import saladImg from '../image/salad.png';
import steakImg from '../image/steak.png';

const recipes = {
  breakfast: {
    title: "Breakfast",
    img: breakfastImg,
    description: "A delicious and nutritious breakfast to start your day."
  },
  cookies: {
    title: "Cookies",
    img: cookiesImg,
    description: "Sweet and tasty cookies for a delightful snack."
  },
  pasta: {
    title: "Pasta",
    img: pastaImg,
    description: "Classic pasta recipe perfect for lunch or dinner."
  },
  salad: {
    title: "Salad",
    img: saladImg,
    description: "Fresh and healthy salad to complement any meal."
  },
  steak: {
    title: "Steak",
    img: steakImg,
    description: "Juicy and flavorful steak cooked to perfection."
  }
};

const RecipeDetails = () => {
  const { id } = useParams();
  const recipe = recipes[id];

  return (
    <div className="recipe-details-container">
      <div className="recipe-details-content">
        <div className="recipe-details-logo">
          <img src={robotChefLogo} alt="Robot Chef Logo" />
        </div>
        <div className="recipe-details-text">
          <h1>{recipe.title}</h1>
          <img src={recipe.img} alt={recipe.title} />
          <p>{recipe.description}</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
