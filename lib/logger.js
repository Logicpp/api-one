/**
 * logger.js
 *
 * @author Jonas Tomanga <celleb@logicpp.com.na>
 * @copyright (c) 2017 Logic Plus Information Technologies CC
 * @license MIT
 */
const config = require('../app.config');
class Logger {
    static log(error) {
        if (config.log) {
            console.log(error);
        }
    }

    static warn(warning) {
        if (config.log) {
            console.warn(warning);
        }
    }

    static info(info) {
        if (config.log) {
            console.info(info);
        }
    }

    static error(error) {
        if (config.log) {
            console.error(error);
        }
    }
}
module.exports = Logger;