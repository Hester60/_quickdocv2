class GeneralError extends Error {
    /**
     * @param {string} message
     */
    constructor(message) {
        super();
        this.message = message;
    }
}

/**
 * Used as 401 error by the error handler
 */
class AuthenticationError extends GeneralError {}

/**
 * Used as 404 error by the error handler
 */
class NotFoundError extends GeneralError {}

module.exports = {GeneralError, AuthenticationError, NotFoundError, PermissionError};
