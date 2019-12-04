"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const VorteGuild_1 = require("../structures/VorteGuild");
const VorteEmbed_1 = __importDefault(require("../structures/VorteEmbed"));
module.exports = (bot, oldmsg, newmsg) => {
    const guild = new VorteGuild_1.VorteGuild();
    if (!oldmsg || !newmsg || oldmsg.content === newmsg.content)
        return;
    const { channel, enabled } = guild.getLog("editMessage");
    if (!enabled)
        return;
    guild.increaseCase();
    const oldcon = oldmsg.cleanContent.toString().slice(0, 900);
    const newcon = newmsg.cleanContent.toString().slice(0, 900);
    oldmsg.guild.channels.get(channel.id).send(new VorteEmbed_1.default(newmsg)
        .baseEmbed()
        .setTitle(`Event: Message Delete [Case ID: ${guild.case}]\n`)
        .addField(`Old Message:`, oldcon)
        .addField(`New Message`, newcon));
};
