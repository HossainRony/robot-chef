const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const projectController = require('../controllers/project');

// define the routes (GET, POST, PUT, DELETE)
router.get('/', authMiddleware, projectController.getAllProjects);
router.get('/:id', authMiddleware, projectController.getProjectById);
router.post('/', authMiddleware, projectController.createProject);
router.put('/:id', authMiddleware, projectController.updateProject);
router.delete('/:id', authMiddleware, projectController.deleteProject);

module.exports = router;
