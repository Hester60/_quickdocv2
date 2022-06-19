const router = require('express').Router();
const projectRouter = require('./projectRouter');
const pageRouter = require('./pageRouter');
const authRouter = require('./authRouter');
const tagRouter = require('./tagRouter');

router.use('/projects', projectRouter);
router.use('/pages', pageRouter);
router.use('/auth', authRouter);
router.use('/tags', tagRouter);

module.exports = router;
