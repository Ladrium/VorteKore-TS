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
const discord_js_1 = require("discord.js");
const config_1 = require("../../config");
const util_1 = require("../../util");
class default_1 extends lib_1.Command {
    constructor() {
        super("move", {
            aliases: ["move-vc", "movevc", "moveto"],
            category: "Music",
            userPermissions(message) {
                if (!message.member.roles.some((role) => role.name.toLowerCase() === "dj") || !config_1.developers.includes(message.author.id) || !util_1.checkPermissions(message.member, "ADMINISTRATOR"))
                    return "DJ";
                return;
            },
            cooldown: 5000,
            channel: "guild",
            description: "Moves the bot to another voice channel.",
            example: "!move 613347362705768469",
            usage: "<voice channel id>",
            disabled: true
        });
    }
    run(message, [channel]) {
        return __awaiter(this, void 0, void 0, function* () {
            const player = this.bot.andesite.players.get(message.guild.id);
            if (!player)
                return message.sem("The bot isn't in a voice channel.", { type: "error" });
            if (!player.in(message.member))
                return message.sem("Please join the voice channel I'm in.", { type: "error" });
            if (!channel)
                return message.sem("Provide a voice channel to move to.", { type: "error" });
            const chan = message.guild.channels.get(channel);
            if (!chan || !(chan instanceof discord_js_1.VoiceChannel))
                return message.sem("Please provide a valid voice channel id.", { type: "error" });
            yield player.moveVoiceChannel(chan.id);
            return message.sem(`Successfully moved to ${chan}!`, { type: "music" });
        });
    }
}
exports.default = default_1;
