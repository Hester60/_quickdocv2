const db = require("../database/db");
const {Page} = require("../database/models");
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

module.exports.removeProject = async (project) => {
    const session = await db.conn.startSession();

    try {
        session.startTransaction();

        await Page.deleteMany({parent: project._id});

        await project.remove();
        await session.commitTransaction();

        return true;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw new Error(error);
    }
}
