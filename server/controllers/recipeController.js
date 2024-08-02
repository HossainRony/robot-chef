const mongoose = require('mongoose');
const Recipe = require("../models/Recipe");
const Ingredient = require("../models/Ingredient");

// Create a recipe with ingredient names, adding new ingredients if necessary
exports.createRecipeWithNames = async (req, res) => {
  try {
    const recipeData = req.body;

    // Process ingredients, adding new ones to the database if they don't exist
    const ingredientsWithIds = await Promise.all(
      recipeData.ingredients.map(async (ingredient) => {
        // Try to find the ingredient by name
        let ingredientDoc = await Ingredient.findOne({ name: ingredient.ingredient });

        // If the ingredient doesn't exist, create a new one
        if (!ingredientDoc) {
          ingredientDoc = new Ingredient({ name: ingredient.ingredient });
          await ingredientDoc.save();
        }

        // Return the ingredient with its ObjectId and other data
        return {
          ingredient: ingredientDoc._id,
          quantity: ingredient.quantity || null, // Allow quantity to be null or undefined
          unit: ingredient.unit || null,         // Allow unit to be null or undefined
        };
      })
    );

    // Update the recipe data with ObjectIds
    recipeData.ingredients = ingredientsWithIds;

    // Validate and convert author ID
    if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
      throw new Error(`Invalid author ID: ${req.user.id}`);
    }
    recipeData.author = new mongoose.Types.ObjectId(req.user.id);

    // Create a new recipe document
    const recipe = new Recipe(recipeData);
    await recipe.save();
    res.status(201).json({ message: 'Recipe created successfully', recipe });
  } catch (error) {
    console.error('Error creating recipe:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find()
      .populate("author", "username")
      .populate("ingredients.ingredient", "name");
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
      .populate("author", "username")
      .populate("ingredients.ingredient", "name");
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateRecipe = async (req, res) => {
  try {
    const { title, description, ingredients, instructions } = req.body;

    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    // Check if the logged-in user is the author of the recipe
    if (recipe.author.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Update ingredient names to ObjectId references if needed
    const updatedIngredients = await Promise.all(
      ingredients.map(async (ingredient) => {
        let ingredientDoc = await Ingredient.findOne({ name: ingredient.ingredient });

        // If the ingredient doesn't exist, create a new one
        if (!ingredientDoc) {
          ingredientDoc = new Ingredient({ name: ingredient.ingredient });
          await ingredientDoc.save();
        }

        return {
          ingredient: ingredientDoc._id,
          quantity: ingredient.quantity || null,
          unit: ingredient.unit || null,
        };
      })
    );

    recipe.title = title || recipe.title;
    recipe.description = description || recipe.description;
    recipe.ingredients = updatedIngredients || recipe.ingredients;
    recipe.instructions = instructions || recipe.instructions;
    recipe.updatedAt = Date.now();

    await recipe.save();
    res.json({ message: "Recipe updated successfully", recipe });
  } catch (err) {
    console.error('Error updating recipe:', err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    // Check if the logged-in user is the author of the recipe
    if (recipe.author.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Use findByIdAndDelete for deleting the recipe
    await Recipe.findByIdAndDelete(req.params.id);

    res.json({ message: "Recipe deleted successfully" });
  } catch (err) {
    console.error('Error deleting recipe:', err);
    res.status(500).json({ message: "Server error" });
  }
};
