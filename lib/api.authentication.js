/**
 * Description api.authentication.js
 *
 * @author Jonas Tomanga <celleb@mrcelleb.com> 
 * @copyright (c) 2017 Jonas Tomanga 
 * @license MIT
 */
/**
 * This module is responsible for handling authentications concerns only.
 * This module uses Firebase Authentication Admin Library.
 */
const Logger = require('../lib/logger');
const admin = require('firebase-admin');
const config = require('../app.config');
const codes = require('../config/status-codes');
const UnauthenticatedError = require('../lib/errors/unauthenticated.error');
const _ = require('lodash');

// initializing firebase admin
try {
    Logger.info('Initializing Firebase Admin'); /** @todo Remove */
    admin.initializeApp({ credential: admin.credential.cert(config.firebaseCredentials) });
} catch (error) {
    Logger.warn(error);
}
/**
 * This methods authenticates a user using the Firebase Authentication Admin Library.
 * If the user is successfully authenticated the express next function is called to forwarding the request to the relevant handler.
 * If the user is not authenticated an express response is sent back with a 401 header.
 * @param {object} req - Express request object. 
 * @param {object} res - Express response object.
 * @param {Function} next - Express next function
 */
function authentication(req, res, next) {
    Logger.info('Authenticating'); /** @todo Remove */
    let token = null;
    let apiToken = false;
    if (req.jwt && req.jwt.payload.firebaseToken) {
        token = req.jwt.payload.firebaseToken;
        apiToken = true;
        next();
        return;
    } else {
        token = (req.jwt && req.jwt.token) ? req.jwt.token : null;
    }
    if (!token) {
        next(new UnauthenticatedError(codes._40));
        return;
    }
    if (_.isString(token)) {
        admin.auth().verifyIdToken(token).then(info => {
            Logger.info('User authenticated'); /** @todo Remove */
            next();
            return;
        }).catch(error => {
            Logger.warn('Firebase failed to authenticate token');
            next(new UnauthenticatedError(codes._41));
            return;
        });
    } else {
        next(new UnauthenticatedError(codes._42));
        return;
    }

}
module.exports = authentication;