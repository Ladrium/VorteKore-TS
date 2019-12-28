"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../lib");
class default_1 extends lib_1.Command {
    constructor() {
        super("resume", {
            category: "Music",
            description: "Resumes the player if not already paused.",
            channel: "guild"
        });
    }
    async run(message) {
        if (!message.player)
            return message.sem("The bot isn't in a voice channel.", { type: "error" });
        if (!message.player.in(message.member))
            return message.sem("Please join my voice channel.", { type: "error" });
        if (!message.player.paused)
            return message.sem(`I'm not paused... :p`, { type: "music" });
        await message.player.resume();
        message.player.paused = false;
        return message.sem(`Successfully resumed the player!`);
    }
}
exports.default = default_1;
