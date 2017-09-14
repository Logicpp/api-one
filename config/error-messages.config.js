/**
 * error-messages.config.js
 *
 * @author Jonas Tomanga <celleb@logicpp.com.na>
 * @copyright (c) 2017 Logic Plus Information Technologies CC
 * All rights reserved
 */
/** Default error messages for logging and error handling */
errorMessages = {
    validation: "Action could not be completed due to validation.",
    serverError: "Something unexpected happened, please contact admininstrator.",
    unauthorized: "User is not authorized to perform this action.",
    unauthentication: "User is not authenticated, no authentication provided or invalid credentials",
    noPermissions: "No permissions has been set for this user or session.",
    missingPathPerm: "No permissions has been set for this path for this user.",
    notFound: "The requested resource could not be found.",
    noAuthorizationFound: "No authorization record found for this user",
    noPermissionsFound: "Authorization exist but no permissions have been defined for this user.",
    entryConflict: "This entry conflicts with an existing entry, possible duplication."
}

module.exports = errorMessages;