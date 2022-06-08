/**
 * Wrap async method to avoid using try/catch
 *
 * @param fn
 * @returns {(function(*, *, *): void)|*}
 */
const asyncWrapper = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};

module.exports = asyncWrapper;
