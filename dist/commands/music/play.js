"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../lib");
const url_1 = require("url");
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
    async run(message, [...query]) {
        let player = message.player;
        if (!player && !message.member.voice.channel)
            return message.sem("Please join a voice channel.", { type: "error" });
        if (player && !player.in(message.member))
            return message.sem("Please join the voice channel I'm in.", { type: "error" });
        if (player && player.radio)
            return message.sem("Sorry, the player is currently in radio mode :p", { type: "error" });
        if (!query.length)
            return message.sem("No query to search for provided!", { type: "error" });
        if (!player)
            player = this.bot.andesite.nodes.ideal.first().join({
                channelId: message.member.voice.channelID,
                guildId: message.guild.id
            }).useMessage(message);
        let search = query.join(" ");
        if (!['http:', 'https:'].includes(url_1.parse(search).protocol))
            search = `ytsearch:${query}`;
        let res = await this.bot.andesite.search(search, player.node), msg;
        if (['TRACK_LOADED', 'SEARCH_RESULT'].includes(res.loadType)) {
            await player.queue.add([res.tracks[0]], message.author.id);
            msg = `[${res.tracks[0].info.title}](${res.tracks[0].info.uri})`;
        }
        else if (res.loadType === 'PLAYLIST_LOADED') {
            await player.queue.add(res.tracks, message.author.id);
            msg = res.playlistInfo.name;
        }
        else
            return message.sem("Sorry, I couldn't find what you were looking for.", { type: "error" });
        if (!player.playing && !player.paused)
            await player.queue.start();
        return message.sem(`Queued up **${msg}** :)`, { type: "music" });
    }
    ;
}
exports.default = default_1;
