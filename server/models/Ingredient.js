const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    trim: true,
  },
  quantity: {
    type: Number,
    required: false,
    default: null,
  },
  unit: {
    type: String,
    required: false,
    default: null,
  },
});

module.exports = mongoose.model('Ingredient', ingredientSchema);
