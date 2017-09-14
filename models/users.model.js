/**
 * Description users.model.js
 *
 * @author Jonas Tomanga <celleb@mrcelleb.com> 
 * @copyright (c) 2017 Jonas Tomanga 
 * All rights reserved 
 */

/**
 * Users model
 * @module models/users.model
 * @see module:lib/api.database
 */

const Model = require('../core/model');

/** User schema definitions */
const schema = {
    _id: { index: true, unique: true, type: String },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, required: true },
    mobileNumber: { type: String, unique: true },
    dateOfBirth: { type: Date },
    date: { type: Date, default: Date.now },
    type: { type: String, required: true },
    licenceNo: { type: String, default: null },
    idNo: { type: String, default: null },
    nationality: { type: String, default: null },
    status: { type: Number, default: 1 }
};

/** User dictionary */
const dictionary = {
    id: "_id",
    first_name: "firstName",
    last_name: "lastName",
    gender: "gender",
    mobile: "mobileNumber",
    dob: "dateOfBirth",
    date: "date",
    type: "type",
    licence: "licenceNo",
    idNo: "idNo",
    nationality: "nationality",
    status: "status"
};

const createExclude = ["date"];
const updateExclude = ["id", "date"];
const readExclude = [];
const model = Model.create('users', schema, dictionary, createExclude, updateExclude);
module.exports = model.getModel();