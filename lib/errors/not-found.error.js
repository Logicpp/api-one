/**
 * not-found.error.js
 *
 * @author Jonas Tomanga <celleb@logicpp.com.na>
 * @copyright (c) 2017 Logic Plus Information Technologies CC
 * All rights reserved
 */
const CustomError = require('./error');
const errMessages = require('../../config/error-messages.config');
class NotFoundError extends CustomError {
    constructor(options) {
        let message = options.message || errMessages.notFound;
        let code = options.code || 404;
        super(message, code);
        this.name = 'NotFoundError';
    }
}
module.exports = NotFoundError;
