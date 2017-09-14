/**
 * crud.js
 *
 * @author Jonas Tomanga <celleb@logicpp.com.na>
 * @copyright (c) 2017 Logic Plus Information Technologies CC
 * @license MIT
 */
// CRUD OPERATIONS
_CREATE = 'create';
_READ = 'read';
_UPDATE = 'update';
_DELETE = 'delete';
_PATCH = 'patch';
_CRUD = [_CREATE, _READ, _UPDATE, _DELETE, _PATCH];
$CRUD = {
    "GET": _READ,
    "POST": _CREATE,
    "PUT": _UPDATE,
    "DELETE": _DELETE,
    "PATCH": _PATCH
};