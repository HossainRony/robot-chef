const Project = require('../models/project');

// REST API 
// CRUD using HTTP Verbs (GET, POST, PUT, DELETE)

// GET /api/projects
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find(); // find all projects
        res.json(projects);
    } catch(err){
        res.status(500).json({message: err.message});
    }
};

// GET /api/projects/:id
exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id); // find project by id
        
        if(project == null){
            return res.status(404).json({message: 'Project not found'});
        }

        res.json(project);

    } catch(err){
        res.status(500).json({message: err.message});
    }
};

// POST /api/projects
exports.createProject = async (req, res) => {
    const project = new Project({
        name: req.body.name,
        ingredients: req.body.ingredients,
        cookingTime: req.body.cookingTime,
        feedsUpTo: req.body.feedsUpTo,
    });

    try {
        const newProject = await project.save();
        res.status(201).json(newProject);
    } catch(err){
        res.status(400).json({message: err.message});
    }
}

// PUT /api/projects/:id
exports.updateProject = async (req, res) => {
    try {
        const project  = await Project.findById(req.params.id);

        if(project == null){
            return res.status(404).json({message: 'Project not found'});
        }

        if(req.body.name != null){
            project.name = req.body.name;
        }

        if(req.body.ingredients != null){
            project.ingredients = req.body.ingredients;
        }

        if(req.body.cookingTime != null){
            project.cookingTime = req.body.cookingTime;
        }

        if(req.body.feedsUpTo != null){
            project.feedsUpTo = req.body.feedsUpTo;
        }

        const updateProject = await project.save();
        
        res.json(updateProject);
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
}

// DELETE /api/projects/:id
exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if(project == null){
            return res.status(404).json({message: 'Project not found'});
        }

        await Project.findByIdAndDelete(req.params.id);

        res.json({message: 'Project deleted successfully'});
    } catch(err){
        res.status(500).json({message: err.message});
    }
}
