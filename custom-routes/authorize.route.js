/**
 * authorize.route.js
 *
 * @author Jonas Tomanga <celleb@logicpp.com.na>
 * @copyright (c) 2017 Logic Plus Information Technologies CC
 * All rights reserved
 */
const _ = require('lodash');
const express = require('express');
const jwt = require('jwt-express');
const Logger = require('../lib/logger');
const access = require('../config/access');
const codes = require('../config/status-codes');
const responder = require('../config/responder');
const Controller = require('../core/controller.factory');
const authentication = require('../config/authentication');
const NotFoundError = require('../lib/errors/not-found.error');
const errMessages = require('../config/error-messages.config');
const permissions = require('../config/default-permissions');
//require('../config/crud');
const router = express.Router();
const controller = Controller.create("authorization.model");
const userController = Controller.create("users.model");
router.all('*', authentication);
router.get('/', function (req, res, next) {
    controller.getOne(req.jwt.payload.sub).then(user => {
        if (_.isEmpty(user)) {
            Logger.warn(errMessages.noAuthorizationFound);
            next(new NotFoundError(code._43));
        }
        if (user.permissions) {
            Logger.info('Signing'); /** @todo Remove */
            let token = res.jwt(_.extend(req.jwt.payload, {
                permissions: user.permissions,
                firebaseToken: req.jwt.token
            }));
            res.status(200).json({ token: token.token }).end();
        } else {
            Logger.warn(errMessages.noPermissionsFound);
            next(new NotFoundError(code._43));
        }
    }).catch(error => {
        next(error);
    });
}).post('/', function (req, res, next) {
    let step = 0; // transaction step counter
    let user = {};
    userController.create(req).then((data) => {
        let perm = {};
        user = data;
        let _req = _.clone(req);
        switch (req.body.type) {
            case 'driver':
                perm = permissions.driver;
                _req.body.type = access.users.driver;
                break;
            case 'passenger': {
                perm = permissions.passenger;
                _req.body.type = access.users.passenger;
            }
            default:
                return Promise.reject(new Error('Type is missing'));
                break;
        }
        _req.body.permissions = perm;
        step = 1;
        return controller.create(_req);
    }).catch(error => {
        // Transaction failure
        Logger.info('Transaction failed ' + step); /** @todo Remove */
        if (step === 1) {
            return userController.rollback(req.body.id).then(next(error));
        } else {
            return Promise.reject(error);
        }
    }).then(auth => {
        responder.json(req, res, _.extend(user, { auth: auth }));
    }).catch((error) => {
        Logger.warn('Authorization failed.');
        next(error);
    });
});
module.exports = router;