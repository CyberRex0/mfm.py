Array.prototype.flat = function (maxDepth, currentDepth) {
    "use strict";
    var array = this;
    maxDepth = maxDepth === Infinity
        ? Number.MAX_SAFE_INTEGER
        : parseInt(maxDepth, 10) || 1;
    currentDepth = parseInt(currentDepth, 10) || 0;
    if (!Array.isArray(array) || !array.length) {
        return array;
    }
    var firstElemFlattened = (Array.isArray(array[0]) && currentDepth < maxDepth)
        ? array[0].flat(maxDepth, currentDepth + 1)
        : array[0] === undefined ? [] : [array[0]];

    return firstElemFlattened.concat(array.slice(1).flat(maxDepth, currentDepth));
};
mfm = require('./index');