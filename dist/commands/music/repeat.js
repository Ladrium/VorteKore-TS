"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    run(message, [_]) {
        return __awaiter(this, void 0, void 0, function* () {
            const player = this.bot.andesite.players.get(message.guild.id);
            if (!player)
                return message.sem("The bot isn't in a voice channel.", { type: "error" });
            if (!player.in(message.member))
                return message.sem("You should join the voice channel I'm in... buckaroo", { type: "error" });
            if (player.radio)
                return message.sem("Sorry, the player is currently in radio mode :p", { type: "error" });
            if (!player.track)
                return message.sem("The bot isn't playing anything...", { type: "music" });
            switch (_) {
                case "song":
                case "track":
                default:
                    const track = player.queue.repeat.song = !player.queue.repeat.song;
                    message.sem(`${track ? "Enabled" : "Disabled"} song repeat for the player.`, { type: "music" });
                    break;
                case "queue":
                    const queue = player.queue.repeat.queue = !player.queue.repeat.queue;
                    message.sem(`${queue ? "Enabled" : "Disabled"} queue repeat for the player.`, { type: "music" });
                    break;
            }
        });
    }
}
exports.default = default_1;
