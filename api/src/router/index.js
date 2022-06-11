const router = require('express').Router();
const projectRouter = require('./projectRouter');
const pageRouter = require('./pageRouter');
const authRouter = require('./authRouter');
const authRequired = require('../middlewares/authRequired');

router.use('/projects', projectRouter);
router.use('/pages', pageRouter);
router.use('/auth', authRouter);

module.exports = router;
