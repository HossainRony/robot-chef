const mongoose = require('mongoose');



//REPLACE LATER WITH ROBOT CHEF RECIPE
const projectScheme = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    } 

})

module.exports =mongoose.model('Project', projectScheme); //exporting the model