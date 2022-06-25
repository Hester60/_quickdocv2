const router = require('express').Router();
const { createPage, findAllPages, findPageById, updatePage, movePage, removePage, findParentsById } = require('../controllers/pageController');
const authRequired = require('../middlewares/authRequired')

router.route('/')
    .post(authRequired, createPage)
    .get(authRequired, findAllPages);

router.route('/:pageId/move')
    .put(authRequired, movePage);

router.route('/:pageId')
    .get(authRequired, findPageById)
    .put(authRequired, updatePage);

router.route('/:pageId/parents')
    .get(authRequired, findParentsById)

router.route('/:pageId')
    .delete(authRequired, removePage);

module.exports = router;
