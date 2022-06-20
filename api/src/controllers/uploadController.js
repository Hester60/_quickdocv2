const asyncWrapper = require('../middlewares/asyncWrapper');
const multer = require('multer');
const {storage, imageFilter} = require('../utils/multerHelper');
const multerUpload = multer({storage: storage, fileFilter: imageFilter});
const uploadMulter =  multerUpload.single('file');

module.exports.upload = asyncWrapper(async (req, res, next) => {
    uploadMulter(req, res, next, (err) => {
        if (err) {
            next(new Error(err));
        } 
        
        return res.status(200).json({
            filename: req.file.filename
        });
    });
}); 