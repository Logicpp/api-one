/**
 * default-permissions.js
 *
 * @author Jonas Tomanga <celleb@logicpp.com.na>
 * @copyright (c) 2017 Logic Plus Information Technologies CC
 * All rights reserved
 */
const _ = require('lodash');
const access = require('./access');
const shared = {

    users: {
        create: access.create,
        read: access.owner,
        update: access.admin,
        delete: access.admin,
        patch: access.owner
    },
    odm: {
        create: access.create,
        read: access.owner,
        update: access.admin,
        delete: access.admin,
        patch: access.owner
    }
}
const driver = {

}

const passenger = {

}
module.exports = {
    default: shared,
    passenger: _.extend(passenger, shared),
    driver: _.extend(driver, shared)
};