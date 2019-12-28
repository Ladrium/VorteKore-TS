"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../lib");
class default_1 extends lib_1.Command {
    constructor() {
        super("join", {
            category: "Music",
            cooldown: 2000,
            description: "Joins your voice channel.",
            channel: "guild"
        });
    }
    async run(message, _a) {
        if (message.player)
            return message.sem(`Use \`${this.handler.prefix(message)}play\` to queue a song.`, { type: "music" });
        if (!message.member.voice.channel)
            return message.sem("Please join a voice channel.", { type: "error" });
        this.bot.andesite.nodes.ideal.first().join({
            channelId: message.member.voice.channelID,
            guildId: message.guild.id
        }).useMessage(message);
        return message.sem(`Successfully joined **<#${message.member.voice.channelID}>** 🎵`, { type: "music" });
    }
    ;
}
exports.default = default_1;
