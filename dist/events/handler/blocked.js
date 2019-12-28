"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../lib");
const ms = require("ms");
class CommandBlocked extends lib_1.Event {
    constructor() {
        super("command-blocked", {
            category: "Handler",
            event: "commandBlocked",
            emitter: "handler"
        });
    }
    async run(message, command, reason, cooldown) {
        switch (reason) {
            case "dev":
                message.sem("This command can only be used by developers :p", { type: "error" });
                break;
            case "guild":
                message.sem("Sorry my guy, this command can only be used in guilds :(", { type: "error" });
                break;
            case "dm":
                message.sem("Woah... this command can only be used in dms??!?!? weird fucking developers.", { type: "error" });
                break;
            case "cooldown":
                message.sem(`Sorry, you have ${ms(Date.now() - cooldown)} left on your cooldown :(`, { type: "error" });
                break;
            case "disabled":
                if (command.disabledMessage)
                    message.sem(command.disabledMessage);
                else
                    message.sem("Oh no... this command is disabled, you should come back later.", { type: "error" });
                break;
        }
    }
}
exports.default = CommandBlocked;
