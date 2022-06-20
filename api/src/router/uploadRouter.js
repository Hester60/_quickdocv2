const router = require('express').Router();
const {upload} = require('../controllers/uploadController');
const authRequired = require('../middlewares/authRequired')

router.route('/')
    .post(authRequired, upload);

module.exports = router;
 