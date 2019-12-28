"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../lib");
const Command_1 = require("../../lib/classes/Command");
class default_1 extends Command_1.Command {
    constructor() {
        super("warn", {
            category: "Moderation",
            cooldown: 5000,
            description: "Warns a member",
            usage: "<@member> [reason]",
            example: "!warn @Johna3212#1708 not following rules",
            channel: "guild",
            userPermissions: ["MANAGE_GUILD"]
        });
    }
    async run(message, args) {
        if (!(args[0] && args[1]))
            return message.sem("Please provide a user to warn, and a reason.");
        const member = message.mentions.members.first() || message.guild.members.find(r => r.displayName === args[0] || r.id === args[0]);
        const reason = args.slice(1).join(" ");
        if (!member)
            return message.sem("Couldn't find that user!");
        const _case = await this.bot.database.newCase(message.guild.id, {
            type: "slowmode",
            subject: member.id,
            reason,
            moderator: message.author.id
        });
        ++message.profile.warns;
        await message.profile.save();
        if (!message._guild.logs.channel || !message._guild.logs.warn)
            return;
        const logChannel = message.guild.channels.get(message._guild.logs.channel);
        logChannel.send(new lib_1.VorteEmbed(message)
            .baseEmbed()
            .setTitle(`Moderation: Warn [Case ID: ${_case.id}]`)
            .setDescription([
            `**Moderator**: ${message.author.tag} (${message.author.id})`,
            `**Warned**: ${member.user.tag} (${member.user.id})`,
            `**Reason**: ${reason}`
        ].join("\n"))
            .setTimestamp());
    }
}
exports.default = default_1;
;
