"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../lib");
class default_1 extends lib_1.Command {
    constructor() {
        super("repeat", {
            category: "Music",
            cooldown: 2000,
            example: "!repeat queue; !repeat song",
            description: "Repeats the queue or song.",
            channel: "guild"
        });
    }
    async run(message, [_]) {
        const player = this.bot.andesite.players.get(message.guild.id);
        if (!message.player)
            return message.sem("The bot isn't in a voice channel.", { type: "error" });
        if (!message.player.in(message.member))
            return message.sem("You should join the voice channel I'm in... buckaroo", { type: "error" });
        if (message.player.radio)
            return message.sem("Sorry, the player is currently in radio mode :p", { type: "error" });
        if (!message.player.track)
            return message.sem("The bot isn't playing anything...", { type: "music" });
        switch (_) {
            case "song":
            case "track":
            default:
                const track = message.player.queue.repeat.song = !message.player.queue.repeat.song;
                message.sem(`${track ? "Enabled" : "Disabled"} song repeat for the player.`, { type: "music" });
                break;
            case "queue":
                const queue = message.player.queue.repeat.queue = !message.player.queue.repeat.queue;
                message.sem(`${queue ? "Enabled" : "Disabled"} queue repeat for the player.`, { type: "music" });
                break;
        }
    }
}
exports.default = default_1;
