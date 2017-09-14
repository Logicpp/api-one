/**
 * Access control constants
 * Defines the constants for setting and checking resource access permissions.
 *
 * @author Jonas Tomanga <celleb@logicpp.com.na>
 * @copyright (c) 2017 Logic Plus Information Technologies CC
 * All rights reserved
 */
const access = {
    owner: 1,
    all: 3,
    admin: 4,
    none: 0,
    create: true,
    roles: {
        admin: 1,
        super: 0,
        standard: -1
    },
    users: {
        passenger: 1,
        driver: 2,
        none: 0
    }
}
module.exports = access;