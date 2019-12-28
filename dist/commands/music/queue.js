"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../lib");
const util_1 = require("../../util");
const ms = require("ms");
class default_1 extends lib_1.Command {
    constructor() {
        super("queue", {
            category: "Music",
            example: "!queue",
            description: "Shows the current and next up songs.",
            channel: "guild"
        });
    }
    async run(message, [page]) {
        if (!message.player)
            return message.sem("The bot isn't in a voice channel.", { type: "error" });
        if (message.player.radio)
            return message.sem("Sorry, the player is currently in radio mode :p", { type: "error" });
        if (!message.player.queue.np.song)
            return message.sem(`Hmmmm... the queue is empty, you should some more songs with \`${this.handler.prefix(message)}play\``, { type: "music" });
        let total = message.player.queue.next.reduce((prev, song) => prev + song.info.length, 0), paginated = util_1.paginate(message.player.queue.next, parseInt(page || "1")), index = (paginated.page - 1) * 10, upNext = "";
        paginated.items.length
            ? upNext += paginated.items.map(song => `${++index}. **[${song.info.title.trunc(30, false)}](${song.info.uri})** *[<@${song.requester}> ${ms(song.info.length)}]*`).join("\n")
            : upNext = `Hmmmm... pretty empty, you should add some more songs with \`${this.handler.prefix(message)}play\``;
        if (paginated.maxPage > 1)
            upNext += '\n"Use queue <page> to view a specific page."';
        const np = message.player.queue.np.song, queueEmbed = new lib_1.VorteEmbed(message).musicEmbed()
            .setDescription(upNext)
            .addField(`\u200B`, `**Now Playing:**\n**[${np.info.title}](${np.info.uri})** *[<@${np.requester}>]*`)
            .setFooter(paginated.items.length ? `Queue Length: ${ms(total)} | VorteKore` : `VorteKore | ChaosPhoe`);
        message.channel.send(queueEmbed);
    }
}
exports.default = default_1;
