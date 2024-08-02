import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes, removeRecipe } from '../store/recipeSlice';
import './recipe-list.css'; // Assuming you have a CSS file for styles
 
import image1 from '../image/steak.png';
import image2 from '../image/breakfast.png';
import image3 from '../image/salad.png';
import image4 from '../image/cookies.png';
import image5 from '../image/pasta.png';
 
const imageArray = [image1, image2, image3, image4, image5];
 
const RecipeList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const recipes = useSelector((state) => state.recipes.recipes);
 
    useEffect(() => {
        dispatch(fetchRecipes());
    }, [dispatch]);
 
    const handleDelete = (id) => {
        dispatch(removeRecipe(id));
    };
 
    const getImageForRecipe = (index) => {
        return imageArray[index % imageArray.length];
    };
 
    return (
        <div className="container mt-4">
            <h1 className="text-center">Recipes</h1>
 
            <button className="btn btn-primary mb-3" onClick={() => navigate('/recipe-details')}>
                Create New Recipe
            </button>
 
            {recipes.length > 0 ? (
                <div className="flex-container">
                    {recipes.map((recipe, index) => (
                        <div
                            key={recipe._id}
                            className="clickable-box"
                            onClick={() => navigate(`/recipe-details/${recipe._id}`)}
                        >
                            <img src={getImageForRecipe(index)} alt="Recipe" className="recipe-image" />
                            <div className="recipe-name">{recipe.title}</div>
                            <div className="button-group">
                                <button
                                    className="btn btn-secondary"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/recipe-details/${recipe._id}`);
                                    }}
                                >
                                    Update
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(recipe._id);
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center">No recipes available.</p>
            )}
        </div>
    );
};
 
export default RecipeList;