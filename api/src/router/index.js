const router = require('express').Router();
const projectRouter = require('./projectRouter');
const pageRouter = require('./pageRouter');

router.use('/projects', projectRouter);
router.use('/pages', pageRouter);

module.exports = router;
