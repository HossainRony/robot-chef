const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const auth = require('../middleware/auth');

// Create a new recipe
router.post('/add', auth, recipeController.createRecipeWithNames);

// Get all recipes
router.get('/', recipeController.getAllRecipes);

// Get a single recipe by ID
router.get('/:id', recipeController.getRecipeById);

// Update a recipe by ID
router.put('/:id', auth, recipeController.updateRecipe);

// Delete a recipe by ID
router.delete('/:id', auth, recipeController.deleteRecipe);

module.exports = router;
