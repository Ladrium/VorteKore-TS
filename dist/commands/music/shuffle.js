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
const Command_1 = require("../../lib/classes/Command");
const config_1 = require("../../config");
const util_1 = require("../../util");
class default_1 extends Command_1.Command {
    constructor() {
        super("shuffle", {
            category: "Music",
            userPermissions(message) {
                if (!message.member.roles.some((role) => role.name.toLowerCase() === "dj") || !config_1.developers.includes(message.author.id) || !util_1.checkPermissions(message.member, "ADMINISTRATOR"))
                    return "DJ";
                return;
            },
            channel: "guild"
        });
    }
    run(message, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const player = this.bot.andesite.players.get(message.guild.id);
            if (!player)
                return message.sem("The bot isn't in a voice channel.", { type: "error" });
            if (!player.in(message.member))
                return message.sem("Please join my voice channel.", { type: "error" });
            if (player.radio)
                return message.sem("Sorry, the player is currently in radio mode :p", { type: "error" });
            if (!player.queue.np)
                return message.sem("Nothing is playing", { type: "error" });
            yield player.queue.shuffle();
            return message.sem("Shuffled the Queue!", { type: "music" });
        });
    }
}
exports.default = default_1;
