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
const structures_1 = require("../../structures");
const util_1 = require("../../util");
class default_1 extends structures_1.Command {
    constructor() {
        super("volume", {
            aliases: ["vol"],
            category: "Music",
            cooldown: 0
        });
    }
    run(message, [volume]) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!util_1.checkDJ(message.member) && !util_1.checkPermissions(message.member))
                return message.reply("Not enough permissions!");
            if (!message.guild.me.voice)
                return message.reply("I'm not playing anything!");
            if (!message.member.voice || message.member.voice.channelID !== message.guild.me.voice.channelID)
                return message.reply("You need to be in the same voice channel as the bot!");
            const player = this.bot.andesite.players.get(message.guild.id);
            if (!player || !player.playing)
                return message.reply("Not playing anything right now!");
            if (isNaN(volume) || volume.includes("-") || volume.includes(".") || volume > 100 || volume < 1)
                return message.reply("Please return a valid number between 1-100");
            volume = parseInt(volume);
            yield player.setVolume(volume);
            message.channel.send(`Set the Volume to: \`${volume}\``);
        });
    }
}
exports.default = default_1;
