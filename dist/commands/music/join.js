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
        super("join", {
            category: "Music",
            cooldown: 2000,
            description: "Joins your voice channel."
        });
    }
    run(message, _args, { prefix }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.bot.andesite.players.has(message.guild.id))
                return message.sem(`Use \`${prefix}play\` to queue a song.`);
            if (!message.member.voice.channel)
                return message.sem("Please join a voice channel.");
            this.bot.andesite.nodes.ideal.first().join({
                channelId: message.member.voice.channelID,
                guildId: message.guild.id
            }).useMessage(message);
            return message.sem(`Successfully joined **<#${message.member.voice.channelID}>** 🎵`);
        });
    }
    ;
}
exports.default = default_1;
