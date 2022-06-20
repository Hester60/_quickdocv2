const asyncWrapper = require('../middlewares/asyncWrapper');


module.exports.upload = asyncWrapper(async (req, res, next) => {
    return res.status(200).json({
        filename: req.file.filename
    });
}); 