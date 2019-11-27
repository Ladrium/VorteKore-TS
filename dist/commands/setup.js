"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../structures/Command");
class Cmd extends Command_1.Command {
    constructor(bot) {
        super(bot, {
            name: "setup",
            category: "Moderation",
            cooldown: 200
        });
    }
    run(message, args, guild) {
    }
}
exports.Cmd = Cmd;
