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
const structures_1 = require("../structures");
const util_1 = require("../util");
class Cmd extends structures_1.Command {
    constructor(bot) {
        super(bot, {
            name: "nowplaying",
            aliases: ["np"],
            category: "Music",
            cooldown: 0
        });
    }
    run(message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!message.guild.me.voice)
                return message.reply("I'm not playing anything!");
            if (!message.member.voice || message.member.voice.channelID !== message.guild.me.voice.channelID)
                return message.reply("You need to be in the same voice channel as the bot!");
            const player = this.bot.player.lavalink.get(message.guild.id);
            if (!player || !player.playing)
                return message.reply("Not playing anything right now!");
            const queue = this.bot.player.queue.getQueue(message.guild) || (yield new this.bot.player.queue(message.guild)._init());
            if (!queue.queue)
                return message.reply("Nothing queued right now!");
            const song = queue.queue[0];
            const info = song.info;
            const pos = Math.round((player.state.position / info.length) * 10);
            const pos2 = Math.round(15 - pos);
            const currTime = util_1.formatTime(player.state.position);
            const fullTime = util_1.formatTime(info.length);
            let str = `${"▬".repeat(pos)}🔘${"▬".repeat(pos2)}`;
            const playingEmbed = new structures_1.VorteEmbed(message).baseEmbed()
                .setTitle("Now Playing")
                .addField("Song Name", `[${info.title}](${info.uri})`)
                .addField("Author", info.author)
                .addField("Position", `${str} \n\`${currTime.m}:${currTime.s} / ${fullTime.m}:${fullTime.s}\``);
            message.channel.send(playingEmbed);
        });
    }
}
exports.Cmd = Cmd;
