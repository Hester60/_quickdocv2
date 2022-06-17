const router = require('express').Router();
const {createProject, updateProject, findAllProjects, findProjectById, removeProject} = require('../controllers/projectController');
const authRequired = require('../middlewares/authRequired')

router.route('/')
    .post(authRequired, createProject)
    .get(authRequired,findAllProjects);

router.route('/:projectId')
    .put(authRequired,updateProject)
    .get(authRequired,findProjectById);

router.route(`/:projectId/remove`)
  .delete(authRequired, removeProject);

module.exports = router;
