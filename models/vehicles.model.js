/**
 * vehicles.model.js
 *
 * @author Jonas Tomanga <celleb@logicpp.com.na>
 * @copyright (c) 2017 Logic Plus Information Technologies CC
 * All rights reserved
 */
const Model = require('../core/model');
const schema = {
    _id: { index: true, unique: true, type: String },
    userID: { type: String },
    type: { type: String },
    make: { type: String },
    registrationNumber: { type: String },
    entryDate: { type: Date, default: Date.now }
};

const dictionary = {
    _id: "id",
    userID: "user_id",
    type: "type",
    make: "make",
    registration: "registration",
    entryDate: "entry_date"
};

const createExclude = ["entry_date", "id"];
const updateExclude = ["id", "entry_date", "user_id"];
const readExclude = [];

const model = Model.create('vehicles', schema, dictionary).enableAI();
module.exports = model.getModel();