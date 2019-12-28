"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
const lib_1 = require("../../lib");
class default_1 extends lib_1.Command {
    constructor() {
        super("leave", {
            aliases: ["stop"],
            category: "Music",
            userPermissions(message) {
                if (config_1.developers.includes(message.author.id) || message.member.hasPermission("ADMINISTRATOR"))
                    return;
                else if (message._guild.djRole && message.member.roles.some(r => r.id !== message._guild.djRole))
                    return "DJ";
                return;
            },
            channel: "guild"
        });
    }
    async run(message) {
        if (!message.player)
            return message.sem("The bot isn't in a voice channel.", { type: "error" });
        if (!message.player.in(message.member))
            return message.sem("Please join the voice channel I'm in.", { type: "error" });
        await message.player.stop();
        await message.player.node.leave(message.player.guildId);
        return message.sem("Successfully left the voice channel.", { type: "music" });
    }
}
exports.default = default_1;
