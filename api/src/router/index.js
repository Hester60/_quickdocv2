const router = require('express').Router();
const projectRouter = require('./projectRouter');
const pageRouter = require('./pageRouter');
const authRouter = require('./authRouter');
const tagRouter = require('./tagRouter');
const uploadRouter = require('./uploadRouter');

router.use('/projects', projectRouter);
router.use('/pages', pageRouter);
router.use('/auth', authRouter);
router.use('/tags', tagRouter);
router.use('/upload', uploadRouter);

module.exports = router;
