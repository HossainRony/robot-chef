const Recipe = require('../models/Recipe');
const Ingredient = require('../models/Ingredient');

exports.createRecipe = async (req, res) => {
  try {
    const { title, description, ingredients, instructions } = req.body;

    const newRecipe = new Recipe({
      title,
      description,
      ingredients,
      instructions,
      author: req.user.id
    });

    await newRecipe.save();
    res.status(201).json({ message: 'Recipe added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().populate('author', 'username').populate('ingredients.ingredient', 'name');
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate('author', 'username').populate('ingredients.ingredient', 'name');
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateRecipe = async (req, res) => {
  try {
    const { title, description, ingredients, instructions } = req.body;

    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });

    // Check if the logged-in user is the author of the recipe
    if (recipe.author.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    recipe.title = title || recipe.title;
    recipe.description = description || recipe.description;
    recipe.ingredients = ingredients || recipe.ingredients;
    recipe.instructions = instructions || recipe.instructions;
    recipe.updatedAt = Date.now();

    await recipe.save();
    res.json({ message: 'Recipe updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });

    // Check if the logged-in user is the author of the recipe
    if (recipe.author.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await recipe.remove();
    res.json({ message: 'Recipe deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
