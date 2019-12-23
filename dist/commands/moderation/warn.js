"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../structures/Command");
const structures_1 = require("../../structures");
const util_1 = require("../../util");
class default_1 extends Command_1.Command {
    constructor() {
        super("warn", {
            category: "Information",
            cooldown: 5000,
            description: "Warns a member",
            usage: "!warn @user reason",
            example: "!warn @Johna3212#1708 not following rules"
        });
    }
    run(message, args, guild) {
        if (!util_1.checkPermissions(message.member, "KICK_MEMBERS"))
            return message.channel.send(new structures_1.VorteEmbed(message).errorEmbed("Missing Permissions!"));
        if (!args[0])
            return message.channel.send(new structures_1.VorteEmbed(message).baseEmbed().setDescription("Please provide a user to warn."));
        const member = message.mentions.members.first() || message.guild.members.find(r => r.displayName === args[0] || r.id === args[0]);
        const reason = args.slice(1).join(" ") || "No Reason.";
        if (!member)
            return message.channel.send(new structures_1.VorteEmbed(message).baseEmbed().setDescription("Couldn't find that user!"));
        member.user.send(`You have been warned due to **${reason}**`);
        const { channel, enabled } = guild.getLog("warn");
        if (!enabled)
            return;
        guild.increaseCase();
        const chan = message.guild.channels.get(channel.id);
        chan.send(new structures_1.VorteEmbed(message)
            .baseEmbed()
            .setTitle(`Moderation: Warn [Case ID: ${guild.case}]`)
            .setDescription(`**>**Executor: ${message.author.tag} (${message.author.id})\n**>**Warn: ${member.user.tag} (${member.user.id})\n**>**Reason: ${reason}`)
            .setTimestamp());
    }
}
exports.default = default_1;
;
