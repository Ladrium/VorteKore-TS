"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../lib");
class default_1 extends lib_1.Event {
    constructor() {
        super("andesite-error", {
            category: "client",
            event: "error",
            emitter: "andesite"
        });
    }
    async run(name, error, bot = this.bot) {
        return bot.logger.warn(error, name);
    }
    ;
}
exports.default = default_1;
