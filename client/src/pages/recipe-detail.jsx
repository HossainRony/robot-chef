import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipeById, addRecipe, modifyRecipe } from '../store/recipeSlice';
 
const RecipeDetails = () => {
  const initialRecipeState = {
    title: '',
    description: '',
    ingredients: [{ ingredient: '', quantity: '', unit: '' }],
    instructions: ''
  };
 
  const [recipe, setRecipe] = useState(initialRecipeState);
 
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentRecipe = useSelector((state) => state.recipes.currentRecipe);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    if (id) {
      dispatch(fetchRecipeById(id));
    } else {
      // Reset to initial state when creating a new recipe
      setRecipe(initialRecipeState);
    }
  }, [id, dispatch]);
 
  useEffect(() => {
    if (currentRecipe && id) {
      setRecipe(currentRecipe);
    }
  }, [currentRecipe, id]);
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prevState) => ({ ...prevState, [name]: value }));
  };
 
  const handleIngredientChange = (index, e) => {
    const { name, value } = e.target;
    setRecipe((prevState) => {
      const updatedIngredients = [...prevState.ingredients];
      updatedIngredients[index] = { ...updatedIngredients[index], [name]: value };
      return { ...prevState, ingredients: updatedIngredients };
    });
  };
 
  const handleAddIngredient = () => {
    setRecipe((prevState) => ({
      ...prevState,
      ingredients: [...prevState.ingredients, { ingredient: '', quantity: '', unit: '' }]
    }));
  };
 
  const handleRemoveIngredient = (index) => {
    setRecipe((prevState) => {
      const updatedIngredients = prevState.ingredients.filter((_, i) => i !== index);
      return { ...prevState, ingredients: updatedIngredients };
    });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await dispatch(modifyRecipe({ id, recipeData: recipe }));
      } else {
        await dispatch(addRecipe(recipe));
      }
      navigate('/recipes');
    } catch (err) {
      setError('Failed to save recipe. Please try again.');
    }
  };
 
  return (
    <div className="container mt-4">
      <h1 className="text-center">{id ? 'Update Recipe' : 'Create Recipe'}</h1>
      {error && <div className="alert alert-danger">{error}</div>}
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
            <div key={index} className="form-row align-items-center mb-2">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ingredient"
                  name="ingredient"
                  value={ing?.ingredient?.name || ing.ingredient}
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
                  value={ing.quantity || ''}
                  onChange={(e) => handleIngredientChange(index, e)}
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Unit"
                  name="unit"
                  value={ing.unit || ''}
                  onChange={(e) => handleIngredientChange(index, e)}
                />
              </div>
              <div className="col-auto">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleRemoveIngredient(index)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleAddIngredient}
          >
            Add Ingredient
          </button>
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