"use strict";
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
    async run(message) {
        if (!message.player)
            return message.sem("The bot isn't in a voice channel.", { type: "error" });
        if (message.player.radio) {
            const stationEmbed = new lib_1.VorteEmbed(message).musicEmbed()
                .setAuthor("VorteKore 420.69 FM", message.author.displayAvatarURL())
                .setDescription([
                `**Station**: ${message.player.radio.name}`,
                `**Country**: ${message.player.radio.country}`,
                `**Clicks**: ${message.player.radio.clickcount.toLocaleString()}`,
                `**Homepage**: ${message.player.radio.homepage}`
            ].join("\n"));
            if (message.player.radio.favicon)
                stationEmbed.setThumbnail(message.player.radio.favicon);
            return message.channel.send(stationEmbed);
        }
        ;
        if (!message.player.queue.np.song)
            return message.sem(`Sorry, there is nothing playing :p`, { type: "error" });
        const { info } = message.player.queue.np.song, playingEmbed = new lib_1.VorteEmbed(message).musicEmbed()
            .setAuthor("Now Playing", message.author.displayAvatarURL())
            .setDescription(`**Song Name**: [${info.title}](${info.uri})\n**Author**: ${info.author}`)
            .addField("\u200B", util_1.playerEmbed(message.player, message.player.queue.np.song));
        return message.channel.send(playingEmbed);
    }
}
exports.default = default_1;
