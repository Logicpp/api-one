/**
 * routes.factory.js
 *
 * @author Jonas Tomanga <celleb@logicpp.com.na>
 * @copyright (c) 2017 Logic Plus Information Technologies CC
 * @license MIT
 */
const Routes = require('./routes');
const authentication = require('../config/authentication');
const authorization = require('../config/authorization');
const Logger = require('../lib/logger');
RoutesFactory = function () {
    return {
        create: function (controller, config) {
            Logger.log('Creating controller');
            let auth = authorization ? authorization.create(config) : null;
            return Routes(controller, config, authentication, auth);
        }
    }
}
module.exports = RoutesFactory();
