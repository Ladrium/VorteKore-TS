"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../structures/Command");
const structures_1 = require("../../structures");
const util_1 = require("../../util");
class default_1 extends Command_1.Command {
    constructor() {
        super("kick", {
            category: "Moderation",
            cooldown: 0,
            description: "Kicks a member",
            example: "!ban @user mass pinging"
        });
    }
    run(message, [mem, ...reason], guild) {
        if (!util_1.checkPermissions(message.member, "KICK_MEMBERS"))
            return message.channel.send(new structures_1.VorteEmbed(message).errorEmbed("Missing Permissions!"));
        message.delete();
        if (!mem)
            return message.channel.send(new structures_1.VorteEmbed(message).baseEmbed().setDescription("Please provide a user to ban"));
        const member = message.mentions.members.first() || message.guild.members.find((r) => {
            return r.displayName === mem;
        }) || message.guild.members.get(mem);
        if (!member)
            return message.channel.send("Couldn't find that user!");
        if (message.author.id === member.user.id)
            return message.channel.send(new structures_1.VorteEmbed(message).baseEmbed().setDescription("You can't ban yourself"));
        if (message.member.roles.highest <= member.roles.highest)
            return message.channel.send(new structures_1.VorteEmbed(message).baseEmbed().setDescription("The user has higher role than you."));
        reason = reason[0] ? reason.join(" ") : "No Reason";
        member.kick(reason);
        message.channel.send("Succesfully kicked the user.");
        const { channel, enabled } = guild.getLog("ban");
        if (!enabled)
            return;
        guild.increaseCase();
        const logChannel = member.guild.channels.get(channel.id);
        logChannel.send(new structures_1.VorteEmbed(message).baseEmbed().setTimestamp().setTitle(`Moderation: Member Kick [Case ID: ${guild.case}] `).setDescription(`**>**Executor: ${message.author.tag} (${message.author.id})
        **>**Kicked: ${member.user.tag} (${member.user.id})
        **>**Reason: ${reason ? reason : "No reason"}
        `));
    }
}
exports.default = default_1;
;
