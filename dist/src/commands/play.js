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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../structures/Command");
const structures_1 = require("../structures");
const ms_1 = __importDefault(require("ms"));
class Cmd extends Command_1.Command {
    constructor(bot) {
        super(bot, {
            name: "play",
            category: "Music",
            cooldown: 2000
        });
    }
    run(message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { reply, channel, guild, member } = message;
            if (!args[0])
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
            const { data, error } = yield this.bot.player.getSongs(args.join(" "));
            if (error || !data || !data.tracks || !data.tracks[0])
                return reply("Couldn't find that song!");
            const queue = this.bot.player.queue.getQueue(guild) || new this.bot.player.queue(guild)._init();
            queue.addSong(data);
            const info = data.tracks[0].info;
            const musicEmbed = new structures_1.VorteEmbed(message).baseEmbed()
                .setTitle("Added to queue")
                .setDescription(`**Song:** [${info.title}](${info.uri})\n**Author:** ${info.author}\n**Length:** ${ms_1.default(info.length)}`);
            channel.send(musicEmbed);
            if (!player.playing) {
                player.play(data.tracks[0].track)
                    .on("end", (data) => {
                    this.bot.emit("songEnd", data, player, queue, { guild, channel });
                });
            }
            ;
        });
    }
    ;
}
exports.Cmd = Cmd;
