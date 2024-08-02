import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipeById, addRecipe, modifyRecipe } from '../store/recipeSlice';

const RecipeDetails = () => {
    const [recipe, setRecipe] = useState({
        title: '',
        description: '',
        ingredients: [{ ingredient: '', quantity: '', unit: '' }],
        instructions: ''
    });

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentRecipe = useSelector((state) => state.recipes.currentRecipe);

    useEffect(() => {
        if (id) {
            dispatch(fetchRecipeById(id));
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (currentRecipe) {
            setRecipe(currentRecipe);
        }
    }, [currentRecipe]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecipe(prevState => ({ ...prevState, [name]: value }));
    };

    const handleIngredientChange = (index, e) => {
        const { name, value } = e.target;
        const updatedIngredients = [...recipe.ingredients];
        updatedIngredients[index][name] = value;
        setRecipe(prevState => ({ ...prevState, ingredients: updatedIngredients }));
    };

    const handleAddIngredient = () => {
        setRecipe(prevState => ({
            ...prevState,
            ingredients: [...prevState.ingredients, { ingredient: '', quantity: '', unit: '' }]
        }));
    };

    const handleRemoveIngredient = (index) => {
        const updatedIngredients = recipe.ingredients.filter((_, i) => i !== index);
        setRecipe(prevState => ({ ...prevState, ingredients: updatedIngredients }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) {
            dispatch(modifyRecipe({ id, recipeData: recipe })).then(() => navigate('/recipes'));
        } else {
            dispatch(addRecipe(recipe)).then(() => navigate('/recipes'));
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center">{id ? 'Update Recipe' : 'Create Recipe'}</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={recipe.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        value={recipe.description}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Ingredients</label>
                    {recipe.ingredients.map((ing, index) => (
                        <div key={index} className="form-row">
                            <div className="col">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Ingredient"
                                    name="ingredient"
                                    value={ing.ingredient}
                                    onChange={(e) => handleIngredientChange(index, e)}
                                    required
                                />
                            </div>
                            <div className="col">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Quantity"
                                    name="quantity"
                                    value={ing.quantity}
                                    onChange={(e) => handleIngredientChange(index, e)}
                                    required
                                />
                            </div>
                            <div className="col">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Unit"
                                    name="unit"
                                    value={ing.unit}
                                    onChange={(e) => handleIngredientChange(index, e)}
                                    required
                                />
                            </div>
                            <button type="button" className="btn btn-danger" onClick={() => handleRemoveIngredient(index)}>Remove</button>
                        </div>
                    ))}
                    <button type="button" className="btn btn-secondary" onClick={handleAddIngredient}>Add Ingredient</button>
                </div>
                <div className="form-group">
                    <label htmlFor="instructions">Instructions</label>
                    <textarea
                        className="form-control"
                        id="instructions"
                        name="instructions"
                        value={recipe.instructions}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    {id ? 'Update' : 'Create'}
                </button>
            </form>
        </div>
    );
};

export default RecipeDetails;
