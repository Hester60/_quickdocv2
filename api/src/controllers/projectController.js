const {Project} = require('../database/models');
const asyncWrapper = require('../middlewares/asyncWrapper.js');
const {NotFoundError} = require("../utils/GeneralError");
const projectManager = require("../managers/projectManager");

module.exports.createProject = asyncWrapper(async(req, res) => {
    const project = await Project.create(req.body);

    return res.status(201).json(project);
});

module.exports.updateProject = asyncWrapper(async(req, res) => {
    let project = await Project.findById(req.params.projectId);

    if (!project) {
        throw new NotFoundError(`Project with id ${req.params.projectId} not found`);
    }

    project = projectManager.update(project, req.body);

    await project.save();

    return res.status(200).json(project);
});

module.exports.findProjectById = asyncWrapper(async (req, res) => {
    let project = await Project.findById(req.params.projectId);

    if (!project) {
        throw new NotFoundError(`Project with id ${req.params.projectId} not found`);
    }

    return res.status(200).json(project);
});

/**
 * TODO: provide pagination in case of projects number grow up.
 *
 * @type {(function(*, *, *): void)|*}
 */
module.exports.findAllProjects = asyncWrapper(async (req, res) => {
   let projects = await Project.find();

   return res.status(200).json(projects);
});
