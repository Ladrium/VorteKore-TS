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
            name: "kick",
            category: "Moderation",
            cooldown: 0
        });
    }
    run(message, args, guild) {
        message.delete().catch();
        if (!args[0])
            return new VorteEmbed_1.default(message).baseEmbed().setDescription("Please provide a user to kick");
        let member = message.mentions.members.first() || message.guild.members.find((r) => {
            return r.displayName === args[0];
        }) || message.guild.members.get(args[0]);
        if (!member)
            return message.channel.send("Invalid username|id provided");
        if (!args[1]) {
            return new VorteEmbed_1.default(message).baseEmbed().setDescription("Please provide a specific reason.");
        }
        const reason = args.slice(2).join(" ");
        member.kick(reason);
        message.channel.send("Succesfully kicked the user.");
        const { channel, enabled } = guild.getLog("kick");
        guild.increaseCase();
        if (enabled == false)
            return;
        const logChannel = member.guild.channels.find(c => c.id == channel.id);
        logChannel.send(new VorteEmbed_1.default(message).baseEmbed().setTimestamp().setDescription(`**>** Executor: ${message.author.tag} (${message.author.id})
        **>** kicked: ${member.user.tag} (${member.user.id})
        **>** Reason: ${reason}
        `).setTitle(`Moderation: Kick [Case ID: ${guild.case}]`));
    }
}
exports.Cmd = Cmd;
;
