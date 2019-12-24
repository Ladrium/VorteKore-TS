"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./functions"));
String.prototype.trunc = function (n, useWordBoundary) {
    if (this.length <= n)
        return this;
    let subString = this.substr(0, n - 1);
    return (useWordBoundary ? subString.substr(0, subString.lastIndexOf(" ")) : subString) + "...";
};
String.prototype.ignoreCase = function (value) {
    return this.toLowerCase() === value.toLowerCase();
};
