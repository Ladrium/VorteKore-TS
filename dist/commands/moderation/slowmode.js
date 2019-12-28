"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../lib");
const Command_1 = require("../../lib/classes/Command");
const ms = require("ms");
class default_1 extends Command_1.Command {
    constructor() {
        super("slowmode", {
            category: "Moderation",
            cooldown: 3000,
            usage: "To remove the slowmode: !slowmode <remove|release|rel>\nTo add the slowmode: !slowmode <time> (reason)",
            channel: "guild",
            userPermissions: ["MANAGE_MESSAGES"]
        });
    }
    async run(message, args) {
        const chan = message.channel;
        if (["remove" || "release" || "rel"].includes(args[0])) {
            message.sem("Succesffully removed the slowmode");
            return chan.edit({
                rateLimitPerUser: 0
            });
        }
        else if (!isNaN(args[0]) && args[1]) {
            const sec = parseInt(args[0]);
            const reason = args.slice(1).join(" ");
            chan.edit({
                rateLimitPerUser: sec
            });
            const _case = await this.bot.database.newCase(message.guild.id, {
                type: "slowmode",
                subject: chan.id,
                reason,
                amount: sec,
                moderator: message.author.id
            });
            if (!message._guild.logs.channel || !message._guild.logs.slowmode)
                return;
            const logChannel = message.guild.channels.get(message._guild.logs.channel);
            logChannel.send(new lib_1.VorteEmbed(message)
                .baseEmbed()
                .setTitle(`Moderation: Slowmode (Case ID: ${_case.id})`)
                .setDescription([
                `**Moderator**: ${message.author.tag} (${message.author.id})`,
                `**Channel**: ${chan.name} (${chan.id})`,
                `**Reason**: ${reason}`,
                `**Cooldown**: ${ms(sec)}`
            ].join("\n"))
                .setTimestamp());
        }
        else {
            return message.sem("Please provide a number, and a reason.");
        }
    }
}
exports.default = default_1;
;
