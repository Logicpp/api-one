/**
 * Base Controller Functionality
 *
 * @author Jonas Tomanga <celleb@mrcelleb.com> 
 * @copyright (c) 2017 Jonas Tomanga 
 * All rights reserved 
 */
const _ = require('lodash');
let Promise = require('bluebird');
const Logger = require('../lib/logger');
const helpers = require('../lib/api.helpers');
const QueryBuilder = require('../lib/api.query-builder');
let prototype = {
    getAll: function (req) {
        return this.queryBuilder.buildQuery(req).then(pipeline => {
            Logger.info('Pipeline'); /** @todo Remove */
            Logger.info(pipeline); /** @todo Remove */
            return this.model.aggregate(pipeline).then(this.translate);
        });
    },
    create: function (req) {
        return this.reverse(req.body, this.createExclude).then(data => {
            return this.model.create(data).then(this.translate);
        });
    },
    delete: function (id) {
        return this.model.findOneAndRemove({ _id: id }).then(this.translate);
    },
    update: function (req) {
        return this.reverse(req.body, this.createExclude).then(data => {
            return this.model.findOneAndUpdate({ _id: req.params.id }, data).then(this.translate);
        });
    },
    patch: function (req) {
        return this.reverse(req.body, this.updateExclude).then(data => {
            return this.model.findOneAndUpdate({ _id: req.params.id }, data).then(this.translate);
        });
    },
    getOne: function (id) {
        return this.model.findOne({ _id: id }).then(this.translate);
    },
    rollback: function (id, data = null, insert = false) {
        Logger.info('Rolling back...'); /** @todo Remove */
        if (data && insert === true) {
            return this.reverse(data, this.createExclude).then(data => {
                return this.model.create(data);
            });
        } else if (data) {
            return this.reverse(data, this.createExclude).then(data => {
                return this.model.findOneAndUpdate({ _id: id }, data);
            });
        } else {
            return this.model.findOneAndRemove({ _id: id });
        }
    }
    /** @todo search api */
}
function Controller(model) {
    this.model = model.model;
    this.dictionary = model.dictionary;
    this.updateExclude = model.updateExclude;
    this.createExclude = model.createExclude;
    this.readExclude = model.readExclude;
    this.queryBuilder = QueryBuilder.create(model.Schema, model.dictionary);
    /**
     * Wrapper to translate data from database keys to api keys.
     * @param {object} - The data coming from the database to be translated.
     * @return {Promise}
     */
    this.translate = (data) => {
        Logger.info('Translating...'); /** @todo Remove */
        return helpers.mapInverse(data, this.dictionary);
    }

    /**
     * Wrapper to reverse data keys from api keys to database keys.
     * @param {object} data - The data coming from the api.
     * @param {array} exclude - The keys to be excluded from translation and from propagating to database.
     * @return {Promise}
     */
    this.reverse = (data, exclude = []) => {
        Logger.info('Reversing...'); /** @todo Remove */
        return helpers.map(_.omit(data, exclude), this.dictionary);
    }
};
Controller.prototype = prototype;
module.exports = Controller;


