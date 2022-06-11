const router = require('express').Router();
const {createProject, updateProject, findAllProjects, findProjectById} = require('../controllers/projectController');
const authRequired = require('../middlewares/authRequired')

router.route('/')
    .post(authRequired, createProject)
    .get(authRequired,findAllProjects);

router.route('/:projectId')
    .put(authRequired,updateProject)
    .get(authRequired,findProjectById);

module.exports = router;
