const {Page} = require('../database/models');
const mongoose = require('mongoose');
const {generateTreeFromGeneration} = require("../utils/generateTree");

/**
 * Return true if both parameters are equal
 *
 * @param pageProjectId
 * @param compareProjectId
 */
module.exports.isSameProject = (pageProjectId, compareProjectId) => {
    return pageProjectId.equals(compareProjectId);
}

/**
 * Update project object if newData contains change.
 *
 * @param page
 * @param newData
 * @returns {*}
 */
module.exports.update = (page, newData) => {
    const {title, body, parent} = newData;

    page.title = title !== undefined ? title : page.title;
    page.body = body !== undefined ? body : page.body;
    page.parent = parent !== undefined ? parent : page.parent;

    return page;
}

/**
 * Return page with an children array who contains all children (from all generation) of a page.
 *
 * @param page
 * @returns {Promise<Array<any>>}
 */
module.exports.getPageChildrenFlat = async (page) => {
    const aggregate = Page.aggregate([
        {$match: {_id: page._id}},
        {$graphLookup: {from: 'pages', startWith: '$_id', connectFromField: '_id', connectToField: 'parent', as: 'children', depthField: 'generation'}}
    ]);

    return await aggregate.exec();
}

/**
 * Check if page id and new parent id is not same, and if new parent is not one of page's children
 *
 * @param page
 * @param newParent
 * @returns {Promise<boolean>}
 */
module.exports.canUpdateParent = async (page, newParent) => {
    if (!newParent) {
        return true;
    }

    newParent = mongoose.Types.ObjectId(newParent);

    if (page._id.equals(newParent) || page.parent.equals(newParent)) {
        return false;
    }

    const aggrationResult = await this.getPageChildrenFlat(page);
    const child = aggrationResult[0].children.find(e => e._id.equals(newParent));

    return !child;
}

module.exports.getTreeFromPage = async (page) => {
    const aggrationResult = await this.getPageChildrenFlat(page);
    return generateTreeFromGeneration(aggrationResult[0]);
}
