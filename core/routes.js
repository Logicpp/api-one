/**
 * routes.js
 *
 * @author Jonas Tomanga <celleb@logicpp.com.na>
 * @copyright (c) 2017 Logic Plus Information Technologies CC
 * @license MIT
 */
require('../config/crud');
const _ = require('lodash');
const express = require('express');
const Logger = require('../lib/logger');
const responder = require('../lib/api.responder');
let Routes = function (controller, config, authentication, authorization) {
    /** sub operations */
    this.router = express.Router();
    if (!config.methods) {
        Logger.warn('No methods defined');
        return this.router;
    }
    /** Authentication middleware */
    if (config.authentication === true || _.has(config.authentication, _CRUD)) {
        this.router.use(authentication);
    } else if (_.isObject(config.authentication)) {
        _.each(config.authentication, (paths, action) => {
            switch (action) {
                case _CREATE:
                    this.router.post(paths, authentication);
                    break;
                case _READ:
                    this.router.get(paths, authentication);
                    break;
                case _UPDATE:
                    this.router.put(paths, authentication);
                    break;
                case _DELETE:
                    this.router.delete(paths, authentication);
                    break;
                case _PATCH:
                    this.router.patch(paths, authentication);
            }
        });
    }
    /** Authorization middleware */
    if (authorization && (config.authorization === true || _.has(config.authorization, _CRUD))) {
        Logger.info('Adding authorization to all'); /** @todo Remove */
        this.router.all('/*', authorization.authorizer);
    } else if (authorization && _.isObject(config.authorization) && _.isObject(config.authorization.rules)) {
        Logger.info('Adding authorization per path.'); /** @todo Remove */
        _.each(config.authorization.rules, (paths, action) => {
            Logger.info(action); /** @todo Remove */
            switch (action) {
                case _CREATE:
                    this.router.post('/*', authorization.authorizer);
                    break;
                case _READ:
                    this.router.get(['/:id', '/'], authorization.authorizer);
                    break;
                case _UPDATE:
                    this.router.put(['/:id'], authorization.authorizer);
                    break;
                case _DELETE:
                    this.router.delete(['/:id'], authorization.authorizer);
                    break;
                case _PATCH:
                    this.router.patch(['/:id'], authorization.authorizer);
                    break;
            }
        });
    }

    _.each(config.methods, method => {
        switch (method) {
            case _CREATE:
                Logger.info('Adding post support'); /** @todo Remove */
                this.router.post('/', function (req, res, next) {
                    controller.create(req).then((doc) => {
                        res.status(200).json(doc);
                    }).catch((error) => {
                        next(error);
                    });
                });
                break;
            case _READ:
                Logger.info('Adding read support'); /** @todo Remove */
                this.router.get('/:id', function (req, res, next) {
                    Logger.info('Getting one'); /** @todo Remove */
                    controller.getOne(req.params.id).then((doc) => {
                        responder.json(req, res, doc);
                    }).catch((error) => {
                        next(error);
                    });
                }).get('/', function (req, res, next) {
                    controller.getAll(req).then((doc) => {
                        responder.json(req, res, doc);
                    }).catch((error) => {
                        next(error)
                    });
                });
                break;
            case _UPDATE:
                Logger.info('Adding update support'); /** @todo Remove */
                this.router.put('/:id', function (req, res, next) {
                    controller.update(req).then((doc) => {
                        res.status(200).json(doc);
                    }).catch((error) => {
                        next(error)
                    });
                });
                break;
            case _DELETE:
                Logger.info('Adding delete support'); /** @todo Remove */
                this.router.delete('/:id', function (req, res, next) {
                    controller.delete(req.params.id).then((doc) => {
                        res.status(200).json(doc);
                    }).catch((error) => {
                        next(error)
                    });
                });
                break;
            case _PATCH:
                Logger.info('Adding delete support'); /** @todo Remove */
                this.router.patch('/:id', function (req, res, next) {
                    controller.patch(req).then((doc) => {
                        res.status(200).json(doc);
                    }).catch((error) => {
                        next(error)
                    });
                });
                break;
        }
    });
    return this.router;
}
module.exports = Routes;