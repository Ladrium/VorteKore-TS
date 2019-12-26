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
const util_1 = require("../../util");
class default_1 extends lib_1.Command {
    constructor() {
        super("nowplaying", {
            aliases: ["np"],
            description: "Sends the current playing song.",
            category: "Music",
            channel: "guild"
        });
    }
    run(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const player = this.bot.andesite.players.get(message.guild.id);
            if (!player)
                return message.sem("The bot isn't in a voice channel.", { type: "error" });
            if (player.radio) {
                const stationEmbed = new lib_1.VorteEmbed(message).musicEmbed()
                    .setAuthor("VorteKore 420.69 FM", message.author.displayAvatarURL())
                    .setDescription([
                    `**Station**: ${player.radio.name}`,
                    `**Country**: ${player.radio.country}`,
                    `**Clicks**: ${player.radio.clickcount.toLocaleString()}`,
                    `**Homepage**: ${player.radio.homepage}`
                ].join("\n"));
                if (player.radio.favicon)
                    stationEmbed.setThumbnail(player.radio.favicon);
                return message.channel.send(stationEmbed);
            }
            ;
            if (!player.queue.np.song)
                return message.sem(`Sorry, there is nothing playing :p`, { type: "error" });
            const { info } = player.queue.np.song, playingEmbed = new lib_1.VorteEmbed(message).musicEmbed()
                .setAuthor("Now Playing", message.author.displayAvatarURL())
                .setDescription(`**Song Name**: [${info.title}](${info.uri})\n**Author**: ${info.author}`)
                .addField("\u200B", util_1.playerEmbed(player, player.queue.np.song));
            return message.channel.send(playingEmbed);
        });
    }
}
exports.default = default_1;
