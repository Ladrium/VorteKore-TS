"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../structures/Command");
const VorteEmbed_1 = __importDefault(require("../structures/VorteEmbed"));
const ms_1 = __importDefault(require("ms"));
class Cmd extends Command_1.Command {
    constructor(bot) {
        super(bot, {
            name: "mute",
            category: "Moderation",
            cooldown: 0
        });
    }
    run(message, args, guild) {
        message.delete();
        if (!args[0])
            return message.channel.send(new VorteEmbed_1.default(message).baseEmbed().setDescription("Please provide a user to mute"));
        const member = message.mentions.members.first() || message.guild.members.find(r => r.displayName === args[0] || r.id === args[0]) || null;
        if (!member)
            return message.channel.send(new VorteEmbed_1.default(message).baseEmbed().setDescription("Invalid member provided"));
        if (!args[1])
            return message.channel.send(new VorteEmbed_1.default(message).baseEmbed().setDescription("Please provide a time."));
        const time = ms_1.default(args[1]);
        if (!time)
            return message.channel.send(new VorteEmbed_1.default(message).baseEmbed().setDescription("Please provide a valid time"));
        const memr = [];
        member.roles.forEach(e => {
            if (e.id === message.guild.id)
                return;
            memr.push(e.id);
        });
        member.roles.remove(memr);
        message.channel.send("Successfully muted the user");
        setTimeout(() => {
            member.roles.add(memr);
        }, time);
    }
}
exports.Cmd = Cmd;
;
