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
const structures_1 = require("../../structures");
const Command_1 = require("../../structures/Command");
class default_1 extends Command_1.Command {
    constructor() {
        super("queue", {
            category: "Music",
            cooldown: 0,
            example: "!queue"
        });
    }
    run(message, [time]) {
        return __awaiter(this, void 0, void 0, function* () {
            const player = this.bot.andesite.players.get(message.guild.id);
            if (!player || !player.playing)
                return message.channel.send("The bot isn't playing any music yet!");
            const queue = this.bot.queues.get(message.guild.id);
            if (!queue.next[0])
                return message.reply("Nothing queued right now!");
            const queueEmbed = new structures_1.VorteEmbed(message).baseEmbed()
                .setTitle("Queue")
                .addField("Now Playing", `**[${queue.next[0].info.title}](${queue.next[0].info.uri})**`);
            if (queue.next[1])
                queueEmbed.setDescription(queue.next.slice(1, 10).map((song, i) => `${i + 1}. **[${song.info.title}](${song.info.uri})**`));
            message.channel.send(queueEmbed);
        });
    }
}
exports.default = default_1;
