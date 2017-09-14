/**
 * @author Jonas Tomanga <celleb@mrcelleb.com> 
 * @copyright (c) 2017 Jonas Tomanga 
 * All rights reserved 
 */
/**
 * Add routes and its handlers to the express app
 * @module routers
 * @version 1.0.0
 * @requires lodash external:lodash
 * @requires module:routers.factory
 * @requires module:controller.factory
 * @requires module:../api.config
 */
const api = require('../routes.config');
const ControllerFactory = require('./controller.factory');
const RoutesFactory = require('./routes.factory');
const Logger = require('../lib/logger');
const _ = require('lodash');
const jwt = require('jwt-express');
const config = require('../app.config');
/**
 * Creates a new Routers
 * @class
 * @property {object} app - Express app object
 */
function Routers() {
    /**
     * Adds a route handler
     * @member {function}
     * @param {string} route - The path to be added
     * @param {function} handler - Express router handler
     * @returns {object} - Returns this object
     */
    this.add = (route, handler) => {
        this.app.use(route, handler);
        return this;
    };
    /**
     * Adds multiple route handlers
     * @member {function}
     * @param {object} routes - Routes object
     * @returns {object} - Returns this object
     */
    this.addMany = (routes) => {
        routes.forEach(function (route) {
            if (route.model) {
                this.add(route.path, RoutesFactory.create(ControllerFactory.create(route.model), route));
            } else if (route.handler) {
                this.add(route.path, require("../custom-routes/" + route.handler));
            }
        }, this);
        return this;
    };
    /**
     * Adds the default routes defined in @see {@link ../app.config}
     * @member {function}
     * @param {object} [app] - Express object
     * @returns {object} - Returns this object
     */
    this.initialize = (app, tokens = true) => {
        if (app) {
            this.app = app;
            tokens ? this.app.use(jwt.init(config.jwtSecret, config.jwtOptions)) : void (null);
        }
        this.addMany(api.routes);
        return this;
    };
    /**
     * Sets the app property of this object, should
     * @member
     * @param {object} app - Express app object
     * @returns {object} - Returns this object
     */
    this.setApp = (app, tokens = true) => {
        this.app = app;
        tokens ? this.app.use(jwt.init(config.jwtSecret, config.jwtOptions)) : void (null);
        return this;
    }
}
module.exports = new Routers;