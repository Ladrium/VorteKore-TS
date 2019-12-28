"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const lib_1 = require("../../lib");
class default_1 extends lib_1.Event {
    constructor() {
        super("message-deleted", {
            category: "guild",
            event: "messageDelete"
        });
    }
    async run(message) {
        const guild = await this.bot.database.getGuild(message.guild.id);
        const { logs: { dltmsg, channel } } = guild;
        if (!dltmsg)
            return;
        const chan = message.guild.channels.get(channel);
        chan.send(new lib_1.VorteEmbed(message)
            .baseEmbed()
            .setTitle(`Event: Message Delete`)
            .setDescription([
            `**Channel**: ${message.channel} (${message.channel.id})`,
            `**Link**: ${message.url}`,
            `**Author**: ${message.author.tag} (${message.author.id})`
        ].join("\n"))
            .addField(`Message Content`, `${discord_js_1.Util.escapeMarkdown(message.cleanContent.slice(0, 900))}`)
            .setTimestamp());
    }
    ;
}
exports.default = default_1;
