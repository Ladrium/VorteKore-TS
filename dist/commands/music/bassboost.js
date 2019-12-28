"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
const lib_1 = require("../../lib");
class default_1 extends lib_1.Command {
    constructor() {
        super("bassboost", {
            aliases: ["bb"],
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
            description: "Manages the bassboost for the guild.",
            example: "!bassboost medium",
            usage: "<high|medium|low|none>"
        });
    }
    async run(message, [level]) {
        if (!message.player)
            return message.sem("The bot isn't in a voice channel.", { type: "error" });
        if (!message.player.in(message.member))
            return message.sem("Please join the voice channel I'm in.", { type: "error" });
        if (!level)
            return message.sem(`The current bassboost level is **${message.player.bass.toLowerCase()}**.`);
        let levels = {
            high: 0.20,
            medium: 0.10,
            low: 0.05,
            none: 0
        }, i = 0;
        if (levels[level.toLowerCase()] === undefined)
            return message.sem("The avaliable levels are **high**, **medium**, **low**, and **none**.");
        await message.player.filter("equalizer", {
            bands: Array(3).fill(null).map(() => ({ band: i++, gain: levels[level.toLowerCase()] }))
        });
        message.player.bass = level;
        return message.sem(`Set the bassboost to **${level.toLowerCase()}**.`);
    }
}
exports.default = default_1;
