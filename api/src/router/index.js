const router = require('express').Router();
const projectRouter = require('./projectRouter');

router.use('/projects', projectRouter);

module.exports = router;