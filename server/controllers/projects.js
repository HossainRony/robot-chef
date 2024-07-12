const projectModel = require('../models/projects');

//CRUD OPERATIONS FOR PROJECTS
// Create a new Proj    
exports.createProject = async (req, res) => {
    const project = new projectModel({
        title: req.body.title,
        description: req.body.description,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
     });

    try{
        const newProject = await project.save();
        res.status(201).json(newProject)
    }

    catch(err){
        res.status(400).json({message: err.message})
    }



}
// Update a new Proj
exports.updateProject = async (req, res) => {

    try{
        const project = await projectModel.findById(req.params.id);
        
        if(project ==null){
            return res.status(404).json({message: 'Project not found'})
        }
        if(req.body.title != null){
            project.title =req.body.title
        }
        if(req.body.description != null){
            project.description =req.body.description
        }
        if(req.body.startDate != null){
            project.startDate =req.body.startDate    
        }
        if(req.body.endDate != null){
            project.endDate =req.body.endDate    
        }

        const updatedProject = await project.save();
        res.json(updatedProject)

    }

    catch(err){
        res.status(400).json({message: err.message})
    }

}


// Delete a proj
exports.deleteProject =async (req, res) =>{
    try{
        const project = await projectModel.findById(req.params.id);

        if(project == null){
            return res.status(404).json({messae: 'Project not found'})
        }
        
        await projectModel.findByIdAndDelete(req.params.id);
        res.json({message: 'Project deleted'})

    }

catch(err){
    res.status(500).json({message: err.message})
}

}

// Get all proj
exports.getAllProjects = async (req, res) => {
    try{
        const projects = await projectModel.find();
        res.json(projects)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
};

//get proj by id
exports.getProjectById = async (req, res) => {
    try {
        const project = await projectModel.findById(req.params.id);

        if(project == null){
            return res.status(404).json({ message: 'Project not found'})
        }
        res.json(project)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
}