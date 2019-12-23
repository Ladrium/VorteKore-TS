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
const ms_1 = __importDefault(require("ms"));
const structures_1 = require("../../structures");
const Command_1 = require("../../structures/Command");
class default_1 extends Command_1.Command {
    constructor() {
        super("play", {
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
            let player = this.bot.andesite.players.get(guild.id);
            if (!player)
                player = this.bot.andesite.nodes.ideal.first().join({
                    channelId: message.member.voice.channelID,
                    guildId: message.guild.id
                });
            const { loadType, severity, cause, tracks } = yield this.bot.andesite.search(args.join(" "));
            if (!tracks && ["LOAD_FAILED", "NO_MATCHES"].includes(loadType))
                return reply("Couldn't find that song!");
            const info = tracks[0].info;
            const musicEmbed = new structures_1.VorteEmbed(message).baseEmbed()
                .setAuthor(`Added to the Queue.`, message.author.displayAvatarURL())
                .setDescription(`**[${info.title}](${info.uri})**\n*${ms_1.default(info.length)} long*`);
            channel.send(musicEmbed);
            if (!player.playing) {
                yield player.play(tracks[0].track);
                player.on("end", (data) => player.ended.bind(player, data, message));
            }
            ;
        });
    }
    ;
}
exports.default = default_1;
