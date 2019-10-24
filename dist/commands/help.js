"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../structures/Command");
class Cmd extends Command_1.Command {
    constructor(bot) {
        super(bot, {
            name: "help",
            category: "Information",
            cooldown: 5000
        });
    }
    run(message, args) {
        message.reply("Yahee");
    }
}
exports.Cmd = Cmd;
;
