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
const Command_1 = require("../structures/Command");
class Cmd extends Command_1.Command {
    constructor(bot) {
        super(bot, {
            name: "play",
            category: "Music",
            cooldown: 0
        });
    }
    run({ guild, member, reply, channel }, query) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!query[0])
                return reply("No query to search for provided!");
            if (!member.voice)
                return reply("You need to be in a VoiceChannel this command!");
            if (guild.me.voice && guild.me.voice.channel && guild.me.voice.channelID !== member.voice.channelID)
                return reply("You need to be in the same VoiceChannel as me to use this command!");
            let player = this.bot.player.lavalink.get(guild.id);
            if (!player)
                player = yield this.bot.player.lavalink.join({
                    guild: guild.id,
                    channel: member.voice.channelID,
                    host: this.bot.player.lavalink.nodes.first().host
                }, { selfdeaf: true });
            const { data, error } = yield this.bot.player.getSongs(query.join(" "));
            if (error || !data)
                return reply("Couldn't find that song!");
            const queue = this.bot.player.queue.getQueue(guild) || new this.bot.player.queue(guild)._init();
            queue.addSong(data);
            channel.send(`Successfully added \`${data.tracks[0].info.title}\` to the queue!`);
            if (!player.playing) {
                player.play(data.tracks[0].track)
                    .on("end", (data) => {
                    this.bot.emit("songEnd", data, player, queue, { guild, channel });
                });
            }
        });
    }
    ;
}
exports.Cmd = Cmd;
