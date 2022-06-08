const {Project} = require('../database/models');
const asyncWrapper = require('../middlewares/asyncWrapper.js');

module.exports.createProject = asyncWrapper(async(req, res) => {
    const project = await Project.create(req.body);

    res.status(201).json(project);
});