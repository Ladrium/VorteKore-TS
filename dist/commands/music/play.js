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
        super("play", {
            category: "Music",
            cooldown: 2000,
            usage: "<query>",
            description: "Plays a song in your voide channel.",
            channel: "guild"
        });
    }
    run(message, [...query]) {
        return __awaiter(this, void 0, void 0, function* () {
            let player = this.bot.andesite.players.get(message.guild.id);
            if (!player && !message.member.voice.channel)
                return message.sem("Please join a voice channel.");
            if (player && !player.in(message.member))
                return message.sem("Please join the voice channel I'm in.", { type: "error" });
            if (!query.length)
                return message.sem("No query to search for provided!", { type: "error" });
            if (!player)
                player = this.bot.andesite.nodes.ideal.first().join({
                    channelId: message.member.voice.channelID,
                    guildId: message.guild.id
                }).useMessage(message);
            let res = yield this.bot.andesite.search(query.join(" "), player.node), msg;
            if (['TRACK_LOADED', 'SEARCH_RESULT'].includes(res.loadType)) {
                yield player.queue.add([res.tracks[0]], message.author.id);
                msg = `[${res.tracks[0].info.title}](${res.tracks[0].info.uri})`;
            }
            else if (res.loadType === 'PLAYLIST_LOADED') {
                yield player.queue.add(res.tracks, message.author.id);
                msg = res.playlistInfo.name;
            }
            else
                return message.sem("Sorry, I couldn't find what you were looking for.", { type: "error" });
            if (!player.playing && !player.paused)
                yield player.queue.start();
            return message.sem(`Queued up **${msg}** :)`);
        });
    }
    ;
}
exports.default = default_1;
