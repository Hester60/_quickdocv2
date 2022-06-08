/**
 * Update project object if newData contains change.
 *
 * @param project
 * @param newData
 * @returns {*}
 */
module.exports.update = function(project, newData) {
    const {name} = newData;

    project.name = name !== undefined ? name : project.name;

    return project;
}
