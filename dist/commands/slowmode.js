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
            name: "slowmode",
            category: "Moderation",
            cooldown: 5000
        });
    }
    run(message, args, guild) {
        const chan = message.channel;
        if (!args[0])
            return new VorteEmbed_1.default(message).baseEmbed().setDescription("Please provide a valid number");
        if (args[0].toLowerCase() === "remove" || "release" || "rel") {
            message.channel.send("Succesffully removed the slowmode");
            return chan.edit({
                rateLimitPerUser: 0
            });
        }
        ;
        const sec = parseInt(args[0]);
        const reason = args.slice(1).join(" ") || "No reason provided";
        chan.edit({
            rateLimitPerUser: sec
        });
        guild.increaseCase();
        const { channel, enabled } = guild.getLog("slowmode");
        if (!enabled)
            return;
        const cha = message.guild.channels.get(channel.id);
        cha.send(new VorteEmbed_1.default(message)
            .baseEmbed()
            .setDescription(`**>**Executor: ${message.author.tag} (${message.author.id})
      **>**Channel: ${chan.name} (${chan.id})
      **>**Reason: ${reason}`)
            .setTimestamp());
        if (reason) {
            message.channel.send(`This channel is in slowmode due to: ${reason}`);
        }
    }
}
exports.Cmd = Cmd;
;
