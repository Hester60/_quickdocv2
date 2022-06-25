const { Page } = require('../database/models');
const db = require('../database/db');

/**
 * Update project object if newData contains change.
 *
 * @param page
 * @param newData
 * @returns {*}
 */
module.exports.update = (page, newData) => {
    const { title, body, tag } = newData;

    page.title = title !== undefined ? title : page.title;
    page.body = body !== undefined ? body : page.body;
    page.tag = tag !== undefined ? tag : page.tag;

    return page;
}

module.exports.move = (page, parent) => {
    if (parent) {
        page.parent = parent._id;
    } else {
        page.parent = null;
    }

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
        { $match: { _id: page._id } },
        { $graphLookup: { from: 'pages', startWith: '$_id', connectFromField: '_id', connectToField: 'parent', as: 'children', depthField: 'generation' } }
    ]);

    return await aggregate.exec();
}

/**
 * Return page with a parents array who contains all parent (from all generation) of a page.
 *
 * @param page
 * @returns {Promise<Array<any>>}
 */
module.exports.getPageParentsFlat = async (page) => {
    const aggregate = Page.aggregate([
        { $match: { _id: page._id } },
        { $graphLookup: { from: 'pages', startWith: '$parent', connectFromField: 'parent', connectToField: '_id', as: 'parents', depthField: 'generation' } }
    ]);

    return await aggregate.exec();
}

/**
 * Throw error if page doesn't have same project
 *
 * @param target1
 * @param target2
 * @returns {boolean}
 */
module.exports.pagesHaveSameProject = (target1, target2) => {
    return target1.project.equals(target2.project);
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

    if (page._id.equals(newParent._id)) {
        return false;
    }

    const aggretionResult = await this.getPageChildrenFlat(page);

    const child = aggretionResult[0].children.find(e => e._id.equals(newParent._id));

    return !child;
}

module.exports.removePage = async (page, next) => {
    const session = await db.conn.startSession();
    let deletedIds = [page._id];

    try {
        session.startTransaction();

        const aggregationResult = await this.getPageChildrenFlat(page);
        const children = aggregationResult[0].children;

        if (children.length > 0) {
            let ids = children.map(child => child._id);
            deletedIds = [...deletedIds, ...ids];
            await Page.deleteMany({ _id: { $in: ids } });
        }

        await page.remove();
        await session.commitTransaction();

        return {deletedIds, session};
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw new Error(error);
    }
}
