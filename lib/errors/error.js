/**
 * error.js
 *
 * @author Jonas Tomanga <celleb@logicpp.com.na>
 * @copyright (c) 2017 Logic Plus Information Technologies CC
 * @license MIT
 */
class CustomError extends Error {
    constructor(message, code = null) {
        super(message);
        this.name = '';
        this.code = code;
        this.message = message;
        this.stack = (new Error()).stack;
    }

    toString() {
        return this.name + ': "' + this.message + '"';
    }
}

module.exports = CustomError;