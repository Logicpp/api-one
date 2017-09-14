/**
 * authentication.js
 *
 * @author Jonas Tomanga <celleb@logicpp.com.na>
 * @copyright (c) 2017 Logic Plus Information Technologies CC
 * All rights reserved
 */
/**
 * Imports and exports the authentication handler.
 * This file is module is imported when used for authentication.
 * Set authentication to null if no authentication handler is needed.
 */
authentication = require('../lib/api.authentication');
module.exports = authentication;