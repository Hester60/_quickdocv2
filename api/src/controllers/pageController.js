const {Page} = require('../database/models');
const asyncWrapper = require('../middlewares/asyncWrapper.js');
const {NotFoundError} = require("../utils/GeneralError");
const pageManager = require("../managers/pageManager");
const db = require('../database/db');

module.exports.createPage = async (req, res, next) => {
    const session = await db.conn.startSession();

    try {
        session.startTransaction();

        const [page] = await Page.create([
            req.body
        ], { session });

        await session.commitTransaction();

        res.status(201).json(page);
    } catch (error) {
        await session.abortTransaction();
        next(error);
    }

    return session.endSession();
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
    let page = await Page.findById(req.params.pageId);

    if (!page) {
        throw new NotFoundError(`Page with id ${req.params.pageId} not found`)
    }

    return res.status(200).json(page);
});

module.exports.findAllPages = asyncWrapper(async (req, res) => {
    const pages = await Page.find();

    return res.status(200).json(pages);
})
