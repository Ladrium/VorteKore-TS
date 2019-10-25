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
            name: "ban",
            category: "Moderation",
            cooldown: 0
        });
    }
    run(message, args, guild) {
        message.delete();
        if (!args[0])
            return message.channel.send(new VorteEmbed_1.default(message).baseEmbed().setDescription("Please provide a user to ban"));
        let member = message.mentions.members.first() || message.guild.members.find((r) => {
            return r.displayName === args[0];
        }) || message.guild.members.get(args[0]);
        if (!member)
            return message.channel.send("Invalid username|id provided");
        if (!args[1]) {
            return message.channel.send(new VorteEmbed_1.default(message).baseEmbed().setDescription("Please provide a specific reason."));
        }
        const reason = args.slice(1).join(" ");
        if (message.author.id === member.user.id)
            return message.channel.send(new VorteEmbed_1.default(message).baseEmbed().setDescription("You can't ban yourself"));
        if (message.member.roles.highest <= member.roles.highest)
            return message.channel.send(new VorteEmbed_1.default(message).baseEmbed().setDescription("The user has higher role than you."));
        member.ban({
            reason: reason
        });
        message.channel.send("Succesfully banned the user.");
        guild.increaseCase();
        const { channel, enabled } = guild.getLog("ban");
        if (enabled == false)
            return;
        const logChannel = member.guild.channels.find(c => c.id == channel.id);
        logChannel.send(new VorteEmbed_1.default(message).baseEmbed().setTimestamp().setTitle(`Moderation: Member Ban [Case ID: ${guild.case}] `).setDescription(`**>** Executor: ${message.author.tag} (${message.author.id})
        **>** Banned: ${member.user.tag} (${member.user.id})
        **>** Reason: ${reason}
        `));
    }
}
exports.Cmd = Cmd;
;
