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
            name: "warn",
            category: "Information",
            cooldown: 5000
        });
    }
    run(message, args, guild) {
        if (!args[0])
            return message.channel.send(new VorteEmbed_1.default(message).baseEmbed().setDescription("Please provide a user to warn."));
        const member = message.mentions.members.first() || message.guild.members.find(r => r.displayName === args[0] || r.id === args[0]);
        if (!member)
            return message.channel.send(new VorteEmbed_1.default(message).baseEmbed().setDescription("Couldn't find that user!"));
        const reason = args.slice(1).join(" ");
        if (!reason)
            return message.channel.send(new VorteEmbed_1.default(message).baseEmbed().setDescription("Please provide a specific reason"));
        member.user.send(`You have been warned due to **${reason}**`);
        guild.increaseCase();
        const { channel, enabled } = guild.getLog("warn");
        if (!enabled)
            return;
        const chan = message.guild.channels.get(channel.id);
        chan.send(new VorteEmbed_1.default(message)
            .baseEmbed()
            .setTitle(`Moderation: Warn [Case ID: ${guild.case}]`)
            .setDescription(`**>**Executor: ${message.author.tag} (${message.author.id})\n**>**Warn: ${member.user.tag} (${member.user.id})\n**>**Reason: ${reason}`)
            .setTimestamp());
    }
}
exports.Cmd = Cmd;
;
