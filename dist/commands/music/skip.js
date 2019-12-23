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
const Command_1 = require("../../structures/Command");
const util_1 = require("../../util");
class default_1 extends Command_1.Command {
    constructor() {
        super("skip", {
            category: "Music",
            cooldown: 0
        });
    }
    run({ guild, member, reply, channel }, query) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!util_1.checkDJ(member) && !util_1.checkPermissions(member, "ADMINISTRATOR"))
                return channel.send("You don't have permissions for this command!");
            const player = this.bot.andesite.players.get(guild.id);
            const queue = this.bot.queues.get(guild.id);
            if (!player || !player.playing)
                return channel.send("The bot isn't playing any music yet!");
            queue.next = queue.next.slice(1);
            if (!queue.next[0])
                return player.node.leave(player.guildId);
            player.play(queue.next[0].track);
            channel.send(`Skipped the song, Now Playing: \`${queue.next[0].info.title}\``);
        });
    }
}
exports.default = default_1;
