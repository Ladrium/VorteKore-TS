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
const config_1 = require("../../config");
const lib_1 = require("../../lib");
const util_1 = require("../../util");
class default_1 extends lib_1.Command {
    constructor() {
        super("bassboost", {
            aliases: ["bb"],
            category: "Music",
            userPermissions(message) {
                if (!message.member.roles.some((role) => role.name.toLowerCase() === "dj") || !config_1.developers.includes(message.author.id) || !util_1.checkPermissions(message.member, "ADMINISTRATOR"))
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
    run(message, [level]) {
        return __awaiter(this, void 0, void 0, function* () {
            const player = this.bot.andesite.players.get(message.guild.id);
            if (!player)
                return message.sem("The bot isn't in a voice channel.", { type: "error" });
            if (!player.in(message.member))
                return message.sem("Please join the voice channel I'm in.", { type: "error" });
            if (!level)
                return message.sem(`The current bassboost level is **${player.bass.toLowerCase()}**.`);
            let levels = {
                high: 0.20,
                medium: 0.10,
                low: 0.05,
                none: 0
            }, i = 0;
            if (levels[level.toLowerCase()] === undefined)
                return message.sem("The avaliable levels are **high**, **medium**, **low**, and **none**.");
            yield player.filter("equalizer", {
                bands: Array(3).fill(null).map(() => ({ band: i++, gain: levels[level.toLowerCase()] }))
            });
            player.bass = level;
            return message.sem(`Set the bassboost to **${level.toLowerCase()}**.`);
        });
    }
}
exports.default = default_1;
