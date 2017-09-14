/**
 * unauthorized.error.js
 *
 * @author Jonas Tomanga <celleb@logicpp.com.na>
 * @copyright (c) 2017 Logic Plus Information Technologies CC
 * @license MIT
 */
const CustomError = require('./error');
const errMessages = require('../../config/error-messages.config');
class UnauthorizedError extends CustomError {
    constructor(options) {
        let message = options.message || errMessages.unauthorized;
        let code = options.code || 403;
        super(message, code);
        this.name = 'UnauthorizedError';
    }
}
module.exports = UnauthorizedError;

