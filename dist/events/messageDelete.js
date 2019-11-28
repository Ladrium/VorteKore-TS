"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const VorteEmbed_1 = __importDefault(require("../structures/VorteEmbed"));
module.exports = (bot, deletedMessage, guild) => {
    console.log(deletedMessage.content);
    const { channel, enabled } = guild.getLog("deleteMessage");
    if (!enabled)
        return;
    const chan = deletedMessage.guild.channels.get(channel.id);
    guild.increaseCase();
    chan.send(new VorteEmbed_1.default(deletedMessage)
        .baseEmbed()
        .setDescription(`Event: Message Deleted [Case ID: ${guild.case}]\nUser: ${deletedMessage.author.tag} (${deletedMessage.author.id})\nMessage: ${deletedMessage.content}`).setTimestamp());
};
