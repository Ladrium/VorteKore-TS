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
    chan.send(new VorteEmbed_1.default(deletedMessage)
        .baseEmbed()
        .setDescription(`Event: Message Deleted\nUser: ${deletedMessage.author.tag}\nMessage: ${deletedMessage.content}`).setTimestamp());
};
