/**
 * authorization.model.js
 *
 * @author Jonas Tomanga <celleb@logicpp.com.na>
 * @copyright (c) 2017 Logic Plus Information Technologies CC
 * @license MIT
 */
const Model = require('../core/model');
const access = require('../config/access');
const permissions = require('../config/default-permissions');
const schema = {
    _id: { index: true, unique: true, type: String },
    permissions: { type: Object, required: true, default: permissions.default },
    role: { type: Number, required: true, default: access.roles.standard },
    type: { type: Number, required: true, default: access.users.none },
    entryDate: { type: Date, default: Date.now }
};

const dictionary = {
    id: "_id",
    permissions: "permissions",
    role: "role",
    type: "type",
    entry_date: "entryDate"
};

const createExclude = ["entry_date"];
const updateExclude = ["id", "entry_date"];
const readExclude = [];

const model = Model.create('authorization', schema, dictionary);
module.exports = model.getModel();