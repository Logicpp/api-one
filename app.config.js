/**
 * app.config.js
 *
 * @author Jonas Tomanga <celleb@logicpp.com.na>
 * @copyright (c) 2017 Logic Plus Information Technologies CC
 * All rights reserved
 */
const firebaseCredentials = require('./private/servercity-aba6d-firebase-adminsdk-0t19o-7201a08351.json');
const credentials = require('./private/credentials');
const isDev = true;
const jwtOptions = {
    cookies: false
};
const dev = {
    production: false,
    log: true,
    db: {
        url: credentials.mongoUrl
    },
    jwtOptions,
    jwtSecret: credentials.jwtSecret,
    firebaseCredentials
};
const prod = {
    production: true,
    log: false,
    jwtOptions
};

module.exports = (function () {
    return isDev ? dev : prod;
})();