"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../lib/classes/Command");
class default_1 extends Command_1.Command {
    constructor() {
        super("role", {
            category: "Moderation",
            usage: "!role <add|remove> @member role",
            example: "!role remove @Chaos_Phoe#0001 Contributor",
            channel: "guild",
            disabled: true
        });
    }
    async run(message, args) {
    }
}
exports.default = default_1;
;
