const {TokenExpiredError, JsonWebTokenError, NotBeforeError} = require('jsonwebtoken');
const {AuthenticationError, NotFoundError, PermissionError} = require('../utils/GeneralError');
const {PRODUCTION} = require("../constants/environment");

// eslint-disable-next-line no-unused-vars
module.exports = (error, req, res, next) => {
    if (process.env.NODE_ENV !== PRODUCTION) {
        console.error(error);
    }

    // Not found error (404)
    if (error.constructor === NotFoundError) {
        return res.status(404).json({error: error.message, status: 404});
    }

    // Authentication error (invalid credentials ...)
    if (error.constructor === AuthenticationError) {
        return res.status(401).json({error: error.message, status: 401});
    }

    // JWT error (expired)
    if (error.constructor === TokenExpiredError) {
        return res.status(401).json({error: 'Expired token. Please authenticate.', status: 401});
    }

    // JWT error (invalid, erroned ...)
    if (error.constructor === JsonWebTokenError) {
        return res.status(401).json({error: 'Invalid token. Please authenticate.', status: 401});
    }

    // JWT error (invactive...)
    if (error.constructor === NotBeforeError) {
        return res.status(401).json({error: 'Inactive token. Please authenticate.', status: 401});
    }

    return res.status(500).json({
        status: 500,
        error: error.message,
    });
};
