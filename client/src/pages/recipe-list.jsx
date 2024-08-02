import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes, removeRecipe } from '../store/recipeSlice';

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

    return (
        <div className="container mt-4">
            <h1 className="text-center">Recipes</h1>

            <button className="btn btn-primary mb-3" onClick={() => navigate('/recipe-details')}>
                Create New Recipe
            </button>

            {recipes.length > 0 ? (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Ingredients</th>
                            <th>Instructions</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recipes.map((recipe) => (
                            <tr key={recipe?._id}>
                                <td>{recipe?.title}</td>
                                <td>{recipe?.description}</td>
                                <td>
                                    {recipe?.ingredients?.map((ing, index) => (
                                        <div key={index}>
                                            {ing?.quantity} {ing?.unit} of {ing?.ingredient?.name || 'Unknown Ingredient'}
                                        </div>
                                    ))}
                                </td>
                                <td>{recipe.instructions}</td>
                                <td>
                                    <button
                                        className="btn btn-secondary mr-2"
                                        onClick={() => navigate(`/recipe-details/${recipe?._id}`)}
                                    >
                                        Update
                                    </button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(recipe?._id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center">No recipes available.</p>
            )}
        </div>
    );
};

export default RecipeList;
