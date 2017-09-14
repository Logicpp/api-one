/**
 * MongoDB Error Handler
 *
 * @author Jonas Tomanga <celleb@logicpp.com.na>
 * @copyright (c) 2017 Logic Plus Information Technologies CC
 * @license MIT
 */
require('../config/http-status');
const codes = require('../config/status-codes');
const errMessages = require('../config/error-messages.config');

/**
 * Handlers errors raised by mongo db
 * @param {object} error - MognoError object.
 */
const mongoDBErrorHandler = (error) => {
    status = 500;
    feedback = {};
    switch (error.code) {
        case 11000:
            status = _CONFLICT;
            feedback = codes._48;
            break;
        default:
            feedback = codes._51
    }

    return [status, feedback];
}
module.exports = {
    resolve: function (error) {
        return mongoDBErrorHandler(error);
    }
}