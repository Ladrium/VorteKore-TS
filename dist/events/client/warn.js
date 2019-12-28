"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../lib");
class default_1 extends lib_1.Event {
    constructor() {
        super("bot-warn", {
            category: "client",
            event: "warn"
        });
    }
    async run(error, bot = this.bot) {
        return bot.logger.warn(error);
    }
    ;
}
exports.default = default_1;