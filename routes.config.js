/**
 * routes.config.js
 *
 * @author Jonas Tomanga <celleb@logicpp.com.na>
 * @copyright (c) 2017 Logic Plus Information Technologies CC
 * @license MIT
 */
require('./config/access');
require('./config/crud');
module.exports = {
    routes: [
        {
            path: "/users",
            model: "users.model",
            authentication: true,
            methods: [_CREATE, _READ, _PATCH],
            multi: true,
            authorization: {
                permissions: 'users',
                rules: {
                    delete: true,
                    patch: true
                },
                conditions: {
                    create: {
                        body: {

                        },
                        params: {

                        },
                        query: {

                        },
                        header: {

                        }
                    }
                }
            }
        },
        {
            path: "/odm",
            model: "odm.model",
            methods: [_CREATE, _READ, _UPDATE, _DELETE]
        }, {
            path: "/authorize",
            handler: "authorize.route"
        }
    ],
    preOps: [],
    postOps: []
}