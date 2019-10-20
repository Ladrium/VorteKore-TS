"use strict";
const handler = require("..");
const prefix = "!";
module.exports = (bot, message) => {
    handler.runCommand(message, prefix);
};
