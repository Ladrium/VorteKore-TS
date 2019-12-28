"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../lib");
class default_1 extends lib_1.Command {
    constructor() {
        super("welcomechannel", {
            description: "Manages the welcome channel.",
            usage: "[#channel|channelId]",
            channel: "guild",
            userPermissions: ["MANAGE_GUILD"],
            category: "Settings",
            disabled: true
        });
    }
    async run(message, [prefix]) { }
}
exports.default = default_1;
