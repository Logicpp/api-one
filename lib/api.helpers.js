/**
 * api.helpers.js
 *
 * @author Jonas Tomanga <celleb@logicpp.com.na>
 * @copyright (c) 2017 Logic Plus Information Technologies CC
 * @license MIT
 */
const _ = require('lodash');
const Logger = require('./logger');
module.exports = {
    map: function (data, dict) {
        Logger.info('Transformation'); /** @todo Remove */
        if (_.isEmpty(data)) {
            return Promise.resolve([]);
        }
        return new Promise((resolve, reject) => {
            let collection;
            if (_.isArray(data)) {
                collection = _.map(data, values => {
                    return this.mapper(dict, values)
                });
            } else {
                collection = this.mapper(dict, data);
            }
            Logger.info(collection); /** @todo Remove */
            resolve(collection);
        });
    },
    mapInverse: function (data, dict) {
        Logger.info('Reverse Transformation'); /** @todo Remove */
        if (_.isEmpty(data)) {
            return Promise.resolve(null);
        }
        return new Promise((resolve, reject) => {
            let collection;
            dict = _.invert(dict);
            if (_.isArray(data)) {
                collection = _.map(data, values => {
                    return this.mapper(dict, values)
                });
            } else {
                collection = this.mapper(dict, data);
            }

            Logger.info(collection); /** @todo Remove */
            resolve(collection);
        });
    },
    mapper: function (dict, values) {
        let map = {};
        for (key in values) {
            if (_.has(dict, key)) {
                map[dict[key]] = values[key];
            }
        }
        return map;
    },
    /** @todo Improve */
    /**
     * Aggregate keys that will have have to be returned by the database.
     * @param {object} dictionary - The dictionary that will be used to translate to database keys.
     * @param {object} keys - The keys to be translated and included.
     * @param {object} includes - The object currently holding the keys to be included.
     * @return {object}
     */
    include: (dictionary, keys, includes = {}) => {
        _.each(keys, val => {
            (dictionary[val]) ? includes[dictionary[val]] = 1 : void (null);
        });
        return includes;
    },
    /**
     * Aggregates keys that have to be populated by the database.
     * @param {object} dictionary - The dictionary that is used to translate to database keys
     * @param {object} keys - The keys to be translated and populated
     * @return {object}
     */
    populate: (dictionary, keys) => {
        let population = [];
        _.each(keys, val => {
            (dictionary[val]) ? population.push(dictionary[val]) : void (null);
        });
        return population;
    },
    /**
   * Aggregate keys that will not have to be returned by the database.
   * @param {object} dictionary - The dictionary that will be used to translate to database keys.
   * @param {object} keys - The keys to be translated and excluded.
   * @param {object} excludes - The object currently holding the keys to be excluded.
   * @return {object}
   */
    exclude: (dictionary, keys, excludes = {}) => {
        _.each(keys, val => {
            (dictionary[val]) ? excludes[dictionary[val]] = 0 : void (null);
        });
        return excludes;
    },
    /**
     * Aggregates database group aggregation
     * @param {object} dictionary - The dictionary that will be used to translate to database keys.
     * @param {object} keys - The keys to translated and grouped.
     * @param {string} agg - The type of aggregation
     * @param {object}  group - The object currently holding the aggregates.
     */
    group: (dictionary, keys, agg, group = {}) => {
        _.each(keys, val => {
            if (dictionary[val]) {
                group[val] = {};
                group[val][agg] = dictionary[val];
            }
        });
        return group;
    },
    /**
     * Match query with multiple values
     * @param {object} dictionary - The dictionary that will be used to translate to database keys
     * @param {object} keys - The keys to be translated and matched
     * @param {string} id - The field to match
     * @param {object} match - THe object currrently holding the match values.
     */
    matchArray: (dictionary, keys, id, match = {}) => {
        // let group = {};
        console.log(match);
        _.each(keys, (val, key) => {
            (dictionary[key] && val) ? match[id + "." + [dictionary[key]]] = val : void (null);
        });
        return match;
    },
    split: (values, seperator = ',') => {
        let sperator = "/\s*" + seperator + "\s*/";
        let regex = new RegExp(seperator);
        return values.split(regex);
    },
    match: function (dictionary, match, schema) {
        return new Promise((resolve, reject) => {
            let queries = {}; // initialize query holder
            values = this.split(match, ';');
            _.each(values, val => {
                let query = {};
                if (val.search(">=") > 0) {
                    query = this.greaterOrEqual(val, schema);
                } else if (val.search("<=") > 0) {
                    query = lessOrEqual(val, schema);
                } else if (val.search("!=") > 0) {
                    query = this.notEqual(val, schema);
                } else if (val.search("<>") > 0) {
                    query = this.lessOrGreater(val, schema);
                } else if (val.search("=") > 0) {
                    query = this.toEqual(val);
                } else if (val.search(">") > 0) {
                    query = this.greater(val, schema);
                } else if (val.search("<") > 0) {
                    query = this.lesser(val, schema);
                }
                if (!_.isEmpty(query)) {
                    _.merge(queries, query);
                }
            });
            /* translate to database keys */
            this.map(queries, dictionary).then(data => {
                resolve(data);
            }).catch(data => {
                reject(data);
            });
        });
    },
    extract: function (string, seperator) {
        let point = string.search(seperator);
        let key = string.substring(0, point);
        let value = string.substring(point + seperator.length);
        return [key.trim(), value.trim()];
    },
    groupByOperators: function (dictionary, key, operators) {
        let group = {};
        if (_.has(dictionary, key)) {
            _.each(operators, val => {
                if (!_.has(dictn.operators, val)) {
                    return;
                }
                group[val] = {};
                group[val]['$' + val] = '$' + dictionary[key];
            });
            if (!_.isEmpty(group)) {
                group['_id'] = key
            }
        }
        return group;
    },
    typify: function (value, key, schema) {
        if (_.isArray(value)) {
            feedback = [];
            _.each(value, val => {
                feedback.push(this.typify(val, key, schema));
            });
            return feedback;
        }
        if (_.has(schema, key)) {
            switch (schema.type) {
                case String:
                    return +value;
                case Date:
                    return new Date(value);
                default:
                    return value;
            }
        }
        return value;
    },
    /**
     * Converts a value to the relevant type base on the key
     * @member
     * @param {string|string[]} value - A string or array with the values to be converted
     * @param {string} key - The key to used as reference to convert
     * @return {string|string[]}
     */
    typify_: function (value, key = null) {
        if (_.isArray(value)) {
            feedback = [];
            _.each(value, val => {
                feedback.push(this.typify_(val, key));
            });
            return feedback;
        }
        if (key && key === 'date') {
            return new Date(value);
        }
        if (_.indexOf(dictn.numbers, key) > -1) {
            return +value;
        }
        return value;
    },
    /** operations convert functions */
    /**
     * Converts the equal sign operator into the equal sign for the Database and assigns the appropriate fields and values
     * @member
     * @param {string}  val
     * @return {object}
     */
    toEqual: function (val, schema) {
        let [key, value] = this.extract(val, "=");
        let query = {};
        if (val.search(',') > 0) {
            query[key] = { $in: this.typify(this.split(value), key, schema) };
        } else {
            query[key] = this.typify(value, key, schema);
        }
        return query;
    },
    notEqual: function (val, schema) {
        let query = {};
        let [key, value] = this.extract(val, "!=");
        if (val.search(',') > 0) {
            query[key] = { $nin: this.typify(this.split(value), key, schema) };
        } else {
            query[key] = { $ne: this.typify(value, key, schema) };
        }
        return query;
    },
    greaterOrEqual: function (val, schema) {
        let query = {};
        let [key, value] = this.extract(val, ">=");
        query[key] = { $gte: this.typify(value, key, schema) };
        return query;
    },
    lessOrEqual: function (val, schema) {
        let [key, value] = this.extract(val, "<=");
        query[key] = { $lte: this.typify(value, key, schema) };
    },
    lessOrGreater: function (val, schema) {
        let query = {};
        let [key, value] = this.extract(val, "<>");
        [first, last] = this.split(value)
        query[key] = { $gt: this.typify(first, key, schema), $lt: this.typify(last, key, schema) };
        return query;
    },
    greater: function (val, schema) {
        let query = {};
        let [key, value] = this.extract(val, ">");
        query[key] = { $gt: this.typify(value, key, schema) };
        return query;
    },
    lesser: function (val, schema) {
        let query = {};
        let [key, value] = this.extract(val, "<");
        query[key] = { $lt: this.typify(value, key, schema) };
        return query;
    }

}