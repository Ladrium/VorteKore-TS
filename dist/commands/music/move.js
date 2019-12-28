"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const config_1 = require("../../config");
const lib_1 = require("../../lib");
class default_1 extends lib_1.Command {
    constructor() {
        super("move", {
            aliases: ["move-vc", "movevc", "moveto"],
            category: "Music",
            userPermissions(message) {
                if (config_1.developers.includes(message.author.id) || message.member.hasPermission("ADMINISTRATOR"))
                    return;
                else if (message._guild.djRole && message.member.roles.some(r => r.id !== message._guild.djRole))
                    return "DJ";
                return;
            },
            cooldown: 5000,
            channel: "guild",
            description: "Moves the bot to another voice channel.",
            example: "!move 613347362705768469",
            usage: "<voice channel id>",
            disabled: true
        });
    }
    async run(message, [channel]) {
        if (!message.player)
            return message.sem("The bot isn't in a voice channel.", { type: "error" });
        if (!message.player.in(message.member))
            return message.sem("Please join the voice channel I'm in.", { type: "error" });
        if (!channel)
            return message.sem("Provide a voice channel to move to.", { type: "error" });
        const chan = message.guild.channels.get(channel);
        if (!chan || !(chan instanceof discord_js_1.VoiceChannel))
            return message.sem("Please provide a valid voice channel id.", { type: "error" });
        await message.player.moveVoiceChannel(chan.id);
        return message.sem(`Successfully moved to ${chan}!`, { type: "music" });
    }
}
exports.default = default_1;
