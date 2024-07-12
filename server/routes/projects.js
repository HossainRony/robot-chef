const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projects');

//REST API for projects
//GET all projects
router.get('/', projectController.getAllProjects);
//GET a project by id
router.get('/:id', projectController.getProjectById);
//POST a new project
router.post('/', projectController.createProject);
//PUT a project
router.put('/:id', projectController.updateProject);
//DELETE a project
router.delete('/:id', projectController.deleteProject);
module.exports = router;