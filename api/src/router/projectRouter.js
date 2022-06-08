const router = require('express').Router();
const {createProject, updateProject, findAllProjects, findProjectById} = require('../controllers/projectController');

router.route('/')
    .post(createProject)
    .get(findAllProjects);

router.route('/:projectId')
    .put(updateProject)
    .get(findProjectById);

module.exports = router;
