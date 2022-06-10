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

        const [page] = await Page.create([
            req.body
        ], { session });

        if (req.body.parent) {
            const parent = await Page.findById(req.body.parent);

            pageManager.pagesHaveSameProject(parent, page); // throw error if page and his parent doesn't have same prj
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

module.exports.updatePage = asyncWrapper(async (req, res) => {
    let page = await Page.findById(req.params.pageId);

    if (!page) {
        throw new NotFoundError(`Page with id ${req.params.pageId} not found`)
    }

    // Remove parent from request body if parent is not editable or if it doesn't exist
    const {parent} = req.body;

    if (parent) {
        const parentExist = await Page.findById(req.body.parent);
        let deleteParent = false;

        if (!parentExist || !pageManager.isSameProject(page.project, )) {
            deleteParent = true;
        }

        const canUpdateParent = await pageManager.canUpdateParent(page, parent);

        if (!canUpdateParent) {
            deleteParent = true;
        }

        if (deleteParent) {
            delete req.body.parent;
        }
    }

    page = pageManager.update(page, req.body);

    await page.save();

    return res.status(200).json(page);
});

module.exports.findPageById = asyncWrapper(async (req, res) => {
    let page = await Page.findById(req.params.pageId).populate('project').populate({path: 'parent', select: '_id title __v'});

    if (!page) {
        throw new NotFoundError(`Page with id ${req.params.pageId} not found`);
    }

    return res.status(200).json(page);
});

module.exports.findAllPages = asyncWrapper(async (req, res) => {
    const limit = req.query.limit ?? 10;
    const currentPage = req.query.page ?? 1;
    const skip = limit * (currentPage - 1);
    const {project} = req.query;
    const query = {};

    if (project) {
        query.project = mongoose.Types.ObjectId(project);
    }

    const pages = await Page.find(query).sort({createdAt: -1}).skip(skip).limit(limit);
    const totalItems = await Page.count(query);
    const pagination = {
        totalItems,
        currentPage,
        itemsPerPage: limit,
        back: currentPage > 1,
        next: (currentPage * limit) < totalItems,
        maxPages: Math.round(totalItems / limit)
    }

    return res.status(200).json({pages, pagination});
})
