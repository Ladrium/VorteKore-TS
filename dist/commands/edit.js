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
            name: "edit",
            category: "Utility",
            cooldown: 0
        });
    }
    run(message, args) {
        if (!args[0])
            return message.channel.send("Please provide message id to edit the message.");
        const d = args.slice(1).join(" ").split(" | ");
        message.channel.messages.fetch(args[0]).then(msg => {
            msg.edit(new VorteEmbed_1.default(message).baseEmbed().setTitle(d[0]).setDescription(d[1]).setFooter(`Editted On ${Date.now()}`));
        });
    }
}
exports.Cmd = Cmd;
;
