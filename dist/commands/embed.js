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
            name: "emb",
            category: "Utility",
            cooldown: 5000
        });
    }
    run(message, args) {
        const emb = args.join(" ").split(" | ");
        if (!message.deletable)
            return message.channel.send("Dont have permission to delete the message");
        message.delete();
        message.channel.send(new VorteEmbed_1.default(message).baseEmbed().setTitle(emb[0]).setDescription(emb[1]));
    }
}
exports.Cmd = Cmd;
;
