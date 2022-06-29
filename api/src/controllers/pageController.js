const {Page} = require('../database/models');
const asyncWrapper = require('../middlewares/asyncWrapper.js');
const {NotFoundError} = require("../utils/GeneralError");
const pageManager = require("../managers/pageManager");
const db = require('../database/db');
const mongoose = require('mongoose');

module.exports.createPage = async (req, res, next) => {
    const session = await db.conn.startSession();

    try {
        session.startTransaction();

        const [page] = await Page.create([req.body], {session});

        if (req.body.parent) {
            const parent = await Page.findById(req.body.parent);

            if (!pageManager.pagesHaveSameProject(parent, page)) {
                throw new Error('Error when trying to create page, please retry');
            }
        }

        await session.commitTransaction();

        res.status(201).json(page);
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }

    session.endSession();
};

module.exports.updatePage = asyncWrapper(async (req, res, next) => {
    let page = await Page.findById(req.params.pageId);

    if (!page) {
        throw new NotFoundError(`Page with id ${req.params.pageId} not found`)
    }

    const updatedPage = pageManager.update(page, req.body);
    await updatedPage.save();
    await page.populate({
        path: 'parent', select: '_id title'
    });

    return res.status(200).json(updatedPage);
});

module.exports.movePage = asyncWrapper(async (req, res, next) => {
    let page = await Page.findById(req.params.pageId);

    if (!page) {
        throw new NotFoundError(`Page with id ${req.params.pageId} not found`)
    }

    const parent = await Page.findById(req.body.parent);

    if (parent && !pageManager.pagesHaveSameProject(parent, page)) {
        throw new Error('Error when trying to update page, please retry');
    }

    if (!await pageManager.canUpdateParent(page, parent)) {
        throw new Error('Error when trying to update page, please retry');
    }

    page = pageManager.move(page, parent);
    await page.save();
    await page.populate({
        path: 'parent', select: '_id title __v'
    });

    return res.status(200).json(page);
});

module.exports.findPageById = asyncWrapper(async (req, res) => {
    let page = await Page.findById(req.params.pageId).populate('project').populate({
        path: 'parent', select: '_id title __v'
    });

    if (!page) {
        throw new NotFoundError(`Page with id ${req.params.pageId} not found`);
    }

    return res.status(200).json(page);
});

module.exports.findParentsById = asyncWrapper(async (req, res) => {
    let page = await Page.findById(req.params.pageId);

    if (!page) {
        throw new NotFoundError(`Page with id ${req.params.pageId} not found`);
    }

    const aggregationResult = await pageManager.getPageParentsFlat(page);
    await Page.populate(aggregationResult[0], {path: 'project'});

    return res.status(200).json(aggregationResult[0]);
});

module.exports.findAllPages = asyncWrapper(async (req, res) => {
    const limit = req.query.limit ?? 0;
    const currentPage = req.query.page ?? 1;
    const skip = limit * (currentPage - 1);
    const {project} = req.query;
    const query = {
        title: {$regex: req.query.q ?? '', $options: 'i'}
    };

    if (project) {
        query.project = mongoose.Types.ObjectId(project);
    }

    const projection = req.query.projection ? req.query.projection.split(',').join(' ') : '';

    const pages = await Page.find(query, projection).populate({
        path: 'parent', select: '_id title'
    }).sort({createdAt: -1}).skip(skip).limit(limit);
    const totalItems = await Page.count(query);
    const pagination = {
        totalItems,
        currentPage,
        itemsPerPage: limit,
        back: currentPage > 1,
        next: (currentPage * limit) > 0 && (currentPage * limit) < totalItems,
        maxPages: Math.round(totalItems / limit)
    }

    return res.status(200).json({pages, pagination});
});

/**
 * Return ids array of deleted pages
 */
module.exports.removePage = asyncWrapper(async (req, res) => {
    let page = await Page.findById(req.params.pageId);

    if (!page) {
        throw new NotFoundError(`Page with id ${req.params.pageId} not found`)
    }

    const {deletedIds, session} = await pageManager.removePage(page);

    session.endSession();

    return res.status(200).json({deletedIds});
});
