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
    run(message, [mem, ...reason], guild) {
        message.delete();
        if (!mem)
            return message.channel.send(new VorteEmbed_1.default(message).baseEmbed().setDescription("Please provide a user to ban"));
        const member = message.mentions.members.first() || message.guild.members.find((r) => {
            return r.displayName === mem;
        }) || message.guild.members.get(mem);
        if (!member)
            return message.channel.send("Couldn't find that user!");
        if (message.author.id === member.user.id)
            return message.channel.send(new VorteEmbed_1.default(message).baseEmbed().setDescription("You can't ban yourself"));
        if (message.member.roles.highest <= member.roles.highest)
            return message.channel.send(new VorteEmbed_1.default(message).baseEmbed().setDescription("The user has higher role than you."));
        reason = reason[0] ? reason.join(" ") : "No Reason";
        member.kick(reason);
        guild.increaseCase();
        message.channel.send("Succesfully kicked the user.");
        const { channel, enabled } = guild.getLog("ban");
        if (!enabled)
            return;
        const logChannel = member.guild.channels.find(c => c.id == channel.id);
        logChannel.send(new VorteEmbed_1.default(message).baseEmbed().setTimestamp().setTitle(`Moderation: Member Kick [Case ID: ${guild.case}] `).setDescription(`**>**Executor: ${message.author.tag} (${message.author.id})
        **>**Kicked: ${member.user.tag} (${member.user.id})
        **>**Reason: ${reason ? reason : "No reason"}
        `));
    }
}
exports.Cmd = Cmd;
;
