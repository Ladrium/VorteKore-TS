"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../lib/classes/Command");
class default_1 extends Command_1.Command {
    constructor() {
        super("setup", {
            category: "Moderation",
            cooldown: 200,
            usage: "!setup <toSetup>",
            example: "!setup prefix",
            disabled: true,
            disabledMessage: "Sorry, this command is getting rewritten... sorry"
        });
    }
    async run(message, args) {
    }
}
exports.default = default_1;
