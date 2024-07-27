const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ingredients: {
        type: String,
        required: true
    },
    cookingTime: {
        type: String,
        required: true
    },
    feedsUpTo: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Project', projectSchema);
