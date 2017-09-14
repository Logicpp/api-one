/**
 * unauthenticated.error.js
 *
 * @author Jonas Tomanga <celleb@logicpp.com.na>
 * @copyright (c) 2017 Logic Plus Information Technologies CC
 * @license MIT
 */
const CustomError = require('./error');
const errMessages = require('../../config/error-messages.config');
class UnauthenticatedError extends CustomError {
    constructor(options) {
        let message = options.message || errMessages.unauthentication;
        let code = options.code || 401;
        super(message, code);
        this.name = 'UnauthenticatedError';
    }
}

module.exports = UnauthenticatedError;

