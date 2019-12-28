"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../lib");
class default_1 extends lib_1.Command {
    constructor() {
        super("pause", {
            category: "Music",
            cooldown: 5000,
            description: "Pauses the player if not already resumed.",
            channel: "guild"
        });
    }
    async run(message) {
        if (!message.player)
            return message.sem("The bot isn't in a voice channel.", { type: "error" });
        if (!message.player.in(message.member))
            return message.sem("Please join the voice channel I'm in.", { type: "error" });
        if (message.player.paused)
            return message.sem(`I'm already paused... :p`, { type: "music" });
        await message.player.pause();
        message.player.paused = true;
        return message.sem(`Successfully paused the player!`, { type: "music" });
    }
}
exports.default = default_1;
