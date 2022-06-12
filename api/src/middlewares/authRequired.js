const jwt = require('jsonwebtoken');
const asyncWrapper = require('./asyncWrapper');
const {AuthenticationError} = require("../utils/GeneralError");
const {PRODUCTION} = require("../constants/environment");

const authRequired = asyncWrapper(async (req, res, next) => {
    if (process.env.NODE_ENV === PRODUCTION) {
        const header = req.headers.authorization || null;

        if (!header) {
            throw new AuthenticationError("Authentication required");
        }

        const token = header.split(' ')[1];

        if (!token) {
            throw new AuthenticationError("Authentication required");
        }

        jwt.verify(token, process.env.JWT_SECRET); // throw error if invalid
    }

    next();
});

module.exports = authRequired;
