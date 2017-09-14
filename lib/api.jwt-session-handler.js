/**
 * api.session-handler.js
 *
 * @author Jonas Tomanga <celleb@mrcelleb.com>
 * @copyright (c) 2017 Jonas Tomanga
 * @license MIT
 */
const _ = require('lodash');
const Logger = require('../lib/logger');
const session = {
    /**
     * Checks if the jwt object has been set.
     * @param {object} req - Express request object.
     * @return {boolean} - Returns true if it has been set or false otherwise.
     */
    check: function (req) {
        return req.jwt ? true : false;
    },
    /**
     * Checks if the jwt payload has been set
     * @param {object} req - Express request object.
     * @return {boolean} - Returns true if it has been set or false otherwise.
     */
    checkPayload: function (req) {
        return (this.check(req) && req.jwt.payload) ? true : false;
    },
    /**
     * Checks if the permissions for the session has been set.
     * @param {object} req - Express request object.
     * @return {boolean} - Returns true if it has been set or false otherwise.
     */
    checkPermissions: function (req) {
        return (this.checkPayload(req) && req.jwt.payload.permissions) ? true : false;
    },
    /**
     * A wrapper for lodash _.has() method
     * @param {object} parent - The object or array to search from.
     * @param {string} child - The element or property to search for.
     * @return {any}
     */
    has: function (parent, child) {
        return _.has(parent, child);
    },
    /**
     * Returns the value of a particular property from the session.
     * @param {object} req - Express request object.
     * @param {string} item - The key or property of the session.
     * @return {boolean} - Returns the value of the key or property exist or false otherwise.
     */
    get: function (req, item) {
        return (this.checkPayload(req) && this.has(req.jwt.payload, item)) ? req.jwt.payload[item] : undefined;
    },
    /**
     * Returns the auth object from the sessions.
     * @param {object} req - Express request object.
     * @return {object} - Returns the auth object or undefined.
     */
    getPayload: function (req) {
        return this.checkPayload(req) ? req.jwt.payload : undefined;
    },
    /**
     * Returns the permissions object from the session.auth
     * @param {object} req - Express request object.
     * @return {object} - Returns the permissions object or undefined.
     */
    getPermissions: function (req) {
        return this.checkPermissions(req) ? req.jwt.payload.permissions : undefined;
    }
}
/**
 * Sessions handling module
 */
module.exports = session;