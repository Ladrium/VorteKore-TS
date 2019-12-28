"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../lib");
class default_1 extends lib_1.Command {
    constructor() {
        super("invite", {
            category: "Information",
            cooldown: 0
        });
    }
    async run(message) {
        message.sem("Use this link to invite the bot: <http://bit.ly/2EmfskO>");
    }
}
exports.default = default_1;
