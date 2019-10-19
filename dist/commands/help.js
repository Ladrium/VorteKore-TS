"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../structures/Command");
class Help extends Command_1.Command {
    constructor(bot) {
        super(bot, {
            name: "help",
            category: "Information",
            cooldown: 5000
        });
    }
}
exports.Help = Help;
;
