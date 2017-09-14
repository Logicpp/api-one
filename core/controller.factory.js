const Controller = require('./controller');
const Logger = require('../lib/logger');
const _ = require('lodash');
let ControllerFactory = function () {
    return {
        create: function (model) {
            Logger.log('Creating controller through Factory');
            Logger.log('Loading models');
            let Model = require("../models/" + model);
            return new Controller(Model);
        }
    }
}
module.exports = ControllerFactory();