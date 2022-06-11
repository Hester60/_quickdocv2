const router = require('express').Router();
const {auth} = require('../controllers/authController');

router.route('/')
    .post(auth);

module.exports = router;
