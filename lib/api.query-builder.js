/**
 * api.query-builder.js
 *
 * @author Jonas Tomanga <celleb@logicpp.com.na>
 * @copyright (c) 2017 Logic Plus Information Technologies CC
 * @license MIT
 */

const _ = require('lodash');
const Logger = require('./logger');
const helpers = require('./api.helpers');
const iterators = require('./iterators.utilities');
class QueryBuilder {
    constructor() {
        this.defaults = this.defaults.bind(this);
        this.buildQuery = this.buildQuery.bind(this);
        this.defaultQuery = this.defaultQuery.bind(this);
        this.enqueue = this.enqueue.bind(this);
        this.defaults();
        this.build = this.build.bind(this);
        this.match = this.match.bind(this);
        this.sort = this.sort.bind(this);
        this.limit = this.limit.bind(this);
        this.projection = this.projection.bind(this);
        this.skip = this.skip.bind(this);
        this.schema = null;
        this.dictionary = null;
    }

    defaults() {
        this.pipeline = [];
        this._pipeline = {};
        this.fail = false;
    }

    build(query) {
        return new Promise((resolve, reject) => {
            let promises = [];
            let keys = Object.keys(query);
            keys.forEach(key => {
                Logger.info(key); /** @todo Remove */
                this.enqueue(promises, query, key);
            });
            Logger.info(promises); /** @todo Remove */
            Promise.all(promises).then(data => {
                Object.keys(this._pipeline).forEach(key => {
                    this.pipeline.push(this._pipeline[key]);
                });
                resolve();
            }).catch(error => {
                Logger.warn(error);
                reject(error);
            });
        });
    }
    enqueue(promises, query, key) {
        switch (key) {
            case 'limit':
                this._pipeline['limit'] = null;
                promises.push(this.limit(query));
                break;
            case 'match':
                this._pipeline['match'] = null;
                promises.push(this.match(query));
                break;
            case 'sort':
                this._pipeline['sort'] = null;
                promises.push(this.sort(query));
                break;
            case 'projection':
                this._pipeline['project'] = null;
                promises.push(this.projection(query));
                break;
            case 'skip':
                this._pipeline['skip'] = null;
                promises.push(this.skip(query));
                break;
        }
    }
    buildQuery(req) {
        this.defaults();
        return new Promise((resolve, reject) => {
            if (_.isEmpty(req.query)) {
                this.defaultQuery();
                resolve(this.pipeline);
                return;
            } else {
                this.build(req.query, iterators.object(req.query)).then(() => {
                    if (_.isEmpty(this.pipeline)) {
                        this.defaultQuery();
                    }
                    resolve(this.pipeline);
                });
            }
        });
    }

    defaultQuery() {
        this.pipeline = [{ $match: {} }];
    }

    match(query) {
        Logger.info('Matching'); /** @todo Remove */
        return new Promise((resolve, reject) => {
            if (_.isEmpty(query.match)) {
                this._pipeline.match = { $match: {} };
                resolve(true);
                return;
            }
            helpers.match(this.dictionary, query.match, this.schema).then(data => {
                if (_.isEmpty(data)) {
                    this._pipeline.match = { $match: {} };
                } else {
                    this._pipeline.match = { $match: data };
                }
                resolve(true);
            }).catch(error => {
                Logger.warn(error);
                this._pipeline.match = { $match: {} };
                if (this.fail) {
                    reject(error);
                } else {
                    resolve(true);
                }
            });
        });
    }

    limit(query) {
        Logger.info('Auto Limiting'); /** @todo Remove */
        return new Promise((resolve, reject) => {
            if (!_.isEmpty(query.limit)) {
                this._pipeline.limit = { $limit: +query.limit };
            }
            resolve(true);
        });
    }

    sort(query) {
        Logger.info('Auto sorting'); /** @todo Remove */
        return new Promise((resolve, reject) => {
            if (!_.isEmpty(query.sort)) {
                resolve(true);
                return;
            }

            let [key, value] = helpers.split(query.sort, "=");
            if (_.has(this.dictionary, key)) {
                this._pipeline.sort = { $sort: { [key]: +value } };

            } else {
                this._pipeline.sort = { $sort: { _id: 1 } };
            }
            resolve(true);
        });
    }

    skip(query) {
        Logger.info('Skipping...'); /** @todo Remove */
        if (!_.isEmpty(query.skip)) {
            this._pipeline.skip = { $skip: +query.skip };
        }
        return Promise.resolve(true);
    }

    projection(query) {
        Logger.info('Projection...'); /** @todo Remove */
        let projection = {};
        return new Promise((resolve, reject) => {
            if (!_.isEmpty(query.include)) {
                let values = helpers.split(query.include);
                _.each(values, value => {
                    projection[value] = 1;
                });
            }

            if (!_.isEmpty(query.exclude)) {
                let values = helpers.split(query.exclude);
                _.each(values, value => {
                    projection[value] = 0;
                });
            }
            if (!_.isEmpty(projection)) {
                this._pipeline.project = { $project: projection };
            }
            resolve(true);
        });
    }

    populate(query) {
        Logger.info('Populating...'); /** @todo Remove */
    }
}
module.exports = {
    create: (schema, dictionary) => {
        let queryBuilder = new QueryBuilder();
        queryBuilder.dictionary = dictionary;
        queryBuilder.schema = schema;
        return queryBuilder;
    }
};