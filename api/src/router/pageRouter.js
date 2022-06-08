const router = require('express').Router();
const {createPage, findAllPages, findPageById, updatePage} = require('../controllers/pageController');

router.route('/')
    .post(createPage)
    .get(findAllPages);

router.route('/:pageId')
    .get(findPageById)
    .put(updatePage);

module.exports = router;
