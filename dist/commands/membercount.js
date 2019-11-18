"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../structures/Command");
const VorteEmbed_1 = __importDefault(require("../structures/VorteEmbed"));
class Cmd extends Command_1.Command {
    constructor(bot) {
        super(bot, {
            name: "si",
            category: "Utility",
            cooldown: 5000,
            aliases: ["serverinfo"]
        });
    }
    run(message, args) {
        var _a;
        const guild = message.guild;
        new VorteEmbed_1.default(message).baseEmbed().setDescription(`**>** Member Count: ${(_a = guild) === null || _a === void 0 ? void 0 : _a.memberCount}
     **>**`);
    }
}
exports.Cmd = Cmd;
;
