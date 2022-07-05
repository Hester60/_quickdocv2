const asyncWrapper = require('../middlewares/asyncWrapper');

module.exports.upload = asyncWrapper(async (req, res, next) => {
    return res.status(200).json({
        url: `${req.protocol}://${req.get('host')}${process.env.API_BASE_PATH}/static/uploads/${req.file.filename}`
    });
}); 