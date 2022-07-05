const router = require('express').Router();
const {upload} = require('../controllers/uploadController');
const authRequired = require('../middlewares/authRequired')
const multer = require('multer');
const { storage, imageFilter } = require('../utils/multerHelper');
const multerUpload = multer({ storage: storage, fileFilter: imageFilter });
const uploadMulter = multerUpload.single('upload');
router.route('/')
    .post(authRequired,uploadMulter, upload);

module.exports = router;
 