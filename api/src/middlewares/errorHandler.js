const {TokenExpiredError, JsonWebTokenError, NotBeforeError} = require('jsonwebtoken');
const {AuthenticationError, NotFoundError} = require('../utils/GeneralError');
const {PRODUCTION} = require("../constants/environment");
const {Error: ValidationError} = require('mongoose');

module.exports = (error, req, res, next) => {
    if (process.env.NODE_ENV !== PRODUCTION) {
        console.error(error);
    }

    /**
     * Mongoose validation errors
     */
    if (error instanceof ValidationError) {
        if (error.name === 'ValidationError') {
            return res.status(422).json({errors: {...error.errors}, status: 422});
        }
    }

    // Not found error (404)
    if (error instanceof NotFoundError) {
        return res.status(404).json({error: error.message, status: 404});
    }

    // Authentication error (invalid credentials ...)
    if (error instanceof AuthenticationError) {
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
