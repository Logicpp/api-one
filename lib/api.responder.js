/**
 *API Responder
 *
 * @author Jonas Tomanga <celleb@logicpp.com.na>
 * @copyright (c) 2017 Logic Plus Information Technologies CC
 * @license MIT
 */
const Logger = require('./logger');
/**
 * Feedback handler for the api. If a request comes in with a suppress query parameter set to true,
 * the api will return no content to the client.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {object} feed - JSON feedback
 * @param {number} status - HTTP status code when there is content.
 * @param {number} emptyStatus - HTTP status when content is to be supressed.
 */
const json = function (req, res, feed = {}, status = 200, emptyStatus = 201) {
    Logger.info('JSON Feedback'); /** @todo Remove */
    if (req.method === 'GET' && feed === null) {
        res.status(404).json({
            code: 404,
            message: 'Item(s) you are looking for could not be found.'
        }).end();
    }
    else if (req.query && req.query.supress === 'true') {
        res.status(emptyStatus).end();
    } else {
        res.status(status).json(feed).end();
    }
}

module.exports = {
    json: json
};