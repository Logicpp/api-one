/**
 * iterators.utilities.js
 *
 * @author Jonas Tomanga <celleb@logicpp.com.na>
 * @copyright (c) 2017 Logic Plus Information Technologies CC
 * @license MIT
 */
function objectIterator(obj) {
    index = 0;
    keys = Object.keys(obj);
    values = Object.values(obj);
    return {
        next: function () {
            i = index++;
            return i < values.length ?
                { value: { key: keys[i], value: values[i] }, done: false } : { done: true };
        }
    };
}

module.exports = {
    object: (obj) => {
        return objectIterator(obj);
    }
}