"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
const Command_1 = require("../../lib/classes/Command");
class default_1 extends Command_1.Command {
    constructor() {
        super("shuffle", {
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
            return message.sem("Please join my voice channel.", { type: "error" });
        if (message.player.radio)
            return message.sem("Sorry, the player is currently in radio mode :p", { type: "error" });
        if (!message.player.queue.np)
            return message.sem("Nothing is playing", { type: "error" });
        await message.player.queue.shuffle();
        return message.sem("Shuffled the Queue!", { type: "music" });
    }
}
exports.default = default_1;
