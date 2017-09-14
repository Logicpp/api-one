/**
 * HTTP STATUS CODES CONSTANTS
 *
 * @author Jonas Tomanga <celleb@logicpp.com.na>
 * @copyright (c) 2017 Logic Plus Information Technologies CC
 * @license MIT
 */

/** HTTP status codes constants to be used for the api responses */
_OK = 200;
_CREATED = 201;
_ACCEPTED = 202;
_NOT_CONTENT = 204;
_BAD_REQUEST = 400;
_UNAUTHORIZED = 401;
_PAYMENT_REQUIRED = 402;
_FORBIDDEN = 403;
_NOT_FOUND = 404;
_NOT_ACCEPTABLE = 406;
_REQUEST_TIMEOUT = 408;
_CONFLICT = 409;
_UNSUPPORTED_MEDIA_TYPE = 415;
_RANGE_NOT_SATISFIABLE = 416;
_UNPROCESSABLE_ENTITY = 422;
_LOCKED = 423;
_FAILED_DEPENDANCY = 424;
_INTERNAL_SERVER_ERROR = 500;
_NOT_IMPLEMENTED = 501;
_BAD_GATEWAY = 502;

/** HTTP status codes constants object */
const _CODES = {
    _OK,
    _CREATED,
    _ACCEPTED,
    _NOT_CONTENT,
    _BAD_REQUEST,
    _UNAUTHORIZED,
    _PAYMENT_REQUIRED,
    _FORBIDDEN,
    _NOT_FOUND,
    _NOT_ACCEPTABLE,
    _REQUEST_TIMEOUT,
    _CONFLICT,
    _UNSUPPORTED_MEDIA_TYPE,
    _RANGE_NOT_SATISFIABLE,
    _UNPROCESSABLE_ENTITY,
    _LOCKED,
    _FAILED_DEPENDANCY,
    _INTERNAL_SERVER_ERROR,
    _NOT_IMPLEMENTED,
    _BAD_GATEWAY
};
module.exports = _CODES;