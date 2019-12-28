"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../lib");
class default_1 extends lib_1.Command {
    constructor() {
        super("ban", {
            category: "Moderation",
            channel: "guild",
            description: "Bans a member from the server",
            example: "!ban @2D not cool",
            usage: "<@member> [reason]",
            userPermissions: ["BAN_MEMBERS"],
            botPermissions: ["BAN_MEMBERS"]
        });
    }
    async run(message, [mem, ...reason]) {
        if (message.deletable)
            await message.delete();
        if (!mem)
            return message.sem("Please provide a user to ban");
        const member = message.mentions.members.first() || message.guild.members.find((r) => {
            return r.displayName === mem;
        }) || message.guild.members.get(mem);
        if (!member)
            return message.channel.send("Couldn't find that user!");
        if (message.author.id === member.user.id)
            return message.sem("You can't ban yourself", { type: "error" });
        if (message.member.roles.highest <= member.roles.highest)
            return message.sem("The user has higher role than you.", { type: "error" });
        reason = reason[0] ? reason.join(" ") : "No reason";
        try {
            await member.ban({ reason: reason });
            message.sem("Succesfully banned the user.");
        }
        catch (error) {
            console.error(`ban command`, error);
            return message.sem(`Sorry, we ran into an error.`, { type: "error" });
        }
        const _case = await this.bot.database.newCase(message.guild.id, {
            type: "ban",
            subject: member.id,
            reason,
            moderator: message.author.id
        });
        if (!message._guild.logs.channel || !message._guild.logs.ban)
            return;
        const logChannel = member.guild.channels.get(message._guild.logs.channel);
        logChannel.send(new lib_1.VorteEmbed(message)
            .baseEmbed()
            .setTimestamp()
            .setTitle(`Moderation: Member Ban [Case ID: ${_case.id}] `)
            .setDescription([
            `**>** Staff: ${message.author.tag} (${message.author.id})`,
            `**>** Banned: ${member.user.tag} (${member.user.id})`,
            `**>** Reason: ${reason}`
        ].join("\n")));
    }
}
exports.default = default_1;
;
