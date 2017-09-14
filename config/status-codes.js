/**
 * error-codes.js
 *
 * @author Jonas Tomanga <celleb@logicpp.com.na>
 * @copyright (c) 2017 Logic Plus Information Technologies CC
 * @license MIT
 */
/**
 * Declare and defines the status codes and their friendly messages.
 * They are bundle here together to have a central place and make it easier to document.
 */
const statusCodes = {
    _40: {
        message: 'User could not be authenticated, no token provided.',
        code: 40
    },
    _41: {
        message: 'User could not be authenticated, invalid token.',
        code: 41
    },
    _42: {
        message: 'User could not be authenticated, unexpected token type.',
        code: 42
    },
    _43: {
        message: 'User could no be authorized, authorization for user does not exist.',
        code: 43
    },
    _44: {
        message: 'User could not be authorized, permissions missing.',
        code: 44
    },
    _45: {
        message: 'User is not authorized to perform this action.',
        code: 45
    },
    _48: {
        message: 'Action could not be completed, due to database duplicate constraints.',
        code: 49
    },
    _51: {
        message: 'Action could not be completed, database failure.',
        code: 51
    },
    _55: {
        message: 'User could not be authorized, server error',
        code: 55
    },
    _56: {
        message: 'Action reversed, all necessary steps could not complete successfully.',
        code: 56
    }
}
module.exports = statusCodes;