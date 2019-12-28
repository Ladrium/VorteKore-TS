"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../lib");
class default_1 extends lib_1.Event {
    constructor() {
        super("message-deleted", {
            category: "guild",
            event: "messageDelete"
        });
    }
    async run(oldmsg, newmsg, bot = this.bot) {
        const guild = await this.bot.database.getGuild(oldmsg.guild.id);
        if (!guild.logs.channel && !guild.logs.edtmsg)
            return;
        const oldcon = oldmsg.cleanContent.toString().slice(0, 900);
        const newcon = newmsg.cleanContent.toString().slice(0, 900);
        const ch = oldmsg.guild.channels.get(guild.logs.channel);
        if (!ch)
            return;
        ch.send(new lib_1.VorteEmbed(newmsg)
            .baseEmbed()
            .setTitle(`Event: Message Update`)
            .setDescription([
            `**Channel**: ${newmsg.channel} (${newmsg.channel.id})`,
            `**Link**: ${newmsg.url}`,
            `**Author**: ${newmsg.author.tag} (${newmsg.author.id})`
        ].join("\n"))
            .addField(`Old Message:`, oldcon)
            .addField(`New Message`, newcon)
            .setTimestamp());
    }
    ;
}
exports.default = default_1;
