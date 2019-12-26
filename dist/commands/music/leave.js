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
const util_1 = require("../../util");
class default_1 extends lib_1.Command {
    constructor() {
        super("leave", {
            aliases: ["stop"],
            category: "Music",
            userPermissions(message) {
                if (!message.member.roles.some((role) => role.name.toLowerCase() === "dj") || !config_1.developers.includes(message.author.id) || !util_1.checkPermissions(message.member, "ADMINISTRATOR"))
                    return "DJ";
                return;
            },
            channel: "guild"
        });
    }
    run(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const player = this.bot.andesite.players.get(message.guild.id);
            if (!player)
                return message.sem("The bot isn't in a voice channel.", { type: "error" });
            if (!player.in(message.member))
                return message.sem("Please join the voice channel I'm in.", { type: "error" });
            yield player.stop();
            yield player.node.leave(player.guildId);
            return message.sem("Successfully left the voice channel.", { type: "music" });
        });
    }
}
exports.default = default_1;
