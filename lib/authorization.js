/**
 * Authorization Handler
 *
 * @author Jonas Tomanga <celleb@mrcelleb.com>
 * @copyright (c) 2017 Jonas Tomanga
 * @license MIT
 */
const _ = require('lodash');
const Logger = require('./logger');
const access = require('../config/access');
const $session = require('../config/session');
const codes = require('../config/status-codes');
const errMessages = require('../config/error-messages.config');
const UnauthorizedError = require('../lib/errors/unauthorized.error');
require('../config/crud');
class Authorization {
    constructor(config) {
        this.config = config;
        this.authorizer = this.authorizer.bind(this)
    }
    /**
     * Authorization middleware main function.
     * Calls next() is the user is authorized 
     * or next(error) to forward to error handler if the user is not authorized
     * @param {object} req - Express request object.
     * @param {object} res - Express response object.
     * @param {object} next - Express next function.
     */
    authorizer(req, res, next) {
        Logger.info('authorizing');
        let action = $CRUD[req.method] || null;
        this.authorize(req, action).then(data => {
            Logger.info('Authorized'); /** @todo Remove */
            next();
        }).catch(error => {
            Logger.warn('User is not authorized');
            next(error);
        });
    };
    /**
     * Core function to check if a user is authorized to perform a particular action on a particular resource.
     * The user must have an active session with permissions defining what the user has access to
     * @method
     * @param {object} req - Express request object.
     * @param {string} action - The action to be performed.
     * @returns {Promise} 
     */
    authorize(req, action) {
        return new Promise((resolve, reject) => {
            if (!$session.checkPermissions(req)) {
                Logger.warn(errMessages.noPermissions);
                reject(new UnauthorizedError(codes._45));
            }
            let permissions = $session.getPermissions(req);
            let payload = $session.getPayload(req);
            let permID = this.config.authorization.permissions;
            if (_.has(permissions, permID + '.' + action)) {
                if ($session.role === access.roles.super) {
                    Logger.info('Authorized as super admin'); /** @todo Remove */
                    resolve(true);
                }
                else if (permissions[permID][action] === access.all) {
                    Logger.info('All user authorized'); /** @todo Remove */
                    resolve(true)
                } else if (permissions[permID][action] === access.owner && (payload.sub == req.params.id)) {
                    Logger.info('Authorized as owner'); /** @todo Remove */
                    resolve(true);
                }
            } else {
                Logger.warn(errMessages.missingPathPerm);
            }
            reject(new UnauthorizedError(codes._45));
        });
    }

    /**
     * Checks if the user is authorised to create a resource
     * @param {object} - Express request object
     * @return {Promise<boolean|Error>}
     */
    authorizeCreate(req) {
        return this.authorize.apply(req, _CREATE);
    }

    /**
     * Checks if a user is authorized to read a resource.
     * @param {object} req -  Express request object.
     * @return {Promise<boolean|Error>}
     */
    authorizeRead(req) {
        return this.authorize.apply(req, _READ);
    }

    /**
     * Checks if a user is authorized to update a resource.
     * @param {object} req - Express request object
     * @return {Promise<boolean|Error>}
     */
    authorizeUpdate(req) {
        return this.authorize.apply(req, _UPDATE);
    }

    /**
     * Checks if a user is authorized to delete a resource.
     * @param {object} req - Express request object
     * @return {Promise<boolean|Error>}
     */
    authorizeDelete(req) {
        return this.authorize.apply(req, _DELETE);
    }

    /**
     * Checks if a user is authorized to patch a resource.
     * @param {object} req - Express request object
     * @return {Promise<boolean|Error>}
     */
    authorizePatch(req) {
        return this.authorize.apply(req, _PATCH);
    }
}

module.exports = {
    create: function (config) {
        return new Authorization(config);
    }
}