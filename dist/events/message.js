"use strict";
const prefix = "!";
module.exports = (bot, message) => {
    bot.handler.runCommand(message, prefix);
};
