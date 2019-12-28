"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
const lib_1 = require("../../lib");
class default_1 extends lib_1.Command {
    constructor() {
        super("volume", {
            aliases: ["vol"],
            category: "Music",
            userPermissions(message) {
                if (config_1.developers.includes(message.author.id) || message.member.hasPermission("ADMINISTRATOR"))
                    return;
                else if (message._guild.djRole && message.member.roles.some(r => r.id !== message._guild.djRole))
                    return "DJ";
                return;
            },
            channel: "guild",
            cooldown: 5000
        });
    }
    async run(message, [val]) {
        const player = this.bot.andesite.players.get(message.guild.id);
        if (!player)
            return message.sem("The bot isn't in a voice channel.", { type: "error" });
        if (!player.in(message.member))
            return message.sem("Please join my voice channel.", { type: "error" });
        const volume = Number(val);
        if (isNaN(volume) || ["-", "."].some(s => val.includes(s)) || volume > 100 || volume < 1)
            return message.sem("Please return a valid number between 1-100", { type: "error" });
        await player.setVolume(volume);
        return message.sem(`Set the Volume to: \`${volume}\``, { type: "music" });
    }
}
exports.default = default_1;
