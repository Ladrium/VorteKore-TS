"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    run(message, _c, reason, cooldown) {
        return __awaiter(this, void 0, void 0, function* () {
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
                    message.sem("Oh no... this command is disabled, you should come back later.", { type: "error" });
            }
        });
    }
}
exports.default = CommandBlocked;
