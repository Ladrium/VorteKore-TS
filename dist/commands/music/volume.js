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
const config_1 = require("../../config");
class default_1 extends lib_1.Command {
    constructor() {
        super("volume", {
            aliases: ["vol"],
            category: "Music",
            userPermissions(message) {
                if (!message.member.roles.some((role) => role.name.toLowerCase() === "dj") || !config_1.developers.includes(message.author.id))
                    return "DJ";
                return;
            },
            channel: "guild",
            cooldown: 5000
        });
    }
    run(message, [val]) {
        return __awaiter(this, void 0, void 0, function* () {
            const player = this.bot.andesite.players.get(message.guild.id);
            if (!player)
                return message.sem("The bot isn't in a voice channel.", { type: "error" });
            if (!player.in(message.member))
                return message.sem("Please join my voice channel.", { type: "error" });
            const volume = Number(val);
            if (isNaN(volume) || ["-", "."].some(s => val.includes(s)) || volume > 100 || volume < 1)
                return message.sem("Please return a valid number between 1-100", { type: "error" });
            yield player.setVolume(volume);
            return message.sem(`Set the Volume to: \`${volume}\``, { type: "music" });
        });
    }
}
exports.default = default_1;
